import { Flex, Row, Col } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const DiscountForm = dynamic(() => import("./components/form"), { ssr: false });

const AddPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">افزودن تخفیف شرطی</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <DiscountForm />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default AddPage;
