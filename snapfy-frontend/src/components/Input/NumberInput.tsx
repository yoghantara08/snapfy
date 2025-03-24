import React, { ReactNode } from "react";

import classNames from "classnames";

export interface NumberInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onBlur?: () => void;
  suffix?: ReactNode;
  className?: string;
  placeholder?: string;
}

const NumberInput = ({
  className,
  onChange,
  value,
  onBlur,
  placeholder,
  suffix,
}: NumberInputProps) => {
  return (
    <div className="text-secondary space-y-2">
      <div className="flex w-full items-center justify-between gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={classNames(
            "h-full w-full bg-transparent text-end leading-none focus:outline-none",
            className,
          )}
        />
        {suffix && <div className="pr-2.5">{suffix}</div>}
      </div>
    </div>
  );
};

export default NumberInput;
