import { FC } from "react";

declare interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

declare type Icon = FC<IconProps>;
