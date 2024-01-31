import { Button, Flex, Result } from "antd/lib";
import React from "react";

const Forbidden = () => {
  return (
    <Flex align="center" justify="center" className="min-h-screen">
      <Result status="403" title="شما دسترسی ندارید!" />
    </Flex>
  );
};

export default Forbidden;
