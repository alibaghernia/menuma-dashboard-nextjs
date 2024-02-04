"use client";
import TableActions from "@/components/common/_table/actions";
import { BusinessProviderContext } from "@/providers/business/provider";
import {
  IGetItemsFilters,
  TableEntity,
} from "@/services/dashboard/tables/types";
import { Product, IGetProductFilters } from "@/services/file/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { QrcodeOutlined } from "@ant-design/icons";
import { Table, TableProps } from "antd/lib";
import _ from "lodash";
import React, { FC, useContext, useEffect, useState } from "react";

type ITablesTable = FC<{ search?: string }>;

const TablesTable: ITablesTable = (props) => {
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<TableEntity[]>([]);
  const router = useCustomRouter();
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
            seeAllNames={{
              code: "کد",
              capacity: "ظرفیت",
              max_capacity: "حداکثر ظرفیت",
            }}
            otherActions={[
              {
                title: "تولید QRCode",
                type: "dashed",
                icon: <QrcodeOutlined />,
              },
            ]}
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
      const { data } = await businessService.tablesService.getItems(filters);
      setTotal(data.total);
      setItems(data.tables);
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
      loading={hasL("fetch-items-noall", "delete-item-noall")}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        onChange: tablePaginationOnChange,
      }}
    />
  );
};

export default TablesTable;
