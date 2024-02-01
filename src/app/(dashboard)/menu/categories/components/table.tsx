"use client";
import TableActions from "@/components/common/_table/actions";
import { BusinessProviderContext } from "@/providers/business/provider";
import {
  Category,
  IGetItemsFilters,
} from "@/services/dashboard/categories/types";
import {
  useCurrentBreakpoints,
  useLoadings,
  useTailwindColor,
} from "@/utils/hooks";
import { Avatar, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import React, { FC, useContext, useEffect, useState } from "react";

export type CategoriesTableType = FC<{
  search?: string;
}>;

const CategoriesTable: CategoriesTableType = (props) => {
  const [addL, removeL] = useLoadings();
  const [items, setItems] = useState<Category[]>([]);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { businessService } = useContext(BusinessProviderContext);

  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const renderImage: ColumnProps<unknown>["render"] = (value, rec, idx) => {
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
        بدون تصویر
      </div>
    );
  };
  const columns: TableProps["columns"] = [
    {
      key: "title",
      title: "عنوان",
      dataIndex: "title",
    },
    {
      key: "slug",
      title: "اسلاگ",
      dataIndex: "slug",
    },
    {
      key: "image",
      title: "تصویر",
      dataIndex: "image",
      render: renderImage,
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
            onDelete={async () => {
              addL("delete-item");
              businessService.categoriesService.delete(rec["uuid"]);
              fetchItems();
              removeL("delete-item");
            }}
            seeAllExcludeFields={["uuid", "parent_uuid"]}
            seeAllNames={{
              title: "عنوان",
              slug: "اسلاگ",
              image: "تصویر",
              products_count: "تعداد آیتم ها",
            }}
            seeAllRender={{
              image: renderImage,
            }}
            seeAll
          />
        );
      },
    },
  ];

  async function fetchItems(
    filters: IGetItemsFilters = { page: currentPage, limit: pageSize }
  ) {
    try {
      const { data } = await businessService.categoriesService.getItems(
        filters
      );
      setTotal(data.total);
      setItems(data.categories);
    } catch (error) {
      console.log({
        error,
      });
    }
  }

  useEffect(() => {
    fetchItems({
      page: currentPage,
      limit: pageSize,
      name: props.search,
    });
  }, [props.search, currentPage, pageSize]);

  const tablePaginationOnChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      columns={columns}
      dataSource={items}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: tablePaginationOnChange,
      }}
    />
  );
};

export default CategoriesTable;
