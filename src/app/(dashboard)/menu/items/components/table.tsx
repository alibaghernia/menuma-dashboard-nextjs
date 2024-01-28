"use client";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import React from "react";

const ItemsTable = () => {
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
          <Flex vertical={breakpoints.isXs} align="center">
            <Col>
              <Button icon={<EditOutlined />} color={primaryColor} type="link">
                ویرایش
              </Button>
            </Col>
            <Col>
              <Button icon={<EditOutlined />} danger type="text">
                حذف
              </Button>
            </Col>
          </Flex>
        );
      },
    },
  ];
  // const dataSource = [];
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      // locale={{
      //   emptyText: "داده ای وجود ندارد",
      // }}
      columns={columns}
      // dataSource={dataSource}
    />
  );
};

export default ItemsTable;
