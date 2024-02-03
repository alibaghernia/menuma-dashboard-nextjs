"use client";
import TableActions from "@/components/common/_table/actions";
import { UsersService } from "@/services/administrator/users/users.service";
import { User } from "@/services/dashboard/users/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { Table, TableProps } from "antd/lib";
import _ from "lodash";
import React, { FC, useEffect, useState } from "react";

export type UsersTableType = FC<{
  search?: string;
}>;
const UsersTable: UsersTableType = (props) => {
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<User[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const usersService = UsersService.init();

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
      title: "موبایل",
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
            onEdit={() => {
              router.push(`/administrator/users/${rec["uuid"]}`);
            }}
            onDelete={() => {
              addL("delete-user");
              usersService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-user");
                })
                .then(() => {
                  message.success("کاربر با موفقیت حذف شد");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف کاربر وجود داشت");
                });
            }}
            seeAllExcludeFields={["uuid", "username", "businesses"]}
            seeAllRender={{
              createdAt: renderTime,
              updatedAt: renderTime,
            }}
            seeAllNames={{
              first_name: "نام",
              last_name: "نام خانوادگی",
              mobile: "موبایل",
              email: "ایمیل",
              role: "نقش",
              createdAt: "زمان ساخت",
              updatedAt: "آخرین بروزرسانی",
            }}
            seeAll
          />
        );
      },
    },
  ];

  async function fetchItems(
    filters: GetItemsFilters = {
      page: currentPage,
      limit: pageSize,
      search: props.search,
    }
  ) {
    try {
      addL("fetch-items-noall");
      const { data } = await usersService.getAll(filters);
      setTotal(data.total);
      setItems(data.users);
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
      search: props.search,
    });
  }, [currentPage, pageSize]);
  useEffect(
    _.debounce(() => {
      fetchItems({
        page: currentPage,
        limit: pageSize,
        search: props.search,
      });
    }, 500),
    [props.search]
  );
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      locale={{
        emptyText: "داده ای وجود ندارد",
      }}
      columns={columns}
      dataSource={items}
    />
  );
};

export default UsersTable;
