import { Card, Flex } from "antd/lib";
import { Row, Col } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صحه اصلی",
};

export default function Dashboard() {
  return (
    <Row gutter={24}>
      <Col xs={24} sm={12} md={8} className="gutter-row">
        <Card title="اسکن های امروز">
          <div className="text-[1.5rem] font-bold mx-auto w-fit">25</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} className="gutter-row">
        <Card title="اسکن های هفته">
          <div className="text-[1.5rem] font-bold mx-auto w-fit">200</div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8} className="gutter-row">
        <Card title="اسکن های ماه">
          <div className="text-[1.5rem] font-bold mx-auto w-fit">520</div>
        </Card>
      </Col>
    </Row>
  );
}
