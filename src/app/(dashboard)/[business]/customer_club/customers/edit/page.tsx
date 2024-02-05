import { Flex, Row, Col } from "antd";
import React from "react";
import CustomerForm from "../add/components/form";

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
            <CustomerForm />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default EditPage;
