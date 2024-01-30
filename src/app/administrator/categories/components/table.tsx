"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import React from "react";

const CategoriesTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      key: "name",
      title: "نام",
      dataIndex: "name",
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
              name: "نام",
              cafe_restaurant: "کافه یا رستوران",
            }}
            seeAll
          />
        );
      },
    },
  ];
  const dataSource = [
    {
      name: "test",
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

export default CategoriesTable;
