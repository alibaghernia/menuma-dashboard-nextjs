"use client";
import TableActions from "@/components/common/_table/actions";
import { BusinessProviderContext } from "@/providers/business/provider";
import { DiscountsService } from "@/services/administrator/discounts/discounts.service";
import {
  DiscountEntity,
  IGetFilters,
} from "@/services/dashboard/discounts/types";
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

const DiscountsTable: ItemsTableType = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<DiscountEntity[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const discountService = DiscountsService.init();

  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();

  const renderBusiness = (value: any) => {
    return value?.name;
  };
  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "مقدار تخفیف",
      dataIndex: "discount",
    },
    {
      title: "کافه",
      dataIndex: "business",
      render: renderBusiness,
    },
    {
      title: "توضیحات",
      dataIndex: "description",
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
              discountService
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
              router.push(
                `/administrator/discounts/conditional/${rec["uuid"]}`
              );
            }}
            seeAllExcludeFields={[
              "uuid",
              "pin",
              "type",
              "business_uuid",
              "deletedAt",
            ]}
            seeAllRender={{
              createdAt: renderTime,
              updatedAt: renderTime,
              business: renderBusiness,
            }}
            seeAllNames={{
              title: "نام",
              amount: "مقدار تخفیف",
              descriptions: "توضیحات",
              discount: "مقدار تخفیف",
              description: "توضیحات",
              createdAt: "زمان ساخت",
              updatedAt: "آخرین بروزرسانی",
              business: "کافه",
            }}
            seeAll
          />
        );
      },
    },
  ];

  async function fetchItems(
    filters: Omit<IGetFilters, "type"> = {
      page: currentPage,
      limit: pageSize,
    }
  ) {
    try {
      addL("fetch-items-noall");
      const { data } = await discountService.getItems({
        ...filters,
        type: "CONDITIONAL",
      });
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

export default DiscountsTable;
