"use client";

import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { GrShare } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

import Image from "next/image";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import EtherIcon from "../../../../public/Image/etherIcon.svg";
import UsdcIcon from "../../../../public/Image/usdcIcon.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95vw", sm: "500px" },
  bgcolor: "#ffffe3",
  boxShadow: 24,
  p: 1,
  borderRadius: "10px",
};

const PoolV2 = () => {
  const [amount, setAmount] = useState(0);

  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const [type, setType] = useState("ETH");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex w-full items-start justify-center">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="my-[1rem] flex w-full flex-col items-start justify-center gap-4 px-2">
            <div className="flex w-full items-center justify-between gap-3">
              <p className="text-xl font-medium">Add Liquidity</p>
              <IoClose
                className="cursor-pointer text-2xl"
                onClick={handleClose}
              />
            </div>
            <div className="border-border2 flex min-h-[300px] w-full flex-col gap-3 rounded-[10px] border-[1px] p-4">
              <div className="border-border2 w-full gap-1 rounded-[5px] border-[1px] p-2">
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex items-center justify-start gap-1">
                    <Image
                      src={EtherIcon}
                      alt="ethericon"
                      className="w-[40px]"
                    />
                    <h2 className="text-xl font-medium">ETH</h2>
                  </div>
                  <input
                    type="number"
                    className="w-full text-end text-3xl outline-none"
                    onChange={(e) => handleAmount(e)}
                    value={amount}
                    disabled
                    placeholder="0"
                  />
                </div>
                <div className="flex w-full items-center justify-between gap-2 text-gray-500">
                  <p>Balance: 1.8461</p>
                  <p>~ $2150.75</p>
                </div>
              </div>
              <div className="bg-opacity-blue mx-auto w-fit rounded-[100px] p-2">
                <FaAngleDown className="text-accent-blue" />
              </div>
              <p>Est. Pool Allocation</p>
              <div className="sx:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-2">
                <div className="border-border2 flex items-center justify-between gap-2 border-[1px] p-2">
                  <div className="flex items-center justify-center gap-1">
                    <Image src={UsdcIcon} alt="UsdcIcon" className="w-[40px]" />
                    <h3 className="text-xl font-medium">USDC</h3>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <h3 className="text-2xl">0.5</h3>
                    <p>~ $1074</p>
                  </div>
                </div>
                <div className="border-border2 flex items-center justify-between gap-2 border-[1px] p-2">
                  <div className="flex items-center justify-center gap-1">
                    <Image src={UsdcIcon} alt="UsdcIcon" className="w-[40px]" />
                    <h3 className="text-xl font-medium">USDC</h3>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <h3 className="text-2xl">0.5</h3>
                    <p>~ $1074</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <div className="flex w-full items-center justify-between gap-2">
                  <p>Pool Share</p>
                  <p>0.0537%</p>
                </div>
                <div className="flex w-full items-center justify-between gap-2">
                  <p>Est. Daily Fee Income</p>
                  <p>$10.65</p>
                </div>
              </div>
              <button
                disabled={amount <= 0}
                onClick={handleOpen}
                className="disabled:bg-opacity-blue bg-accent-blue w-full rounded-[5px] px-4 py-2 text-xl text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="my-[2rem] flex w-full flex-col items-start justify-center gap-4 px-2 sm:w-[600px] sm:px-0">
        <p className="w-full text-center sm:text-start">
          <span className="font-semibold">Pools &gt;</span> USDC/ETH V2 Pool
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start sm:gap-0">
          <div className="flex items-center justify-center">
            <Image src={EtherIcon} alt="EtherIcon" className="w-[60px]" />
            <Image
              src={UsdcIcon}
              alt="usdcIcon"
              className="w-[60px] translate-x-[-10px]"
            />
          </div>
          <div className="flex flex-col items-center justify-center sm:items-start">
            <div className="flex items-center justify-start gap-2">
              <h2 className="text-4xl font-medium">USDC/ETH</h2>
              <div className="text-accent-blue bg-opacity-blue rounded-[5px] px-2 py-[2px]">
                v2
              </div>
              <div className="text-accent-blue bg-opacity-blue rounded-[5px] px-2 py-[2px]">
                0.3%
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 break-all sm:justify-start">
              <p className="text-center sm:text-start">
                0x0000000000000000000000000000000000000
              </p>
              <GrShare />
            </div>
          </div>
        </div>
        <div className="border-border2 flex min-h-[300px] w-full flex-col gap-3 rounded-[10px] border-[1px] p-4">
          <div className="flex w-full items-center justify-between gap-4">
            <p>You send</p>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <button className="bg-opacity-blue text-accent-blue rounded-[3px] px-2 py-1">
                25%
              </button>
              <button className="bg-opacity-blue text-accent-blue rounded-[3px] px-2 py-1">
                50%
              </button>
              <button className="bg-opacity-blue text-accent-blue rounded-[3px] px-2 py-1">
                75%
              </button>
              <button className="bg-opacity-blue text-accent-blue rounded-[3px] px-2 py-1">
                100%
              </button>
            </div>
          </div>
          <div className="border-border2 w-full gap-1 rounded-[5px] border-[1px] p-2">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center justify-start gap-1">
                <Image src={EtherIcon} alt="ethericon" className="w-[40px]" />
                <FormControl
                  sx={{ m: 1, minWidth: 90, transform: "translateX(-15px)" }}
                >
                  <Select
                    value={type}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      "& .MuiSelect-select": {
                        paddingRight: "8px !important",
                        paddingBlock: "4px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Removes the border
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="ETH">ETH</MenuItem>
                    <MenuItem value="USDT">USDT</MenuItem>
                    <MenuItem value="USDC">USDC</MenuItem>
                    <MenuItem value="WETH">WETH</MenuItem>
                    <MenuItem value="WBTC">WBTC</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <input
                type="number"
                className="w-full text-end text-3xl outline-none"
                onChange={(e) => handleAmount(e)}
                value={amount}
                placeholder="0"
              />
            </div>
            <div className="flex w-full items-center justify-between gap-2 text-gray-500">
              <p>Balance: 1.8461</p>
              <p>~ $2150.75</p>
            </div>
          </div>
          <div className="bg-opacity-blue mx-auto w-fit rounded-[100px] p-2">
            <FaAngleDown className="text-accent-blue" />
          </div>
          <p>Est. Pool Allocation</p>
          <div className="sx:grid-cols-2 grid w-full grid-cols-1 items-center justify-center gap-2">
            <div className="border-border2 flex items-center justify-between gap-2 border-[1px] p-2">
              <div className="flex items-center justify-center gap-1">
                <Image src={UsdcIcon} alt="UsdcIcon" className="w-[40px]" />
                <h3 className="text-xl font-medium">USDC</h3>
              </div>
              <div className="flex flex-col items-end justify-center">
                <h3 className="text-2xl">0.5</h3>
                <p>~ $1074</p>
              </div>
            </div>
            <div className="border-border2 flex items-center justify-between gap-2 border-[1px] p-2">
              <div className="flex items-center justify-center gap-1">
                <Image src={UsdcIcon} alt="UsdcIcon" className="w-[40px]" />
                <h3 className="text-xl font-medium">USDC</h3>
              </div>
              <div className="flex flex-col items-end justify-center">
                <h3 className="text-2xl">0.5</h3>
                <p>~ $1074</p>
              </div>
            </div>
          </div>
          <button
            disabled={amount <= 0}
            onClick={handleOpen}
            className="disabled:bg-opacity-blue bg-accent-blue w-full rounded-[5px] px-4 py-2 text-xl text-white"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoolV2;
