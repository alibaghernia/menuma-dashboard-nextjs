import { FC, HTMLAttributes } from "react";

declare interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number;
  height?: number;
  color?: string;
}

declare type Icon = FC<IconProps>;
