import React from "react";
import { Icon } from "./type";
import IconWrapper from "./_icon-wrapper";

const BellRingOutlinedIcon: Icon = ({
  width = 16,
  height = 16,
  color = "#fff",
  ...props
}) => {
  return (
    <IconWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9m4.3 13a1.94 1.94 0 0 0 3.4 0M4 2C2.8 3.7 2 5.7 2 8m20 0c0-2.3-.8-4.3-2-6"
        />
      </svg>
    </IconWrapper>
  );
};

export default BellRingOutlinedIcon;
