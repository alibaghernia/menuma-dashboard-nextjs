"use client";
import TableActions from "@/components/common/_table/actions";
import { BusinessProviderContext } from "@/providers/business/provider";
import {
  CustomerEntity,
  IGetItemsFilters,
} from "@/services/dashboard/customer_club/customers/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import moment from "jalali-moment";
import _ from "lodash";
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";
export type ItemsTableType = FC<{
  search?: string;
}>;
const CustomersTable: ItemsTableType = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<CustomerEntity[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { businessService } = useContext(BusinessProviderContext);
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const renderDateTime = (value: string) => {
    if (!value) return "";
    const time = moment(value).locale("fa").format("dddd DD jMMMM jYYYY HH:mm");
    return time;
  };
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
      title: "شماره موبایل",
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
            onDelete={async () => {
              addL("delete-item-noall");
              businessService.customerClubService.customersService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-item-noall");
                })
                .then(() => {
                  message.success("مشتری مورد نظر با موفقیت حذف شد.");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف مشتری وجود دارد.");
                });
            }}
            onEdit={() => {
              router.push(
                `/${params.business}/customer_club/customers/${rec["uuid"]}`
              );
            }}
            seeAllExcludeFields={[
              "uuid",
              "business_uuid",
              "createdAt",
              "updatedAt",
              "deletedAt",
            ]}
            seeAllNames={{
              first_name: "نام",
              last_name: "نام خانوادگی",
              mobile: "شماره موبایل",
              birth_date: "تاریخ تولد",
              gender: "جنسیت",
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
      addL("fetch-items-noall");
      const { data } =
        await businessService.customerClubService.customersService.getItems(
          filters
        );
      setTotal(data.total);
      setItems(data.customers);
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
      loading={hasL("fetch-items-noall", "delete-item-noall")}
      columns={columns}
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

export default CustomersTable;
