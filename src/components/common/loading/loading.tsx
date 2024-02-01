import { Spin } from "antd";
import React from "react";

export const Loading = () => {
  return (
    <div className="fixed bg-white inset-0 flex justify-center items-center z-[2009]">
      <Spin />
    </div>
  );
};
