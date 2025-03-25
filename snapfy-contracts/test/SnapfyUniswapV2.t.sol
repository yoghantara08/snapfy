// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test, console} from "forge-std/Test.sol";
import "../src/SnapfyUniswapV2.sol";
import "../src/interfaces/IUniswapV2Router02.sol";
import "../src/interfaces/IWETH.sol";
import "../src/interfaces/IERC20.sol";

contract SnapfyUniswapV2Test is Test {
    SnapfyUniswapV2 public snapfy;

    address constant UNISWAP_V2_ROUTER =
        0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24;

    address constant WETH = 0x4200000000000000000000000000000000000006;
    address constant DAI = 0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb;
    address constant USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    address owner = makeAddr("owner");
    address user = makeAddr("user");

    uint256 baseMainnet = vm.createFork("https://mainnet.base.org");

    function setUp() public {
        vm.selectFork(baseMainnet);
        snapfy = new SnapfyUniswapV2(UNISWAP_V2_ROUTER);
    }

    // function testProvideLiquidityETH() public {
    //     vm.deal(user, 1 ether);
    //     uint256 amount = 1 ether;

    //     vm.startPrank(user);
    //     snapfy.provideLiquidity{value: amount}(
    //         address(0),
    //         amount,
    //         snapfy.WETH(),
    //         USDC,
    //         0,
    //         0,
    //         block.timestamp + 1 hours
    //     );
    //     vm.stopPrank();

    //     address pair = IUniswapV2Factory(snapfy.router().factory()).getPair(
    //         snapfy.WETH(),
    //         USDC
    //     );
    //     console.log("Pair address: ", pair);
    //     uint256 lpBalance = IERC20(pair).balanceOf(user);
    //     console.log("LP balance: ", lpBalance);
    //     assertGt(lpBalance, 0, "LP balance should increase");
    // }

    function testProvideLiquidityFromDAIToWETH_USDC() public {
        uint256 amount = 1000e18;
        deal(DAI, user, amount);

        vm.startPrank(user);
        IERC20(DAI).approve(address(snapfy), amount);
        snapfy.provideLiquidity(
            DAI,
            amount,
            WETH,
            USDC,
            0,
            0,
            block.timestamp + 1 hours
        );
        vm.stopPrank();

        address pair = IUniswapV2Factory(snapfy.router().factory()).getPair(
            WETH,
            USDC
        );
        console.log("Pair address: ", pair);
        uint256 lpBalance = IERC20(pair).balanceOf(user);
        console.log("LP balance: ", lpBalance);
        assertGt(lpBalance, 0, "LP balance should increase");
    }

    function testProvideLiquidityFromUSDCtoWETH_USDC() public {
        uint256 amount = 1000e18;
        deal(USDC, user, amount);

        vm.startPrank(user);
        IERC20(USDC).approve(address(snapfy), amount);
        snapfy.provideLiquidity(
            USDC,
            amount,
            WETH,
            USDC,
            0,
            0,
            block.timestamp + 1 hours
        );
        vm.stopPrank();

        address pair = IUniswapV2Factory(snapfy.router().factory()).getPair(
            WETH,
            USDC
        );
        console.log("Pair address: ", pair);
        uint256 lpBalance = IERC20(pair).balanceOf(user);
        console.log("LP balance: ", lpBalance);
        assertGt(lpBalance, 0, "LP balance should increase");
    }

    function testWithdrawLiquidity() public {
        uint256 amount = 1000e18;
        deal(DAI, user, amount);

        vm.startPrank(user);
        IERC20(DAI).approve(address(snapfy), amount);
        snapfy.provideLiquidity(
            DAI,
            amount,
            WETH,
            USDC,
            0,
            0,
            block.timestamp + 1 hours
        );

        address pair = IUniswapV2Factory(snapfy.router().factory()).getPair(
            WETH,
            USDC
        );
        uint256 lpBalance = IERC20(pair).balanceOf(user);
        IERC20(pair).approve(address(snapfy), lpBalance);

        snapfy.withdraw(WETH, USDC, lpBalance, 0, 0, block.timestamp + 1 hours);
        vm.stopPrank();

        assertEq(IERC20(pair).balanceOf(user), 0, "LP balance should be zero");
    }
}
