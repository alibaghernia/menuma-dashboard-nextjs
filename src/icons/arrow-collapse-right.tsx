import React from "react";
import { Icon } from "./type";

const ArrowCollapseRightIcon: Icon = ({
  width = 20,
  height = 20,
  color = "#000",
  ...props
}) => {
  return (
    <span {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          d="M12.08 4.08L20 12l-7.92 7.92l-1.41-1.42l5.5-5.5H2v-2h14.17l-5.5-5.5zM20 12v10h2V2h-2z"
        />
      </svg>
    </span>
  );
};

export default ArrowCollapseRightIcon;
