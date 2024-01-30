"use client";
import TableActions from "@/components/common/_table/actions";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Flex, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import React from "react";

const CafeRestaurantsTable = () => {
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const renderLogo: ColumnProps<unknown>["render"] = (value, rec, idx) => {
    if (value && /^https:|http:/.test(value))
      return (
        <Avatar
          src={value}
          size="large"
          className="border border-typography/[.1]"
        />
      );
    return (
      <div className="text-typography py-2 px-4 bg-typography/[.1] rounded-[1rem] w-fit">
        بدون لوگو
      </div>
    );
  };
  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "لوگو",
      dataIndex: "logo",
      render: renderLogo,
    },
    {
      title: "اسلاگ",
      dataIndex: "slug",
      responsive: ["md"],
    },
    {
      title: "وضعیت",
      dataIndex: "status",
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
              logo: "لوگو",
              slug: "اسلاگ",
              status: "وضعیت",
            }}
            seeAllRender={{
              logo: renderLogo,
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
      logo: "https://panel.menuma.online/storage/jKL32G6YpOTravreh47gyNMDh2shuC-metaRmtKUWltVlJueERZc0NyQ1N0WHEzS2JMcDlvRGVtLW1ldGFVMk55WldWdWMyaHZkQ0F5TURJekxURXlMVEF6SURFNU16VXlPUzV3Ym1jPS0ucG5n-.png",
      slug: "demo",
      status: "active",
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

export default CafeRestaurantsTable;
