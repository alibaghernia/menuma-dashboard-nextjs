import classNames from "classnames";
import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const IconWrapper: FC<PropsWithChildren<HTMLAttributes<HTMLSpanElement>>> = ({
  children,
  ...props
}) => {
  return (
    <span
      {...props}
      className={twMerge(classNames("w-fit block", props.className))}
    >
      {children}
    </span>
  );
};

export default IconWrapper;
