"use client";
import TableActions from "@/components/common/_table/actions";
import Link from "@/components/common/link/link";
import { CatalogsService } from "@/services/administrator/catalogs/catalogs.service";
import {
  CatalogEntity,
  IGetItemsFilters,
} from "@/services/administrator/catalogs/types";
import { CustomerEntity } from "@/services/dashboard/customer_club/customers/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { Flex, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import _ from "lodash";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

export type ItemsTableType = FC<{
  search?: string;
}>;
const CatalogsTable: ItemsTableType = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<CatalogEntity[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const catalogsService = CatalogsService.init();
  const renderlabels: ColumnProps<unknown>["render"] = (val) => {
    return (
      <Flex wrap="wrap" gap={8}>
        {val?.map?.((label: any, idx: number) => (
          <div
            className="py-2 px-4 bg-typography/[.05] text-typography rounded-[.5rem]"
            key={idx}
          >
            {label.label}
          </div>
        ))}
      </Flex>
    );
  };
  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/administrator/catalogs/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "برچسب ها",
      dataIndex: "labels",
      responsive: ["md"],
      render: renderlabels,
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
              catalogsService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-item-noall");
                })
                .then(() => {
                  message.success("کاتالوگ مورد نظر با موفقیت حذف شد.");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف کاتالوگ وجود دارد.");
                });
            }}
            onEdit={() => {
              router.push(`/administrator/catalogs/${rec["uuid"]}`);
            }}
            seeAllExcludeFields={["uuid", "image", "long_description"]}
            seeAllNames={{
              title: "نام",
              labels: "برچسب ها",
              soon: "به زودی",
              short_description: "توضیحات کوتاه",
              createdAt: "زمان ایجاد",
              updatedAt: "آخرین ویرایش",
            }}
            seeAllRender={{
              labels: renderlabels,
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
    filters: IGetItemsFilters = { page: currentPage, limit: pageSize }
  ) {
    try {
      addL("fetch-items-noall");
      const { data } = await catalogsService.getAll(filters);
      setTotal(data.total);
      setItems(data.items);
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
  return (
    <Table
      className="w-full rounded-[1rem] overflow-hidden"
      locale={{
        emptyText: "داده ای وجود ندارد",
      }}
      loading={hasL("fetch-items-noall", "delete-item-noall")}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: tablePaginationOnChange,
      }}
      columns={columns}
      dataSource={items}
    />
  );
};

export default CatalogsTable;
