"use client";
import TableActions from "@/components/common/_table/actions";
import Link from "@/components/common/link/link";
import { BusinessProviderContext } from "@/providers/business/provider";
import {
  IGetItemsFilters,
  TableEntity,
} from "@/services/dashboard/tables/types";
import { Product, IGetProductFilters } from "@/services/file/types";
import { printCanvas } from "@/utils/forms";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { QrcodeOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Modal,
  QRCode,
  Space,
  Table,
  TableProps,
} from "antd/lib";
import classNames from "classnames";
import _ from "lodash";
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";

type ITablesTable = FC<{ search?: string }>;

const TablesTable: ITablesTable = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<TableEntity[]>([]);
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { businessService } = useContext(BusinessProviderContext);

  const [qrCodeModal, setQrCodeModal] = useState<{
    title: string;
    data: string;
  }>();
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();
  const columns: TableProps["columns"] = [
    {
      title: "کد",
      dataIndex: "code",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/${params.business}/spaces/tables/${rec["uuid"]}`}
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
              router.push(`/${params.business}/spaces/tables/${rec["uuid"]}`);
            }}
            onDelete={() => {
              addL("remove-item-noall");
              businessService.tablesService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("remove-item-noall");
                })
                .then(() => {
                  message.success("میز با موفقیت حذف شد");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف میز وجود داشت");
                });
            }}
            seeAllExcludeFields={["uuid", "image", "image_url", "hall_uuid"]}
            seeAllNames={{
              code: "کد",
              capacity: "ظرفیت",
              max_capacity: "حداکثر ظرفیت",
              description: "توضیحات",
              createdAt: "زمان ساخت",
              updatedAt: "آخرین بروزرسانی",
            }}
            seeAllRender={{
              createdAt: renderTime,
              updatedAt: renderTime,
            }}
            otherActions={[
              {
                title: "تولید QRCode",
                type: "dashed",
                icon: <QrcodeOutlined />,
                closeActionsOnClick: true,
                onClick: () => {
                  addL("generate-qrcode");
                  businessService.tablesService
                    .generateQrCode(rec["uuid"])
                    .finally(() => {
                      removeL("generate-qrcode");
                    })
                    .then((data) => {
                      message.success("QrCode با موفقیت تولید شد");
                      setQrCodeModal({
                        title: rec["code"],
                        data: data.data,
                      });
                    })
                    .catch(() => {
                      message.error("مشکلی در تولید QrCode وجود داشت");
                    });
                },
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
    <>
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
      {qrCodeModal && (
        <Modal
          open
          title={`${qrCodeModal.title}`}
          closable
          onCancel={() => setQrCodeModal(undefined)}
          footer={[
            <Button
              key="copy"
              type="primary"
              onClick={() => {
                printCanvas(`qrcode-classname`, false);
              }}
              ghost
            >
              چاپ کردن
            </Button>,
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={() => setQrCodeModal(undefined)}
            >
              تایید
            </Button>,
          ]}
        >
          <Flex vertical gap="1rem">
            <QRCode
              size={1000}
              className={classNames(
                "mx-auto w-[13rem] h-[13rem] md:w-[20rem] md:h-[20rem]",
                "qrcode-classname"
              )}
              value={qrCodeModal.data}
            />
            <div className="py-2 px-4 border rounded-[1rem] text-center">
              {qrCodeModal.data}
            </div>
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default TablesTable;
// TODO: implement generate QR code
