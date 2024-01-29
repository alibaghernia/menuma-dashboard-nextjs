"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useState } from "react";
import DateObject from "react-date-object";
import moment from "jalali-moment";
import classNames from "classnames";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker from "react-multi-date-picker";

const CustomerForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  const [birthDate, setBirthDate] = useState<
    DateObject | DateObject[] | null
  >();

  return (
    <Card className="w-full">
      <Form form={form} layout="vertical" className="w-full">
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="first_name"
              label="نام"
              rules={[
                {
                  required: true,
                  message: "نام اجباری است",
                },
              ]}
            >
              <Input placeholder="نام..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="last_name"
              label="نام خانوادگی"
              rules={[
                {
                  required: true,
                  message: "نام خانوادگی اجباری است",
                },
              ]}
            >
              <Input placeholder="نام خانوادگی..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="mobile"
              label="شماره موبایل"
              rules={[
                {
                  required: true,
                  message: "شماره موبایل اجباری است",
                },
                {
                  pattern: /^(09)\d{9}$/,
                  message: "شماره موبایل درست نیست!",
                },
              ]}
            >
              <Input placeholder="شماره موبایل..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="تاریخ تولد"
              name="birth_date"
              className={"w-full"}
              getValueFromEvent={(date: DateObject) => {
                return moment(date?.toDate().toISOString()).format(
                  "YYYY-MM-DD"
                );
              }}
              valuePropName=""
              initialValue={""}
            >
              <DatePicker
                inputClass={classNames(
                  "ant-input ant-input-outlined",
                  designToken.hashId
                )}
                containerClassName="w-full"
                className="rmdp-mobile"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={birthDate}
                highlightToday={false}
                onChange={(date: DateObject) => {
                  setBirthDate(date);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="gender"
              label="جنسیت"
              rules={[
                {
                  required: true,
                  message: "انتخاب جنسیت اجباری است",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="men">آقا</Radio.Button>
                <Radio.Button value="women">خانم</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="note" label="یادداشت">
              <Input.TextArea placeholder="یادداشت..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CustomerForm;
