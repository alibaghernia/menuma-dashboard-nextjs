"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { Flex, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import React from "react";

const CatalogsTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const renderlabels: ColumnProps<unknown>["render"] = (val) => {
    return (
      <Flex wrap="wrap" gap={8}>
        {val?.map?.((label: string, idx: number) => (
          <div
            className="py-2 px-4 bg-typography/[.05] text-typography rounded-[.5rem]"
            key={idx}
          >
            {label}
          </div>
        ))}
      </Flex>
    );
  };
  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "برچسب ها",
      dataIndex: "labels",
      responsive: ["md"],
      render: renderlabels,
    },
    {
      key: "actions",
      title: "عملیات",
      width: 100,
      render: (value, rec, idx) => {
        return (
          <TableActions
            value={value}
            record={rec}
            index={idx}
            seeAllNames={{
              title: "نام",
              labels: "برچسب ها",
            }}
            seeAllRender={{
              labels: renderlabels,
            }}
            seeAll
          />
        );
      },
    },
  ];
  const dataSource = [
    {
      title: "test",
      labels: ["رایگان"],
    },
  ];
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      locale={{
        emptyText: "داده ای وجود ندارد",
      }}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default CatalogsTable;
