import { Button, Card, Col, Flex, Row } from "antd/lib";
import Search from "antd/lib/input/Search";
import React from "react";
import CustomersTable from "./components/table";
import Link from "@/components/common/link/link";
import { useParams } from "next/navigation";

const Customers = () => {
  const params = useParams();
  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">مشتریان</div>
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
                  <Button type="primary" ghost>
                    <Link
                      href={`/${params.business}/customer_club/customers/add`}
                    >
                      افزودن
                    </Link>
                  </Button>
                </Col>
              </Flex>
            </Row>
            <Row>
              <CustomersTable />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default Customers;
