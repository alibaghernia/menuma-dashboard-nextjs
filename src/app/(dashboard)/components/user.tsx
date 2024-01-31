import { Flex, Col, Typography, Avatar } from "antd";
import React from "react";
import userAvatar from "@/assets/images/user-avatar.png";

const User = () => {
  return (
    <Flex align="center" gap={".75rem"}>
      <Col>
        <Typography>Abolfazl</Typography>
      </Col>
      <Col>
        <Avatar src={userAvatar.src} />
      </Col>
    </Flex>
  );
};

export default User;
