import React from "react";
import { Icon } from "./type";
import classNames from "classnames";
import IconWrapper from "./_icon-wrapper";

const PopDots: Icon = ({
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
        viewBox="0 0 20 20"
      >
        <g fill={color}>
          <circle cx="5" cy="10" r="2" />
          <circle cx="10" cy="10" r="2" />
          <circle cx="15" cy="10" r="2" />
        </g>
      </svg>
    </IconWrapper>
  );
};

export default PopDots;
