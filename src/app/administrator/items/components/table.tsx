"use client";
import TableActions from "@/components/common/_table/actions";
import DataView from "@/components/common/data_view/data_view";
import Link from "@/components/common/link/link";
import { BusinessService } from "@/services/administrator/business.service";
import { BusinessService as DashboardBusinessService } from "@/services/dashboard/business.service";
import { ItemsService } from "@/services/administrator/items/items.service";
import {
  IGetProductFilters,
  Product,
} from "@/services/administrator/items/types";
import { Business } from "@/services/administrator/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { Col, Flex, Row, Select, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import * as _ from "lodash";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC, useEffect, useMemo, useState } from "react";

export type ItemsTableType = FC<{
  search?: string;
}>;

const ItemsTable: ItemsTableType = (props) => {
  const params = useParams();
  const message = useMessage();

  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<Product[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string>();
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const itemsService = ItemsService.init();
  const businessService = BusinessService.init();
  const [dataViewFilters, setDataViewFilters] = useState({});
  const hasFilter = useMemo(
    () => !!Object.entries(dataViewFilters).filter(([, val]) => val).length,
    [dataViewFilters]
  );
  const [dataViewSearch, setDataViewSearch] = useState("");

  const renderImage: ColumnProps<unknown>["render"] = (
    value,
    rec: any,
    idx
  ) => {
    if (value && /^https:|http:/.test(value))
      return (
        <Image
          alt={rec["title"]!}
          src={value}
          width={100}
          height={100}
          className="border border-typography/[.1] rounded-[.5rem] overflow-hidden"
        />
      );
    return (
      <div className="text-typography py-2 px-4 bg-typography/[.1] rounded-[1rem] w-fit">
        بدون تصویر
      </div>
    );
  };
  // renders
  const renderCategories: ColumnProps<unknown>["render"] = (val) => {
    return (val as any[]).map((category) => category.title);
  };

  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/administrator/items/${rec["uuid"]}`}
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
      title: "بیزنس",
      dataIndex: "business",
      render: (value: Business) => value?.name,
    },
    {
      title: "دسته بندی",
      dataIndex: "categories",
      render: renderCategories,
    },
    {
      key: "actions",
      title: "عملیات",
      width: 100,
      fixed: "right",
      render: (value, rec, idx) => {
        return (
          <TableActions
            value={value}
            record={rec}
            index={idx}
            onDelete={async () => {
              addL("delete-item-noall");
              itemsService
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
              router.push(`/administrator/items/${rec["uuid"]}`);
            }}
            seeAllNames={{
              title: "عنوان",
              categories: "دسته بندی",
              description: "توضیحات",
              createdAt: "زمان ایجاد",
              updatedAt: "آخرین بروزرسانی",
              business: "بیزنس",
            }}
            seeAllExcludeFields={[
              "uuid",
              "prices",
              "metadata",
              "images",
              "image",
              "image_url",
            ]}
            seeAllRender={{
              categories: renderCategories,
              createdAt: renderTime,
              updatedAt: renderTime,
              business: (value) => value?.name,
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

  async function fetchItems(filters = {}) {
    const search: IGetProductFilters = {
      ...pageAndLimit,
      business_uuid: selectedBusiness,
      title: dataViewSearch,
      ...dataViewFilters,
      ...filters,
    };
    try {
      addL("fetch-items-noall");
      const { data } = await itemsService.getItems(search);
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
      ...pageAndLimit,
      business_uuid: selectedBusiness,
      ...dataViewFilters,
    });
  }, [currentPage, pageSize, selectedBusiness]);
  const tablePaginationOnChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  function fetchBusinesses() {
    addL("load-businesses");
    businessService
      .getAll()
      .finally(() => {
        removeL("load-businesses");
      })
      .then((data) => {
        setBusinesses(data.data.businesses);
      })
      .catch(() => {
        message.error("مشکلی در دریافت داده ها وجود دارد!");
      });
  }
  const onDataViewChange = (data: any) => {
    const { search, ...filters } = data;
    setDataViewSearch(search);
    setDataViewFilters(filters.filters);
    fetchItems({
      ...filters.filters,
      title: search,
    });
  };
  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <>
      <Flex vertical gap={"1rem"} className="w-full">
        <Row>
          <Col xs={24} md={8}>
            <Select
              placeholder="بیزنس"
              options={businesses.map((bus) => ({
                label: bus.name,
                value: bus.uuid,
              }))}
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              value={selectedBusiness}
              onChange={setSelectedBusiness}
              className="w-full"
            />
          </Col>
        </Row>
        <Row>
          <DataView<Product>
            data={items}
            onChange={onDataViewChange}
            filters={{
              items: [
                {
                  name: "sold_out",
                  title: "تمام شده ها",
                },
              ],
              state: dataViewFilters,
              setState: setDataViewFilters,
            }}
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
        </Row>
      </Flex>
    </>
  );
};

export default ItemsTable;
