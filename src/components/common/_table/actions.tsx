"use client";
import PopDots from "@/icons/pop-dots";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Flex, Popover, Table } from "antd/lib";
import React, { useCallback, useMemo, useState } from "react";
import { ITableActions } from "./types";
import ConfirmModal from "../confirm_modal/confirm_modal";
import TrashOutlined from "@/icons/trash-outlined";

const TableActions: ITableActions = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [seeAllOpen, setSeeAllOpen] = useState(false);
  const primaryColor = useTailwindColor("primary");
  const redColor = useTailwindColor("red");
  const breakpoints = useCurrentBreakpoints();

  const getRecords = useCallback(() => {
    return Object.entries(props.record as any)
      .filter(([k]) =>
        props.seeAllExcludeFields
          ? !props.seeAllExcludeFields.includes(k)
          : true
      )
      .map(([k, v]) => ({
        name: props.seeAllNames?.[k] || k,
        value: props.seeAllRender?.[k]?.(v, props.record, props.index) || v,
      }));
  }, [props.record, props.seeAllNames, props.seeAllRender]);

  const otherActions = useMemo(() => {
    return props.otherActions?.map((action, idx) => (
      <Col key={idx}>
        <Button
          icon={action.icon}
          type={action.type}
          onClick={(e) => {
            action.onClick?.(e);
            if (action.closeActionsOnClick) setIsOpen(false);
          }}
        >
          {action.title}
        </Button>
      </Col>
    ));
  }, [props.otherActions]);

  return (
    <>
      <Popover
        content={
          <Flex
            vertical={breakpoints.isXs || props.seeAll}
            align="center"
            gap={10}
          >
            <Col>
              <Button
                icon={<EditOutlined />}
                color={primaryColor}
                type="link"
                onClick={() => props.onEdit?.(props.record)}
              >
                ویرایش
              </Button>
            </Col>
            <Col>
              <Button
                icon={
                  <TrashOutlined width={14} height={14} color={redColor[500]} />
                }
                className="flex items-center"
                danger
                type="text"
                onClick={() => {
                  setDeleteModal(true);
                  setIsOpen(false);
                }}
              >
                حذف
              </Button>
            </Col>
            {props.seeAll && (
              <Col>
                <Button
                  icon={<EyeOutlined />}
                  type="dashed"
                  onClick={() => {
                    setSeeAllOpen(true);
                    setIsOpen(false);
                  }}
                >
                  مشاهده
                </Button>
              </Col>
            )}
            {otherActions}
          </Flex>
        }
        open={isOpen}
        trigger="click"
        onOpenChange={setIsOpen}
      >
        <PopDots
          width={24}
          height={24}
          className="cursor-pointer mx-auto"
          color={primaryColor}
        />
      </Popover>
      <Drawer
        title="جزئیات کامل"
        placement={"left"}
        closable
        onClose={() => setSeeAllOpen(false)}
        open={seeAllOpen}
        width={breakpoints.isXs ? "100vw" : "25rem"}
      >
        <Flex className="w-full h-full" vertical justify="space-between">
          <Table
            columns={[
              {
                dataIndex: "name",
              },
              {
                dataIndex: "value",
              },
            ]}
            showHeader={false}
            pagination={false}
            dataSource={getRecords()}
          />
          <Button ghost type="primary" onClick={() => setSeeAllOpen(false)}>
            بستن
          </Button>
        </Flex>
      </Drawer>
      {deleteModal && (
        <ConfirmModal
          open
          title="حذف"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            props.onDelete?.(props.record);
            setDeleteModal(false);
          }}
          dangerConfirm
        >
          <div className="text-center text-typography text-[.9rem]">
            آیا از حذف این مورد اطمینان دارید؟
          </div>
        </ConfirmModal>
      )}
    </>
  );
};

export default TableActions;
