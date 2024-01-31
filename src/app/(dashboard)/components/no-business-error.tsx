import { Flex, Result } from "antd/lib";
import React from "react";
import Logout from "./user/logout";

const NoBusinessError = () => {
  return (
    <Flex className="min-h-screen" align="center" justify="center">
      <Result status="404" extra="شما عضو هیچ کسب و کاری نیستید!">
        <Logout />
      </Result>
    </Flex>
  );
};

export default NoBusinessError;
