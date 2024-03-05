import { Card, Col, Flex, Row } from "antd";
import React from "react";
import ItemsTable from "./components/table";
import { Button } from "antd/lib";
import Link from "@/components/common/link/link";
import _ from "lodash";

const ItemsPage = ({ params }: any) => {
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
              <Flex className="w-full" justify="end" align="center" gap=".5rem">
                <Col>
                  <Button type="primary">
                    <Link href={`/${params.business}/menu/items/add`}>
                      افزودن
                    </Link>
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
