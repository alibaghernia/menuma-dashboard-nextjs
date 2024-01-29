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

const HallForm = () => {
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
              name="code"
              label="کد"
              rules={[
                {
                  required: true,
                  message: "کد اجباری است",
                },
              ]}
            >
              <Input placeholder="کد..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Card title="ظرفیت">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="capacity"
                  label="ظرفیت"
                  help="ظرفیت سالن در حالت عادی"
                >
                  <InputNumber className="w-full" placeholder="ظرفیت..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="max_capacity"
                  label="حداکثر ظرفیت"
                  help="ظرفیت سالن در حالت حداکثری"
                >
                  <InputNumber
                    className="w-full"
                    placeholder="حداکثر ظرفیت..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>
        <Form.Item label="تصویر" name="picture">
          <Upload.Dragger
            name="picture"
            listType="picture"
            multiple={false}
            showUploadList
            accept=".png,.jpg,.jpeg"
            onChange={(info) => {
              setFileList(info.fileList);
            }}
            fileList={fileList}
            openFileDialogOnClick={!!!fileList.length}
          >
            {Boolean(fileList.length) ? (
              <p className="ant-upload-text">تصویر انتخاب شد</p>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  برای انتخاب کلیک کنید یا تصویر را به اینجا بکشید.
                </p>
              </>
            )}
          </Upload.Dragger>
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

export default HallForm;
