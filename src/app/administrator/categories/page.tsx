"use client";
import { Button, Card, Col, Flex, Row } from "antd";
import Search from "antd/lib/input/Search";
import React, { useMemo, useState } from "react";
import CategoriesTable from "./components/table";
import Link from "@/components/common/link/link";
import { useParams } from "next/navigation";
import _ from "lodash";

const CategoriesPage = () => {
  const params = useParams();
  const [search, setSearch] = useState<string>();
  const [searchingText, _setSearchingText] = useState<string>();

  const setSearchingText = useMemo(
    () =>
      _.debounce((value) => {
        _setSearchingText(value);
      }, 200),
    []
  );
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
                  <Search
                    value={search}
                    onChange={({ target: { value } }) => {
                      setSearch(value);
                      setSearchingText(value);
                    }}
                    enterButton={false}
                  />
                </Col>
                <Col>
                  <Link href={`/administrator/categories/add`}>
                    <Button type="primary">افزودن</Button>
                  </Link>
                </Col>
              </Flex>
            </Row>
            <Row>
              <CategoriesTable search={searchingText} />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default CategoriesPage;
