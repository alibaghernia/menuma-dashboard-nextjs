"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
  Col,
} from "antd/lib";
import React, { useState } from "react";

const AddCategoryForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  return (
    <Card className="w-full">
      <Form form={form} layout="vertical" className="w-full">
        <Form.Item>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="cafe_restaurant"
                label="کافه یا رستوران"
                rules={[
                  {
                    required: true,
                    message: "انتخاب کافه یا رستوران اجباری است!",
                  },
                ]}
              >
                <Select placeholder="انتخاب کافه یا رستوران..." />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>{" "}
        <Form.Item>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="نام"
                rules={[
                  {
                    required: true,
                    message: "نام دسته بندی اجباری است!",
                  },
                ]}
                extra="مثلا: نوشیدنی گرم"
              >
                <Input placeholder="نام دسته بندی..." />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="تصویر دسته بندی" name="picture">
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
                  برای انتخاب کلیک کنید یا عکس را به اینجا بکشید.
                </p>
              </>
            )}
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCategoryForm;
