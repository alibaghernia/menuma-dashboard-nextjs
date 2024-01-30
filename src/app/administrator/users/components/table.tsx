"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { Table, TableProps } from "antd/lib";
import React from "react";

const EventsTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      title: "نام",
      dataIndex: "first_name",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "last_name",
    },
    {
      title: "موبایل",
      dataIndex: "mobile",
      responsive: ["md"],
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
              first_name: "نام",
              last_name: "نام خانوادگی",
              mobile: "موبایل",
            }}
            seeAll
          />
        );
      },
    },
  ];
  const dataSource = [
    {
      first_name: "name test",
      last_name: "family test",
      mobile: "09000000000",
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

export default EventsTable;
