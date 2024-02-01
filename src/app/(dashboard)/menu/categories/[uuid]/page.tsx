import { Col, Flex, Row } from "antd/lib";
import React from "react";
import AddCategoryForm from "../add/components/form";
import { useParams } from "next/navigation";
import { NextPage } from "next";

const EditPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold"> افزودن دسته بندی</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <AddCategoryForm isEdit />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default EditPage;
