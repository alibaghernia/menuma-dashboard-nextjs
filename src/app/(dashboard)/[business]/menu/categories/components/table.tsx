"use client";
import TableActions from "@/components/common/_table/actions";
import DataView from "@/components/common/data_view/data_view";
import Link from "@/components/common/link/link";
import { BusinessProviderContext } from "@/providers/business/provider";
import {
  Category,
  IGetItemsFilters,
} from "@/services/dashboard/categories/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { Avatar, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useMemo, useState } from "react";

export type CategoriesTableType = FC<{
  search?: string;
}>;

const CategoriesTable: CategoriesTableType = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<Category[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { businessService } = useContext(BusinessProviderContext);
  const [dataViewFilters, setDataViewFilters] = useState({});
  const hasFilter = useMemo(
    () => !!Object.entries(dataViewFilters).filter(([, val]) => val).length,
    [dataViewFilters]
  );
  const [dataViewSearch, setDataViewSearch] = useState("");

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
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/${params.business}/menu/categories/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      key: "image_url",
      title: "تصویر",
      dataIndex: "image_url",
      render: renderImage,
    },
    {
      key: "actions",
      title: "عملیات",
      align: "center",
      width: 100,
      render: (value, rec, idx) => {
        return (
          <TableActions
            value={value}
            record={rec}
            index={idx}
            onDelete={async () => {
              addL("delete-item");
              businessService.categoriesService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-item");
                })
                .catch(() => {
                  message.error("حذف دسته بندی انجام نشد!");
                })
                .then(() => {
                  message.success("دسته بندی با موفقیت حذف شد.");
                  fetchItems();
                });
            }}
            onEdit={() => {
              router.push(`/${params.business}/menu/categories/${rec["uuid"]}`);
            }}
            seeAllExcludeFields={[
              "uuid",
              "parent_uuid",
              "slug",
              "image",
              "BusinessCategory",
            ]}
            seeAllNames={{
              title: "عنوان",
              image_url: "تصویر",
              products_count: "تعداد آیتم ها",
            }}
            seeAllRender={{
              image_url: renderImage,
            }}
            seeAll
          />
        );
      },
    },
  ];

  const pageAndLimit = useMemo(
    () => ({ page: currentPage, limit: pageSize }),
    [currentPage, pageSize]
  );
  async function fetchItems(
    filters: IGetItemsFilters = { page: currentPage, limit: pageSize }
  ) {
    const search: IGetItemsFilters = {
      ...pageAndLimit,
      title: dataViewSearch,
      ...dataViewFilters,
      ...filters,
    };
    try {
      const { data } = await businessService.categoriesService.getItems(search);
      setTotal(data.total);
      setItems(data.categories);
    } catch (error) {
      console.log({
        error,
      });
    }
  }

  useEffect(() => {
    fetchItems();
  }, [currentPage, pageSize]);

  const tablePaginationOnChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };
  const onDataViewChange = (data: any) => {
    const { search, ...filters } = data;
    setDataViewSearch(search);
    setDataViewFilters(filters.filters);
    fetchItems({
      ...filters.filters,
      title: search,
    });
  };
  return (
    <DataView<Category>
      data={items}
      onChange={onDataViewChange}
      columns={breakpoints.isXs ? ["title", "business"] : undefined}
      options={{
        className: "w-full rounded-[1rem] overflow-hidden",
        columns: columns,
        loading: hasL("fetch-items-noall", "delete-item-noall"),
        pagination: {
          current: currentPage,
          pageSize,
          total,
          onChange: tablePaginationOnChange,
        },
      }}
    />
  );
};

export default CategoriesTable;
