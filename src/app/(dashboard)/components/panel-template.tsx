"use client";
import { Logo } from "@/components/core/logo";
import MenuBarsIcon from "@/icons/menu-bars";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { Avatar, Badge, Col, Flex, Layout, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import classNames from "classnames";
import React, { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { BellOutlined } from "@ant-design/icons";
import userAvatar from "@/assets/images/user-avatar.png";

const PanelTemplate: FC<PropsWithChildren> = () => {
  const breakpoints = useCurrentBreakpoints();
  const typographyColor = useTailwindColor("typography");
  return (
    <Layout>
      <Header
        className={twMerge(
          classNames("bg-white shadow-[0_-2px_8px_0_rgba(0,0,0,.2)]", {
            "px-[1.5rem]": breakpoints.isXs,
          })
        )}
      >
        <Flex justify="space-between" align="center">
          <Col>
            <Flex align="center" gap={"0.63rem"}>
              <Col hidden={breakpoints.isSm}>
                <MenuBarsIcon color={typographyColor} />
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
    </Layout>
  );
};

export default PanelTemplate;
