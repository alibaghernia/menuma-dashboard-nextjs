import { Button, Card, Col, Flex, Row } from "antd";
import React from "react";
import CategoriesTable from "./components/table";
import Link from "@/components/common/link/link";
import _ from "lodash";

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
              <Flex className="w-full" justify="end" align="center" gap=".5rem">
                <Col>
                  <Link href={`/administrator/categories/add`}>
                    <Button type="primary">افزودن</Button>
                  </Link>
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
