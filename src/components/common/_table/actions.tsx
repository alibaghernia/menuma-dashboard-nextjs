"use client";
import PopDots from "@/icons/pop-dots";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Flex, Popover, Table } from "antd/lib";
import React, { useCallback, useState } from "react";
import { ITableActions } from "./types";

const TableActions: ITableActions = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seeAllOpen, setSeeAllOpen] = useState(false);
  const primaryColor = useTailwindColor("primary");
  const breakpoints = useCurrentBreakpoints();

  const getRecords = useCallback(() => {
    return Object.entries(props.record as any).map(([k, v]) => ({
      name: props.seeAllNames?.[k] || k,
      value: v,
    }));
  }, [props.record, props.seeAllNames]);

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
              <Button icon={<EditOutlined />} color={primaryColor} type="link">
                ویرایش
              </Button>
            </Col>
            <Col>
              <Button icon={<EditOutlined />} danger type="text">
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
    </>
  );
};

export default TableActions;