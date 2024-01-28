"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Card, Form, Input, Upload, UploadFile } from "antd/lib";
import React, { useState } from "react";

const AddCategoryForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  return (
    <Card className="w-full">
      <Form form={form} layout="vertical" className="w-full md:w-fit">
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
          <Input size="large" placeholder="نام دسته بندی..." />
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
