"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import React from "react";

const ItemsTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      title: "نام",
      dataIndex: "first_name",
    },
    {
      key: "actions",
      title: "عملیات",
      width: 100,
      render: (value, rec, idx) => {
        return <TableActions value={value} record={rec} index={idx} />;
      },
    },
  ];
  // const dataSource = [];
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      columns={columns}
      // dataSource={dataSource}
    />
  );
};

export default ItemsTable;
