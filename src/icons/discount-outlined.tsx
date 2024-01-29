import React from "react";
import { Icon } from "./type";
import IconWrapper from "./_icon-wrapper";

const DiscountOutlined: Icon = ({
  width = 14,
  height = 14,
  color = "#000",
  ...props
}) => {
  return (
    <IconWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 14 14"
      >
        <g
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M.5 11a1 1 0 0 0 .998 1h11.004a1 1 0 0 0 .998-1V8.966a2.037 2.037 0 0 1 0-3.932V3a1 1 0 0 0-.998-1H1.498A1 1 0 0 0 .5 3v2.03a2.037 2.037 0 0 1 0 3.94zm4.02-1.5l5-5" />
          <path d="M5.02 5.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m4 4a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1" />
        </g>
      </svg>
    </IconWrapper>
  );
};

export default DiscountOutlined;
