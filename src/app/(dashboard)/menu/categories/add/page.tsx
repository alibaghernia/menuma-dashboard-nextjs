import { Flex, Row, Col, Button } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import CategoriesTable from "../components/table";
import AddCategoryForm from "./components/form";

const AddCategoryPage = () => {
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
            <AddCategoryForm />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default AddCategoryPage;
