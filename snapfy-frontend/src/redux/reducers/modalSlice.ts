import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  reviewModalV2: boolean;
  poolVersion: string;
  dashboardSearch: string;
  abi: object[];
}

const initialState: modalState = {
  reviewModalV2: false,
  poolVersion: "All Pools",
  dashboardSearch: "",
  abi: [
    {
      inputs: [{ internalType: "address", name: "_router", type: "address" }],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "inputToken",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
      ],
      name: "LiquidityProvided",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "liquidity",
          type: "uint256",
        },
      ],
      name: "LiquidityWithdrawn",
      type: "event",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "inputToken", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
        { internalType: "uint256", name: "amountAMin", type: "uint256" },
        { internalType: "uint256", name: "amountBMin", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "provideLiquidity",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "router",
      outputs: [
        {
          internalType: "contract IUniswapV2Router02",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
        { internalType: "uint256", name: "liquidity", type: "uint256" },
        { internalType: "uint256", name: "amountAMin", type: "uint256" },
        { internalType: "uint256", name: "amountBMin", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setReviewModalV2: (state, action: PayloadAction<boolean>) => {
      state.reviewModalV2 = action.payload;
    },
    setPoolVersion: (state, action: PayloadAction<string>) => {
      state.poolVersion = action.payload;
    },
    setDashboardSearch: (state, action: PayloadAction<string>) => {
      state.dashboardSearch = action.payload;
    },
  },
});

export const { setReviewModalV2, setPoolVersion, setDashboardSearch } =
  modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;
