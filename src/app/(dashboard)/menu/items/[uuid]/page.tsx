import { Flex, Row, Col, Button } from "antd";
import React from "react";
import dynamic from "next/dynamic";
const AddItemForm = dynamic(() => import("../add/components/form"), {
  ssr: false,
});

const AddItemsPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">ویرایش آیتم</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <AddItemForm isEdit />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default AddItemsPage;
