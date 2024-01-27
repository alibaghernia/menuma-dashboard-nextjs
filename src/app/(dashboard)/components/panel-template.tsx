"use client";
import { Logo } from "@/components/core/logo";
import MenuBarsIcon from "@/icons/menu-bars";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Col,
  Flex,
  Layout,
  Menu,
  Typography,
} from "antd";
import { Header } from "antd/es/layout/layout";
import classNames from "classnames";
import React, { FC, PropsWithChildren, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { BellOutlined } from "@ant-design/icons";
import userAvatar from "@/assets/images/user-avatar.png";
import Sider from "antd/es/layout/Sider";
import type { MenuProps } from "antd";
import DashboardOutlinedIcon from "@/icons/dashboard-outlined";
import ArrowCollapseRightIcon from "@/icons/arrow-collapse-right";
import { Content } from "antd/lib/layout/layout";

const PanelTemplate: FC<PropsWithChildren> = ({ children }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const breakpoints = useCurrentBreakpoints();
  const typographyColor = useTailwindColor("typography");
  const primaryColor = useTailwindColor("primary");
  const sideMenuItems = useMemo(() => {
    const items: MenuProps["items"] = [
      {
        key: "dashboard",
        label: "داشبورد",
        icon: <DashboardOutlinedIcon className="ml-1" color={primaryColor} />,
      },
    ];
    return items;
  }, []);

  return (
    <Layout>
      <Header
        className={twMerge(
          classNames(
            "bg-white shadow-[0_-2px_8px_0_rgba(0,0,0,.2)] sticky top-0",
            {
              "px-[1.5rem]": breakpoints.isXs,
            }
          )
        )}
      >
        <Flex justify="space-between" align="center">
          <Col>
            <Flex align="center" gap={"0.63rem"}>
              <Col hidden={breakpoints.isSm}>
                {!siderCollapsed && breakpoints.isXs ? (
                  <ArrowCollapseRightIcon
                    color={typographyColor}
                    onClick={() => setSiderCollapsed(!siderCollapsed)}
                  />
                ) : (
                  <MenuBarsIcon
                    color={typographyColor}
                    onClick={() => setSiderCollapsed(!siderCollapsed)}
                  />
                )}
              </Col>
              <Col>
                <Logo className="text-[2rem]" />
              </Col>
            </Flex>
          </Col>
          <Col>
            <Flex align="center" gap={"1rem"}>
              <Col>
                <Badge className="" count={11}>
                  <BellOutlined color={typographyColor} size={24} />
                </Badge>
              </Col>
              <Col>
                <Flex align="center" gap={".75rem"}>
                  <Col>
                    <Typography>Abolfazl</Typography>
                  </Col>
                  <Col>
                    <Avatar src={userAvatar.src} />
                  </Col>
                </Flex>
              </Col>
            </Flex>
          </Col>
        </Flex>
      </Header>
      <Layout className="min-h-[calc(100vh-63px)]">
        <Sider
          width={"13rem"}
          className={twMerge(
            classNames(
              "bg-white fixed h-full shadow-[0_8px_8px_0_rgba(0,0,0,.1)]",
              {
                "!right-[-100%]": siderCollapsed && breakpoints.isXs,
                "transition-all duration-[.1s] right-0": breakpoints.isXs,
              }
            )
          )}
          trigger={null}
        >
          <Menu mode="inline" items={sideMenuItems} />
        </Sider>
        <Layout
          className={twMerge(
            classNames("transition duration-[.3s] p-[1.5rem] sm:p-[2.5rem]", {
              "mr-[13rem]":
                (!siderCollapsed && breakpoints.isXs) || breakpoints.isSm,
            })
          )}
        >
          <Breadcrumb>
            <Breadcrumb.Item>منوما</Breadcrumb.Item>
            <Breadcrumb.Item>داشبورد</Breadcrumb.Item>
          </Breadcrumb>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PanelTemplate;
