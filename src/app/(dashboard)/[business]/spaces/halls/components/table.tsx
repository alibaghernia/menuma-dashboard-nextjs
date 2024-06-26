"use client";
import TableActions from "@/components/common/_table/actions";
import Link from "@/components/common/link/link";
import { BusinessProviderContext } from "@/providers/business/provider";
import { HallEntity } from "@/services/dashboard/halls/types";
import {
  IGetItemsFilters,
  TableEntity,
} from "@/services/dashboard/tables/types";
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
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";

export type ItemsTableType = FC<{
  search?: string;
}>;
const HallsTable: ItemsTableType = (props) => {
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<HallEntity[]>([]);
  const router = useCustomRouter();
  const params = useParams();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { businessService } = useContext(BusinessProviderContext);

  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      title: "کد",
      dataIndex: "code",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/${params.business}/spaces/halls/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "ظرفیت",
      dataIndex: "capacity",
    },
    {
      title: "حداکثر ظرفیت",
      dataIndex: "max_capacity",
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
              router.push(`/${params.business}/spaces/halls/${rec["uuid"]}`);
            }}
            onDelete={() => {
              addL("remove-item-noall");
              businessService.hallsService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("remove-item-noall");
                })
                .then(() => {
                  message.success("سالن با موفقیت حذف شد");
                  fetchItems();
                })
                .catch(() => {
                  message.success("مشکلی در حذف سالن وجود داشت");
                });
            }}
            seeAllExcludeFields={["uuid", "image", "image_url"]}
            seeAllRender={{
              createdAt: renderTime,
              updatedAt: renderTime,
            }}
            seeAllNames={{
              code: "کد",
              capacity: "ظرفیت",
              max_capacity: "حداکثر ظرفیت",
              description: "توضیحات",
              createdAt: "زمان ایجاد",
              updatedAt: "آخرین بروزرسانی",
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
      const { data } = await businessService.hallsService.getItems(filters);
      setTotal(data.total);
      setItems(data.halls);
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
      code: props.search,
    });
  }, [currentPage, pageSize]);
  useEffect(
    _.debounce(() => {
      fetchItems({
        page: currentPage,
        limit: pageSize,
        code: props.search,
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
      columns={columns}
      dataSource={items}
      loading={hasL("fetch-items-noall", "remove-item-noall")}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: tablePaginationOnChange,
      }}
    />
  );
};

export default HallsTable;
