"use client";
import { Card, Col, Flex, Row } from "antd";
import Search from "antd/lib/input/Search";
import React, { useCallback, useMemo, useState } from "react";
import ItemsTable from "./components/table";
import { Button } from "antd/lib";
import Link from "@/components/common/link/link";
import _ from "lodash";
import { useParams } from "next/navigation";

const ItemsPage = () => {
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
                  <Button type="primary">
                    <Link href={`/${params.business}/menu/items/add`}>
                      افزودن
                    </Link>
                  </Button>
                </Col>
              </Flex>
            </Row>
            <Row>
              <ItemsTable search={searchingText} />
            </Row>
          </Flex>
        </Card>
      </Row>
    </Flex>
  );
};

export default ItemsPage;
