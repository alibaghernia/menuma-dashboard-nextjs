"use client";
import React, { useMemo } from "react";
import { IDevelopingBadge } from "./types";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Flex } from "antd/lib";

const DevelopingBadge: IDevelopingBadge = ({ children, ...props }) => {
  const message = useMemo(() => {
    switch (props.type) {
      case "DEV": {
        return "در حال توسعه";
      }
    }
  }, []);

  return (
    <Flex gap={4} align="center" wrap="wrap">
      {children}
      <div
        className={twMerge(
          classNames(
            "border rounded-[1rem] py-[.1rem] px-[.5rem] text-[.6rem]",
            {
              "border-primary text-primary": props.type == "DEV",
            }
          )
        )}
      >
        {message}
      </div>
    </Flex>
  );
};

export default DevelopingBadge;
