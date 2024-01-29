"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { Table, TableProps } from "antd/lib";
import React from "react";

const HallsTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      title: "کد",
      dataIndex: "code",
    },
    {
      title: "ظرفیت",
      dataIndex: "capacity",
    },
    {
      title: "حداکثر ظرفیت",
      dataIndex: "max_capacity",
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
              code: "کد",
              capacity: "ظرفیت",
              max_capacity: "حداکثر ظرفیت",
            }}
            seeAll
          />
        );
      },
    },
  ];
  const dataSource = [
    {
      code: "hall-1",
      capacity: 10,
      max_capacity: 15,
    },
  ];
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default HallsTable;
