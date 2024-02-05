import { Flex, Row, Col, Button } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import ItemsTable from "../components/table";
import dynamic from "next/dynamic";
const AddItemForm = dynamic(() => import("./components/form"), { ssr: false });

const AddItemsPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">افزودن آیتم</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <AddItemForm />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default AddItemsPage;
