// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import "../src/SnapfyUniswapV2.sol";
import "../src/interfaces/IUniswapV2Router02.sol";
import "../src/interfaces/IWETH.sol";
import "../src/interfaces/IERC20.sol";

contract SnapfyUniswapV2Test is Test {
    SnapfyUniswapV2 public snapfy;

    address constant UNISWAP_V2_ROUTER = 0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24;
    address constant WETH = 0x4200000000000000000000000000000000000006;
    address constant USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    address owner = makeAddr("owner");
    address user = makeAddr("user");

    uint256 baseMainnet = vm.createFork("https://mainnet.base.org");

    function setUp() public {
        vm.selectFork(baseMainnet);
        snapfy = new SnapfyUniswapV2(UNISWAP_V2_ROUTER);
    }

    function testProvideLiquidity() public {
        uint256 amount = 100 * 1e6;
        deal(USDC, user, amount);

        vm.startPrank(user);
        IERC20(USDC).approve(address(snapfy), amount);
        snapfy.provideLiquidity(USDC, amount);
        vm.stopPrank();

        address pair = IUniswapV2Factory(snapfy.uniswapRouter().factory()).getPair(WETH, USDC);
        uint256 lpBalance = IERC20(pair).balanceOf(user);
        uint256 ethBalance = address(snapfy).balance;
        uint256 usdcBalance = IERC20(USDC).balanceOf(address(snapfy));
        console.log("Pair address: ", pair);
        console.log("LP balance: ", lpBalance);
        console.log("ETH balance: ", ethBalance);
        console.log("USDC balance: ", usdcBalance);

        assertGt(lpBalance, 0, "LP balance should increase");
    }

    function testProvideLiquidityETH() public {
        uint256 ethAmount = 0.05 ether;
        vm.deal(user, 0.05 ether);

        address pair = IUniswapV2Factory(snapfy.uniswapRouter().factory()).getPair(WETH, USDC);

        vm.startPrank(user);
        // Check Balance Before
        uint256 ethBalanceBefore = user.balance;
        uint256 lpBalanceBefore = IERC20(pair).balanceOf(user);
        console.log("ETH balance before: ", ethBalanceBefore);
        console.log("LP balance before: ", lpBalanceBefore);

        snapfy.provideLiquidityETH{value: ethAmount}(USDC);

        // Check balances after
        uint256 ethBalanceAfter = user.balance;
        uint256 usdcBalanceAfter = IERC20(USDC).balanceOf(address(snapfy));
        uint256 lpBalanceAfter = IERC20(pair).balanceOf(user);

        console.log("ETH balance after: ", ethBalanceAfter);
        console.log("USDC balance after: ", usdcBalanceAfter);
        console.log("LP balance after: ", lpBalanceAfter);
        vm.stopPrank();

        uint256 lpBalance = IERC20(pair).balanceOf(user);

        assertGt(lpBalance, 0, "LP balance should increase");
        assertGt(lpBalanceAfter, lpBalanceBefore, "LP balance should increase");
        assertLt(ethBalanceAfter, ethBalanceBefore, "ETH balance should decrease");
    }

    function testWithdrawLiquidity() public {
        uint256 amount = 100 * 1e6;
        deal(USDC, user, amount);

        address pair = IUniswapV2Factory(snapfy.uniswapRouter().factory()).getPair(WETH, USDC);

        // ADD LIQUIDITY
        vm.startPrank(user);
        IERC20(USDC).approve(address(snapfy), amount);
        snapfy.provideLiquidity(USDC, amount);
        vm.stopPrank();

        // Check balances before withdrawing
        uint256 ethBalanceBefore = user.balance;
        uint256 usdcBalanceBefore = IERC20(USDC).balanceOf(user);
        uint256 lpBalanceBefore = IERC20(pair).balanceOf(user);

        assertGt(lpBalanceBefore, 0, "LP balance should increase");

        console.log("ETH balance before withdraw: ", ethBalanceBefore);
        console.log("USDC balance before withdraw: ", usdcBalanceBefore);
        console.log("LP balance before withdraw: ", lpBalanceBefore);

        // WITHDRAW LIQUIDITY
        vm.startPrank(user);
        IERC20(pair).approve(address(snapfy), lpBalanceBefore);
        snapfy.withdraw(WETH, USDC, lpBalanceBefore);
        vm.stopPrank();

        // Check balances after withdrawing
        uint256 ethBalanceAfter = IERC20(WETH).balanceOf(user);
        uint256 usdcBalanceAfter = IERC20(USDC).balanceOf(user);
        uint256 lpBalanceAfter = IERC20(pair).balanceOf(user);

        console.log("ETH balance after withdraw: ", ethBalanceAfter);
        console.log("USDC balance after withdraw: ", usdcBalanceAfter);
        console.log("LP balance after withdraw: ", lpBalanceAfter);

        assertGt(ethBalanceAfter, ethBalanceBefore, "ETH balance should increase");
        assertGt(usdcBalanceAfter, usdcBalanceBefore, "USDC balance should increase");
        assertLt(lpBalanceAfter, lpBalanceBefore, "LP balance should decrease");
    }
}
