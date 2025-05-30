// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IWETH.sol";

contract SnapfyUniswapV2 {
    IUniswapV2Router02 public immutable uniswapRouter;
    IUniswapV2Factory public immutable uniswapFactory;
    address public immutable owner;
    address public immutable WETH;

    error TransferFailed();

    event LiquidityProvided(address indexed user, address inputToken, uint256 amount);
    event LiquidityWithdrawn(
        address indexed user,
        uint256 liquidity,
        address tokenA,
        address tokenB
    );

    constructor(address router) {
        require(router != address(0), "SnapfyUniswapV2: Router address cannot be zero");
        uniswapRouter = IUniswapV2Router02(router);
        uniswapFactory = IUniswapV2Factory(uniswapRouter.factory());
        WETH = uniswapRouter.WETH();
        owner = msg.sender;
    }

    receive() external payable {}

    function provideLiquidity(address inputToken, uint256 inputAmount) external {
        if (!IERC20(inputToken).transferFrom(msg.sender, address(this), inputAmount))
            revert TransferFailed();

        uint256 half = inputAmount / 2;
        uint256 ethReceived = _swapTokensForETH(inputToken, half);

        uint256 tokenForLiquidity = inputAmount - half;
        _addLiquidityETH(inputToken, tokenForLiquidity, ethReceived);

        emit LiquidityProvided(msg.sender, inputToken, inputAmount);
    }

    function provideLiquidityETH(address token) external payable {
        require(msg.value > 0, "SnapfyUniswapV2: ETH amount must be greater than zero");

        uint256 half = msg.value / 2;
        uint256 tokenReceived = _swapETHForTokens(token, half);

        _addLiquidityETH(token, tokenReceived, msg.value - half);

        emit LiquidityProvided(msg.sender, token, msg.value);
    }

    function withdraw(address tokenA, address tokenB, uint256 liquidity) external {
        address pair = uniswapFactory.getPair(tokenA, tokenB);
        require(pair != address(0), "SnapfyUniswapV2: Pair does not exist");

        IERC20(pair).transferFrom(msg.sender, address(this), liquidity);
        IERC20(pair).approve(address(uniswapRouter), liquidity);

        uniswapRouter.removeLiquidity(tokenA, tokenB, liquidity, 0, 0, msg.sender, block.timestamp);

        emit LiquidityWithdrawn(msg.sender, liquidity, tokenA, tokenB);
    }

    function _swapTokensForETH(
        address token,
        uint256 amount
    ) internal returns (uint256 amountReceived) {
        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = WETH;

        if (!IERC20(token).approve(address(uniswapRouter), amount)) revert TransferFailed();

        uint256[] memory amounts = uniswapRouter.swapExactTokensForETH(
            amount,
            0,
            path,
            address(this),
            block.timestamp
        );

        amountReceived = amounts[1];
    }

    function _swapETHForTokens(
        address token,
        uint256 ethAmount
    ) internal returns (uint256 amountReceived) {
        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = token;

        uint256[] memory amounts = uniswapRouter.swapExactETHForTokens{value: ethAmount}(
            0,
            path,
            address(this),
            block.timestamp
        );

        amountReceived = amounts[1];
    }

    function _addLiquidityETH(address token, uint256 tokenAmount, uint256 ethAmount) internal {
        if (!IERC20(token).approve(address(uniswapRouter), tokenAmount)) revert TransferFailed();

        uniswapRouter.addLiquidityETH{value: ethAmount}(
            token,
            tokenAmount,
            0,
            0,
            msg.sender,
            block.timestamp
        );
    }
}
