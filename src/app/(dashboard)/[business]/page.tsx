"use client";
import { Card } from "antd/lib";
import { Row, Col } from "antd";
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
      {!!statistics?.customers && (
        <Col xs={24} sm={12}>
          <Card title="مشتریان">
            <div className="text-[1.5rem] font-bold mx-auto w-fit">
              {statistics?.customers}
            </div>
          </Card>
        </Col>
      )}
      {!!statistics?.sold_out && (
        <Col xs={24} sm={12}>
          <Card title="آیتم های تمام شده">
            <div className="text-[1.5rem] font-bold mx-auto w-fit">
              {statistics?.sold_out}
            </div>
          </Card>
        </Col>
      )}
    </Row>
  );
}
