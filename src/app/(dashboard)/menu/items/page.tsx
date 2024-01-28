import { Card, Col, Flex, Row } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import ItemsTable from "./components/table";
import { Button } from "antd/lib";
import Link from "@/components/common/link/link";

const ItemsPage = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">آیتم ها</div>
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
                  <Button ghost type="primary">
                    <Link href="/menu/items/add">افزودن</Link>
                  </Button>
                </Col>
              </Flex>
            </Row>
            <Row>
              <ItemsTable />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default ItemsPage;
