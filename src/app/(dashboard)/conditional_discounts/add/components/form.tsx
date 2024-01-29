"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Spin,
  TimePicker,
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import dayjs from "dayjs";

const EventForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  const [date, setDate] = useState<DateObject | DateObject[] | null>();
  const [editorLoading, setEditorLoading] = useState(true);

  function formFinishHandler(values: any) {
    console.log({
      values,
    });
  }

  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        onFinish={formFinishHandler}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="title"
              label="عنوان"
              rules={[
                {
                  required: true,
                  message: "عنوان اجباری است",
                },
              ]}
            >
              <Input placeholder="عنوان..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="amount"
              label="مقدار تخفیف"
              help="مقدار به عدد وارد شود، مثلا: 10"
            >
              <InputNumber
                min={1}
                className="w-full"
                placeholder="مقدار تخفیف..."
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="descriptions" label="توضیحات">
          <Input.TextArea placeholder="توضیحات..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EventForm;
