"use client";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Spin,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CatalogForm = () => {
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
        </Row>
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
        <Form.Item name="summmery" label="توضیحات متخصر">
          <Input.TextArea placeholder="توضیحات مختصر..." />
        </Form.Item>
        <Form.Item
          name="descriptions"
          label="توضیحات کامل"
          className="relative min-h-[3rem]"
          valuePropName=""
          initialValue={""}
        >
          <div>
            <CKEditor
              editor={ClassicEditor}
              onReady={(editor) => {
                setEditorLoading(false);
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "min-height",
                    "10rem",
                    //@ts-ignore
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(_, editor) => {
                form.setFieldValue("descriptions", editor.getData());
              }}
            />
            {editorLoading && (
              <div className="absolute inset-0 bg-white flex justify-center items-center">
                <Spin />
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item label="برچسب ها">
          <Form.List name="label">
            {(fields, { add, remove }, { errors }) => (
              <Row gutter={16}>
                {!Boolean(fields.length) ? (
                  <Col>
                    <Button
                      className="flex items-center"
                      icon={<PlusCircleOutlined />}
                      onClick={() => add()}
                    >
                      افزودن
                    </Button>
                  </Col>
                ) : (
                  fields.map(({ key, name }) => (
                    <Col key={key} xs={24} md={12} lg={8}>
                      <Flex gap={8} align="center">
                        <Form.Item name={[name, "label"]} className="w-full">
                          <Input className="w-full" placeholder="برچسب..." />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            className="flex items-center justify-center"
                            icon={<PlusCircleOutlined />}
                            onClick={add}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            className="flex items-center justify-center"
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                          />
                        </Form.Item>
                      </Flex>
                    </Col>
                  ))
                )}
              </Row>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name="settings">
          <Checkbox.Group>
            <Checkbox value="coming_soon">به زودی</Checkbox>
          </Checkbox.Group>
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

export default CatalogForm;
