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
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "ظرفیت",
      dataIndex: "capacity",
    },
    {
      title: "تاریخ",
      dataIndex: "date",
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
              title: "نام",
              capacity: "ظرفیت",
              date: "تاریخ",
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
      capacity: 10,
      date: "12 بهمن 1402",
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
