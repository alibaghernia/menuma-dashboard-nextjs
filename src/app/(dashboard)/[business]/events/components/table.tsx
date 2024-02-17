"use client";
import TableActions from "@/components/common/_table/actions";
import Link from "@/components/common/link/link";
import { BusinessProviderContext } from "@/providers/business/provider";
import {
  EventEntity,
  IGetItemsFilters,
} from "@/services/dashboard/events/types";
import { Product } from "@/services/file/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Table, TableProps } from "antd/lib";
import moment from "jalali-moment";
import _ from "lodash";
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";
export type ItemsTableType = FC<{
  search?: string;
}>;
const EventsTable: ItemsTableType = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<EventEntity[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { businessService } = useContext(BusinessProviderContext);

  const renderDateTime = (value: string) => {
    if (!value) return "";
    const time = moment(value).locale("fa").format("dddd DD jMMMM jYYYY HH:mm");
    return time;
  };

  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/${params.business}/events/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "ظرفیت",
      dataIndex: "limit",
    },
    {
      title: "تاریخ",
      dataIndex: "start_at",
      render: renderDateTime,
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
              businessService.eventsService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-item-noall");
                })
                .then(() => {
                  message.success("دورهمی مورد نظر با موفقیت حذف شد.");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف دورهمی وجود دارد.");
                });
            }}
            onEdit={() => {
              router.push(`/${params.business}/events/${rec["uuid"]}`);
            }}
            seeAllExcludeFields={[
              "uuid",
              "banner_uuid",
              "organizer_uuid",
              "long_description",
              "organizer_type",
              "pin",
              "deleted_at",
              "pin",
              "banner_url",
            ]}
            seeAllNames={{
              title: "نام",
              limit: "ظرفیت",
              start_at: "زمان شروع",
              end_at: "زمان پایان",
              short_description: "توضیحات مختصر",
              cycle: "نوع برگذاری",
              price: "هزینه",
              created_at: "زمان ساخت",
              updated_at: "آخرین بروزرسانی",
            }}
            seeAllRender={{
              start_at: renderDateTime,
              end_at: renderDateTime,
              created_at: renderTime,
              updated_at: renderTime,
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
      const { data } = await businessService.eventsService.getItems(filters);
      setTotal(data.total);
      setItems(data.events);
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

export default EventsTable;
