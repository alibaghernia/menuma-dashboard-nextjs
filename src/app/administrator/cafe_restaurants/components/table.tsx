"use client";
import TableActions from "@/components/common/_table/actions";
import Link from "@/components/common/link/link";
import { BusinessService } from "@/services/administrator/business.service";
import { Business, GetAllItemsFilter } from "@/services/administrator/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Flex, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import _ from "lodash";
import React, { FC, useEffect, useState } from "react";

type ICafeRestaurantsTable = FC<{
  search?: string;
}>;

const CafeRestaurantsTable: ICafeRestaurantsTable = (props) => {
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<Business[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const businessService = BusinessService.init();

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
        بدون تصویر
      </div>
    );
  };
  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "name",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/administrator/cafe_restaurants/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "لوگو",
      dataIndex: "logo_url",
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
            onEdit={() => {
              router.push(`/administrator/cafe_restaurants/${rec["uuid"]}`);
            }}
            onDelete={() => {
              addL("delete-cafe-noall");
              businessService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-cafe-noall");
                })
                .then(() => {
                  message.success("بیزنس مورد نظر با موفقیت حذف شد!");
                  fetchItems();
                })
                .catch(() => {
                  message.success("مشکلی در حذف بیزنس وجود داشت.");
                });
            }}
            seeAllExcludeFields={[
              "uuid",
              "working_hours",
              "socials",
              "location_lat",
              "location_long",
              "public",
              "deletedAt",
              "logo",
              "banner",
            ]}
            seeAllNames={{
              name: "نام",
              logo: "لوگو",
              slug: "اسلاگ",
              status: "وضعیت",
              address: "آدرس",
              description: "توضیحات",
              phone_number: "شماره تماس",
              customer_club: "باشگاه مشتریان",
              email: "ایمیل",
              banner: "عکس بنر",
              pager: "دارای پیجر",
              createdAt: "زمان ایجاد",
              updatedAt: "آخرین بروزرسانی",
              domain: "دامنه",
              logo_url: "لوگو",
              banner_url: "بنر",
            }}
            seeAllRender={{
              logo_url: renderLogo,
              banner_url: renderLogo,
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
    filters: GetAllItemsFilter = {
      page: currentPage,
      limit: pageSize,
      name: props.search,
    }
  ) {
    try {
      addL("fetch-items-noall");
      const { data } = await businessService.getAll(filters);
      setTotal(data.total);
      setItems(data.businesses);
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
      name: props.search,
    });
  }, [currentPage, pageSize]);
  useEffect(
    _.debounce(() => {
      fetchItems({
        page: currentPage,
        limit: pageSize,
        name: props.search,
      });
    }, 500),
    [props.search]
  );

  const tablePaginationOnChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      locale={{
        emptyText: "داده ای وجود ندارد",
      }}
      columns={columns}
      dataSource={items}
      loading={hasL("delete-cafe-noall", "fetch-items-noall")}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: tablePaginationOnChange,
      }}
    />
  );
};

export default CafeRestaurantsTable;
