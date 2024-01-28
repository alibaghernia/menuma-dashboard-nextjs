import { Col, Flex, Row } from "antd";
import { Button, Table, TableProps, Typography } from "antd/lib";
import Search from "antd/lib/input/Search";
import React from "react";

const CategoriesPage = () => {
  const columns: TableProps["columns"] = [
    {
      key: "name",
      title: "نام",
    },
    {
      key: "actions",
      title: "عملیات",
      width: 100,
    },
  ];

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
                  افزودن
                </Button>
              </Col>
            </Flex>
          </Row>
          <Row>
            <Table
              className="w-full rounded-[1rem] overflow-hidden"
              locale={{
                emptyText: "داده ای وجود ندارد",
              }}
              columns={columns}
            />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default CategoriesPage;
