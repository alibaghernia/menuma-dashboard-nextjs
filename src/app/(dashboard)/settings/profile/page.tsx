import { Flex, Row, Col, Card, Button } from "antd";
import Search from "antd/lib/input/Search";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
const ProfileForm = dynamic(() => import("./components/form"), { ssr: false });

const ProfilePage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">پروفایل</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Card className="w-full">
          <Flex className="w-full" vertical gap="1rem">
            <Row>
              <ProfileForm />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default ProfilePage;
