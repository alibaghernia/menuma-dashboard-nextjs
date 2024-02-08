import { FC } from "react";

declare type FormType = FC<{ isEdit?: boolean }>;

declare interface IPagination {
  page: number;
  limit: number;
}
