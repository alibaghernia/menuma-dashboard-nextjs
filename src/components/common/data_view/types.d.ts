import { TableProps } from "antd/lib";
import { AnyObject } from "antd/lib/_util/type";
import { RefTable } from "antd/lib/table/interface";
import { FC } from "react";

declare interface IDataViewProps<T = AnyObject> {
  data: T[];
  columns?: string[];
  dragSorting?: {
    onSort: (item: T, newOrder: number) => void;
  };
  filters?: {
    items: {
      name: string;
      title: string;
      intialValue?: boolean;
    }[];
    state: Record<string, boolean>;
    setState: (state: Record<string, boolean>) => void;
  };
  options: RefTable<T>;
  onChange: (object: {
    search: string;
    filters: Record<string, boolean>;
  }) => void;
}

declare type IDataView<T = unknown> = FC<IDataViewProps<T>>;
