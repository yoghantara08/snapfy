import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import Image from "next/image";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

interface RemoveLiquidityModal {
  open: boolean;
  handleClose: () => void;
}

const RemoveLiquidityModal = ({ handleClose, open }: RemoveLiquidityModal) => {
  const [amount, setAmount] = useState("0");

  return (
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
          <IoClose className="cursor-pointer text-2xl" onClick={handleClose} />
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
          <div className="bg-opacity-blue text-accent-blue rounded-sm px-1 py-[2px]">
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
              <Image src={UsdcIcon} alt="usdcicon" className="w-[25px]"></Image>
              <p>0.001 USDC</p>
            </div>
          </div>
        </div>
        <button
          // disabled={amount === "0"}
          className="disabled:bg-opacity-blue bg-accent-blue w-full rounded-sm px-4 py-3 text-2xl text-white"
        >
          Remove
        </button>
      </Box>
    </Modal>
  );
};

export default RemoveLiquidityModal;
