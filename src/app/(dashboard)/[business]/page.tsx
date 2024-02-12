"use client";
import { Card, Flex } from "antd/lib";
import { Row, Col } from "antd";
import { Metadata } from "next";
import { BusinessService } from "@/services/dashboard/business.service";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Dashboard() {
  const params = useParams();
  const [statistics, setStatistics] = useState<any>();
  const businessService = BusinessService.init(params.business as string);

  useEffect(() => {
    businessService.statistics().then((data) => {
      setStatistics(data.data);
    });
  }, []);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={12}>
        <Card title="دسته بندی ها">
          <div className="text-[1.5rem] font-bold mx-auto w-fit">
            {statistics?.categories}
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12}>
        <Card title="آیتم ها">
          <div className="text-[1.5rem] font-bold mx-auto w-fit">
            {statistics?.items}
          </div>
        </Card>
      </Col>
    </Row>
  );
}
