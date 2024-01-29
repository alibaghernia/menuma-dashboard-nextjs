"use client";
import BellRingOutlinedIcon from "@/icons/bell-ring-outlined";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { CheckOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Flex,
  Row,
  Typography,
} from "antd/lib";
import Title from "antd/lib/typography/Title";
import React, { FC, PropsWithChildren, useMemo, useState } from "react";

export type PagerRequest = {
  id: string | number;
  status: "pending" | "in_progress" | "done";
  title: string;
  descriptions: string;
};
interface IPagerRequestsDrawer extends DrawerProps {
  requests: PagerRequest[];
}

const PagerRequestsDrawer: FC<IPagerRequestsDrawer> = ({ ...props }) => {
  const breakpoints = useCurrentBreakpoints();
  const typographyColor = useTailwindColor("typography");
  const [loadings, setLoadings] = useState<PagerRequest["id"][]>([]);

  const pendings = useMemo(() => {
    return props.requests
      .filter((req) => req.status == "pending")
      .map((req, idx) => (
        <Flex
          gap={16}
          key={idx}
          align="center"
          className="py-2 px-4 border rounded-[.5rem]"
        >
          <Col>
            <BellRingOutlinedIcon
              color={typographyColor}
              width={24}
              height={24}
            />
          </Col>
          <Col className="grow">
            <Flex vertical>
              <Row className="text-[1rem] text-typography">{req.title}</Row>
            </Flex>
          </Col>
          <Col>
            <Button
              ghost
              type="primary"
              //@ts-ignore
              loading={!!loadings.includes(req.id)}
            >
              {!loadings.includes(req.id) && <CheckOutlined />}
            </Button>
          </Col>
        </Flex>
      ));
  }, [props.requests, loadings]);

  return (
    <Drawer
      title="درخواست های پیجر"
      placement={"left"}
      closable
      onClose={props.onClose}
      open={props.open}
      width={breakpoints.isXs ? "100vw" : "25rem"}
    >
      <Typography.Text className="text-[1rem]">در انتظار</Typography.Text>
      <Divider className="my-[.5rem]" />
      {pendings}
    </Drawer>
  );
};

export default PagerRequestsDrawer;
