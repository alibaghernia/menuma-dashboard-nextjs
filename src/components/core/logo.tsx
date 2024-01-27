"use client";
import React from "react";
import { ILogo } from "./types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useFontFamily } from "@/utils/hooks";

export const Logo: ILogo = (props) => {
  const fontFamily = useFontFamily();
  return (
    <Link
      href="/"
      className={twMerge(
        classNames(
          "text-[2.5rem] flex items-center font-bold w-fit",
          props.className
        )
      )}
      style={{
        fontFamily,
      }}
    >
      <div className="text-primary">منو</div>
      <div className="text-secondary">ما</div>
    </Link>
  );
};
