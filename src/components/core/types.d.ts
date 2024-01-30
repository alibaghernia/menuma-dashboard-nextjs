import { FC, PropsWithChildren } from "react";

declare type ILogo = FC<
  PropsWithChildren<{
    className?: string;
    href?: string;
  }>
>;
