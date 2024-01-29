"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import React from "react";

const DiscountsTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "مقدار تخفیف",
      dataIndex: "amount",
    },
    {
      title: "توضیحات",
      dataIndex: "descriptions",
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
              amount: "مقدار تخفیف",
              descriptions: "توضیحات",
            }}
            seeAll
          />
        );
      },
    },
  ];
  const dataSource = [
    {
      title: "تخفیف تستی",
      amount: "10%",
      descriptions: "پنج شنبه ها از ساعت 16 تا 15 10 درصدر تخفیف بگیرید!",
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

export default DiscountsTable;
