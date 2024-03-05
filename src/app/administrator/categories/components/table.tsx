"use client";
import TableActions from "@/components/common/_table/actions";
import DataView from "@/components/common/data_view/data_view";
import Link from "@/components/common/link/link";
import { BusinessProviderContext } from "@/providers/business/provider";
import { BusinessService } from "@/services/administrator/business.service";
import { CategoryService } from "@/services/administrator/cateogires/categories.service";
import { BusinessService as DashboardBusinessService } from "@/services/dashboard/business.service";
import {
  Category,
  IGetFilters,
} from "@/services/administrator/cateogires/types";
import { Business } from "@/services/administrator/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { Avatar, Col, Flex, Row, Select, Table, TableProps } from "antd/lib";
import { ColumnProps } from "antd/lib/table";
import _ from "lodash";
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
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<string>();
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const categoryService = CategoryService.init();
  const businessService = BusinessService.init();
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
          href={`/administrator/categories/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      key: "business",
      title: "بیزنس",
      dataIndex: "business",
      render: (value) => value?.name,
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
      width: 100,
      render: (value, rec, idx) => {
        return (
          <TableActions
            value={value}
            record={rec}
            index={idx}
            onDelete={async () => {
              addL("delete-item");
              categoryService
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
              router.push(`/administrator/categories/${rec["uuid"]}`);
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
              business: "بیزنس",
            }}
            seeAllRender={{
              image_url: renderImage,
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
  async function fetchItems(
    filters: IGetFilters = { page: currentPage, limit: pageSize }
  ) {
    const search: IGetFilters = {
      ...pageAndLimit,
      business_uuid: selectedBusiness,
      title: dataViewSearch,
      ...dataViewFilters,
      ...filters,
    };
    try {
      const { data } = await categoryService.getItems(search);
      setTotal(data.total);
      setItems(data.categories);
    } catch (error) {
      console.log({
        error,
      });
    }
  }

  useEffect(() => {
    fetchItems({
      ...pageAndLimit,
      business_uuid: selectedBusiness,
    });
  }, [currentPage, pageSize, selectedBusiness]);

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
  useEffect(() => {
    fetchBusinesses();
  }, []);
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
      </Row>
    </Flex>
  );
};

export default CategoriesTable;
