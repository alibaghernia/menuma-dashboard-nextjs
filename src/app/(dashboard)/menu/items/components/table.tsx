"use client";
import TableActions from "@/components/common/_table/actions";
import { BusinessProviderContext } from "@/providers/business/provider";
import { IGetProductFilters, Product } from "@/services/dashboard/items/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import moment from "jalali-moment";
import * as _ from "lodash";
import React, { FC, useContext, useEffect, useState } from "react";

export type ItemsTableType = FC<{
  search?: string;
}>;

const ItemsTable: ItemsTableType = (props) => {
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<Product[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const { businessService } = useContext(BusinessProviderContext);

  // renders
  const renderCategories: ColumnProps<unknown>["render"] = (val) => {
    return (val as any[]).map((category) => category.title);
  };
  const renderTime: ColumnProps<unknown>["render"] = (val) => {
    const time = moment(val);
    return time.format("jYYYY/jMM/jDD HH:mm");
  };

  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "دسته بندی",
      dataIndex: "categories",
      responsive: ["md"],
      render: renderCategories,
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
              addL("delete-item-noall");
              businessService.itemsService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-item-noall");
                })
                .then(() => {
                  message.success("آیتم مورد نظر با موفقیت حذف شد.");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف آیتم وجود دارد.");
                });
            }}
            onEdit={() => {
              router.push(`/menu/items/${rec["uuid"]}`);
            }}
            seeAllNames={{
              title: "عنوان",
              categories: "دسته بندی",
              description: "توضیحات",
              createdAt: "زمان ایجاد",
              updatedAt: "آخرین بروزرسانی",
            }}
            seeAllExcludeFields={["uuid", "prices", "metadata", "images"]}
            seeAllRender={{
              categories: renderCategories,
              createdAt: renderTime,
              updatedAt: renderTime,
            }}
            seeAll
          />
        );
      },
    },
  ];

  async function fetchItems(
    filters: IGetProductFilters = { page: currentPage, limit: pageSize }
  ) {
    try {
      addL("fetch-items-noall");
      const { data } = await businessService.itemsService.getItems(filters);
      setTotal(data.total);
      setItems(data.products);
    } catch (error) {
      console.log({
        error,
      });
    }

    removeL("fetch-items-noall");
  }

  useEffect(() => {
    fetchItems({
      page: currentPage,
      limit: pageSize,
      title: props.search,
    });
  }, [currentPage, pageSize]);
  useEffect(
    _.debounce(() => {
      fetchItems({
        page: currentPage,
        limit: pageSize,
        title: props.search,
      });
    }, 500),
    [props.search]
  );

  const tablePaginationOnChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  // const dataSource = [];
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      columns={columns}
      loading={!!hasL("fetch-items-noall", "delete-item-noall")}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: tablePaginationOnChange,
      }}
      dataSource={items}
    />
  );
};

export default ItemsTable;
