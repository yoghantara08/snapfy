// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IWETH.sol";

contract SnapfyUniswapV2 {
    IUniswapV2Router02 public immutable router;
    address public immutable owner;
    address public immutable WETH;

    event LiquidityProvided(
        address indexed user,
        address inputToken,
        uint256 amount,
        address tokenA,
        address tokenB
    );
    event LiquidityWithdrawn(
        address indexed user,
        address tokenA,
        address tokenB,
        uint256 liquidity
    );

    constructor(address _router) {
        require(
            _router != address(0),
            "SnapfyUniswapV2: Router address cannot be zero"
        );
        router = IUniswapV2Router02(_router);
        WETH = router.WETH();
        owner = msg.sender;
    }

    function provideLiquidity(
        address inputToken,
        uint256 amount,
        address tokenA,
        address tokenB,
        uint256 amountAMin,
        uint256 amountBMin,
        uint256 deadline
    ) external payable {
        require(amount > 0, "SnapfyUniswapV2: Amount must be greater than 0");
        require(
            tokenA != address(0) && tokenB != address(0),
            "SnapfyUniswapV2: Invalid token address"
        );

        uint256 fee = amount / 100;
        uint256 remaining = amount - fee;

        if (inputToken != address(0)) {
            require(
                IERC20(inputToken).transferFrom(
                    msg.sender,
                    address(this),
                    amount
                ),
                "SnapfyUniswapV2: Transfer failed"
            );
            IERC20(inputToken).approve(address(router), amount);
            IERC20(inputToken).transfer(owner, fee);
        } else {
            require(
                msg.value == amount,
                "SnapfyUniswapV2: ETH amount mismatch"
            );
            payable(owner).transfer(fee);
        }

        address factory = router.factory();
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "SnapfyUniswapV2: Pair does not exist");

        uint256 halfAmount = remaining / 2;
        swapTokens(inputToken, tokenA, halfAmount);
        swapTokens(inputToken, tokenB, halfAmount);

        addLiquidity(tokenA, tokenB, amountAMin, amountBMin, deadline);

        emit LiquidityProvided(msg.sender, inputToken, amount, tokenA, tokenB);
    }

    function withdraw(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        uint256 deadline
    ) external {
        address factory = router.factory();
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "SnapfyUniswapV2: Pair does not exist");

        IERC20(pair).transferFrom(msg.sender, address(this), liquidity);
        IERC20(pair).approve(address(router), liquidity);

        router.removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            msg.sender,
            deadline
        );

        emit LiquidityWithdrawn(msg.sender, tokenA, tokenB, liquidity);
    }

    function swapTokens(
        address inputToken,
        address outputToken,
        uint256 amountIn
    ) private {
        if (inputToken == outputToken) return;

        if (inputToken == address(0) && outputToken == WETH) {
            IWETH(WETH).deposit{value: amountIn}();
            return;
        }

        address[] memory path = new address[](2);
        path[0] = inputToken == address(0) ? WETH : inputToken;
        path[1] = outputToken;

        if (inputToken == address(0)) {
            router.swapExactETHForTokens{value: amountIn}(
                0,
                path,
                address(this),
                block.timestamp + 300
            );
        } else if (outputToken == address(0)) {
            IERC20(inputToken).approve(address(router), amountIn);
            router.swapExactTokensForETH(
                amountIn,
                0,
                path,
                address(this),
                block.timestamp + 300
            );
        } else {
            IERC20(inputToken).approve(address(router), amountIn);
            router.swapExactTokensForTokens(
                amountIn,
                0,
                path,
                address(this),
                block.timestamp + 300
            );
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountAMin,
        uint256 amountBMin,
        uint256 deadline
    ) private {
        uint256 amountA = IERC20(tokenA).balanceOf(address(this));
        uint256 amountB = IERC20(tokenB).balanceOf(address(this));

        IERC20(tokenA).approve(address(router), amountA);
        IERC20(tokenB).approve(address(router), amountB);

        router.addLiquidity(
            tokenA,
            tokenB,
            amountA,
            amountB,
            amountAMin,
            amountBMin,
            msg.sender,
            deadline
        );
    }

    receive() external payable {}
}
