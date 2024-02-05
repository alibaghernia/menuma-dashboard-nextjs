"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import React from "react";

const CustomersTable = () => {
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
      title: "شماره موبایل",
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
              mobile: "شماره موبایل",
            }}
            seeAll
          />
        );
      },
    },
  ];
  const dataSource = [
    {
      first_name: "test",
      last_name: "test",
      mobile: "09900000000",
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

export default CustomersTable;
