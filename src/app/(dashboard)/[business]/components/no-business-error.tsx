"use server";
import { Flex, Result } from "antd/lib";
import React from "react";
import Logout from "./user/logout";

const NoBusinessError = ({
  message = "شما مجوز لازم برای دسترسی به پنل را ندارید!",
}) => {
  return (
    <Flex className="min-h-screen" align="center" justify="center">
      <Result status="403" extra={message}>
        <Logout />
      </Result>
    </Flex>
  );
};

export default NoBusinessError;
