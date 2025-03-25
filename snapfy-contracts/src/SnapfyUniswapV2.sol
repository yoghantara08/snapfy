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
