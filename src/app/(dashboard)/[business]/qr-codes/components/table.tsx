"use client";
import TableActions from "@/components/common/_table/actions";
import Link from "@/components/common/link/link";
import { BusinessProviderContext } from "@/providers/business/provider";
import { QrCodeEntity } from "@/services/dashboard/qr-codes/types";
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

type IItemsTable = FC<{ search?: string }>;

const ItemsTable: IItemsTable = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<QrCodeEntity[]>([]);
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
      title: "نوع",
      dataIndex: "type",
      render: (value, rec) => (
        <Link
          className="text-typography"
          href={`/${params.business}/qr-codes/${rec["uuid"]}`}
        >
          {value}
        </Link>
      ),
    },
    {
      title: "اسلاگ",
      dataIndex: "slug",
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
              router.push(`/${params.business}/qr-codes/${rec["uuid"]}`);
            }}
            onDelete={() => {
              addL("remove-item-noall");
              businessService.tablesService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("remove-item-noall");
                })
                .then(() => {
                  message.success("با موفقیت حذف شد");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف وجود داشت");
                });
            }}
            seeAllExcludeFields={["uuid", "business_uuid", "metadata"]}
            seeAllNames={{
              type: "نوع",
              slug: "اسلاگ",
            }}
            otherActions={[
              {
                title: "تولید QRCode",
                type: "dashed",
                icon: <QrcodeOutlined />,
                closeActionsOnClick: true,
                onClick: () => {
                  addL("generate-qrcode");
                  businessService.qrCodeService
                    .getQrCodeData(rec["uuid"])
                    .finally(() => {
                      removeL("generate-qrcode");
                    })
                    .then((data) => {
                      message.success("QrCode با موفقیت تولید شد");
                      setQrCodeModal({
                        title: "",
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
      const { data } = await businessService.qrCodeService.getItems(filters);
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

export default ItemsTable;
// TODO: implement generate QR code
