"use client";
import { InboxOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";

const ProfileForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
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
            <Form.Item name="last_name" label="نام خانوادگی">
              <Input placeholder="نام خانوادگی..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item name="mobile" label="شماره موبایل">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item name="password" label="کلمه عبور">
              <Input placeholder="کلمه عبور..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="password" label="تکرار کلمه عبور">
              <Input placeholder="تکرار کلمه عبور..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="آواتار" name="picture">
          <Upload.Dragger
            name="avatar"
            listType="picture-circle"
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

export default ProfileForm;
