import React, { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import Image from "next/image";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

import EtherIcon from "../../../../../public/Image/etherIcon.svg";
import UsdcIcon from "../../../../../public/Image/usdcIcon.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95vw", sm: "500px" },
  bgcolor: "#ffffe3",
  boxShadow: 24,
  p: 2,
  border: "1px solid #c9c9c9",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#2775ca",
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 30,
    height: 30,
  },
  "& .MuiSwitch-track": {
    borderRadius: 100,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const PoolList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState("0");

  const [state, setState] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
  };

  return (
    <div className="poolListGrid grid w-full gap-8">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="grid content-center items-center justify-center justify-items-center"
            style={{ gridTemplateColumns: "30px 1fr 30px" }}
          >
            <IoClose
              className="cursor-pointer text-2xl"
              onClick={handleClose}
            />
            <p className="text-lg">Remove Liquidity</p>
            <div></div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-center">
              <Image src={EtherIcon} alt="icon" className="w-[50px]" />
              <Image
                src={UsdcIcon}
                alt="icon"
                className="w-[50px] translate-x-[-10px]"
              />
            </div>
            <h2 className="text-2xl font-medium">WETH/USDC</h2>
            <div className="bg-opacity-blue text-accent-blue rounded-[10px] px-1 py-[2px]">
              v2
            </div>
          </div>
          <div className="bg-opacity-blue mt-[0.5rem] flex w-full flex-col items-center justify-center gap-3 rounded-t-[10px] p-3">
            <div className="flex w-full items-center justify-between gap-5 rounded-b-[10px]">
              <p className="self-start">Withdrawal amount</p>
              <p className="self-start">Balance: 99999999</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                placeholder="0"
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 0) value = 0;
                  if (value > 100) value = 100;
                  setAmount(value.toString());
                }}
                className="text-center text-8xl font-light outline-0"
                min={0}
                max={100}
                value={amount}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              {["25%", "50%", "75%", "100%"].map((item, index) => (
                <button
                  key={index}
                  className="bg-background rounded-[5px] px-2 py-1"
                  onClick={() => setAmount(item)}
                >
                  {item !== "100%" ? item : "MAX"}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-opacity-blue flex items-center justify-between gap-5 rounded-b-[10px] p-3">
            <p>Withdraw as ETH</p>
            <IOSSwitch checked={state} onChange={handleChange} />
          </div>
          <div className="mt-[0.5rem] flex w-full flex-col items-center justify-center gap-1">
            <div className="flex w-full items-center justify-between gap-5 rounded-b-[10px]">
              <p>WETH position</p>
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={EtherIcon}
                  alt="etherIcon"
                  className="w-[25px]"
                ></Image>
                <p>0.001 WETH</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-5 rounded-b-[10px]">
              <p>USDC position</p>
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={UsdcIcon}
                  alt="usdcicon"
                  className="w-[25px]"
                ></Image>
                <p>0.001 USDC</p>
              </div>
            </div>
          </div>
          <button
            disabled={amount === "0"}
            className="disabled:bg-opacity-blue bg-accent-blue w-full rounded-[10px] px-4 py-3 text-2xl text-white"
          >
            Remove
          </button>
        </Box>
      </Modal>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border-border2 flex min-h-[200px] w-full flex-col items-center justify-center gap-5 rounded-[10px] border-[1px] p-5"
        >
          <div className="sx:flex-row sx:gap-8 flex flex-col items-center justify-between gap-4">
            <div className="flex w-fit items-center justify-center gap-2">
              <div className="flex">
                <Image src={UsdcIcon} alt="usdcIcon" className="w-[40px]" />
                <Image
                  src={EtherIcon}
                  alt="EtherIcon"
                  className="w-[40px] translate-x-[-10px]"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <h3 className="text-xl font-medium">USDC/ETH</h3>
                <div className="flex items-center gap-2">
                  <div className="bg-opacity-blue text-accent-blue rounded-[7px] px-2 py-[2px]">
                    v2
                  </div>
                  <div className="bg-opacity-blue text-accent-blue rounded-[7px] px-2 py-[2px]">
                    0.3%
                  </div>
                </div>
              </div>
            </div>
            <p className="bg-opacity-blue text-accent-blue rounded-[7px] px-2 py-1">
              4.4% APR
            </p>
          </div>
          <div className="bg-opacity-blue flex w-full flex-col items-center justify-center gap-2 p-3">
            <div className="flex w-full items-center justify-between gap-5">
              <p>Total Value Locked</p>
              <p>$22.5M</p>
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <p>24h Volume</p>
              <p>$905.6K</p>
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <p>24h Fee</p>
              <p>$2.7K</p>
            </div>
          </div>
          <button
            onClick={handleOpen}
            className="bg-opacity-blue text-accent-blue flex w-full items-center justify-center gap-1 rounded-[5px] px-3 py-2"
          >
            <FaMinus className="text-sm" />
            Remove Liquidity
          </button>
        </div>
      ))}
    </div>
  );
};

export default PoolList;
