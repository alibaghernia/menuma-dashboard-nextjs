import { Card, Col, Flex, Row } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import CategoriesTable from "./components/table";
import NavigateToAddButton from "./components/navigate-to-add-button";

const CategoriesPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">دسته بندی ها</div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Card className="w-full">
          <Flex className="w-full" vertical gap="1rem">
            <Row>
              <Flex
                className="w-full"
                justify="space-between"
                align="center"
                gap=".5rem"
              >
                <Col>
                  <Search />
                </Col>
                <Col>
                  <NavigateToAddButton />
                </Col>
              </Flex>
            </Row>
            <Row>
              <CategoriesTable />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default CategoriesPage;
