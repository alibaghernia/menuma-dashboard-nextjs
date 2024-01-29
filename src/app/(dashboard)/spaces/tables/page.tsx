import { Button, Card, Col, Flex, Row } from "antd/lib";
import Search from "antd/lib/input/Search";
import React from "react";
import TablesTable from "./components/table";
import Link from "@/components/common/link/link";

const Customers = () => {
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">میز ها</div>
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
                  <Link href="/spaces/tables/add">
                    <Button type="primary" ghost>
                      افزودن
                    </Button>
                  </Link>
                </Col>
              </Flex>
            </Row>
            <Row>
              <TablesTable />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default Customers;
