"use client";
import { useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import React from "react";

const CategoriesTable = () => {
  const primaryColor = useTailwindColor("primary");
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
          <Flex>
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
