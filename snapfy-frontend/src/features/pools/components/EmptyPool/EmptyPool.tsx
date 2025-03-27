import React from "react";

import Link from "next/link";

import { WavesLadderIcon } from "lucide-react";

import Button from "@/components/Button/Button";

interface EmptyPoolProps {
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

const EmptyPool = ({
  title,
  description,
  buttonText,
  onClick,
}: EmptyPoolProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-sm border py-[50px]">
      <div className="bg-opacity-blue text-accent-blue rounded-sm px-3 py-3">
        <WavesLadderIcon className="size-10" />
      </div>
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-secondary w-full md:w-[500px]">{description}</p>
      </div>
      <Link href={"/pools"} className="mt-1">
        <Button
          onClick={onClick && onClick}
          className="!bg-opacity-blue !text-accent-blue hover:!bg-accent-blue/40 !px-10"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default EmptyPool;
