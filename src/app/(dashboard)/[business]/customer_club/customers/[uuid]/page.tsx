import { Flex, Row, Col } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const CustomerForm = dynamic(() => import("../add/components/form"), {
  ssr: false,
});

const EditPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">ویرایش مشتری</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <CustomerForm isEdit />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default EditPage;
