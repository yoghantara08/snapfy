// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

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
}
