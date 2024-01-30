"use client";
import TrashOutlined from "@/icons/trash-outlined";
import { useCurrentBreakpoints, useTailwindColor } from "@/utils/hooks";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd/lib";
import classNames from "classnames";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const AddItemForm = () => {
  const [form] = Form.useForm();
  const breakpoints = useCurrentBreakpoints();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const redColor = useTailwindColor("red");
  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        initialValues={{
          prices: [
            {
              title: "",
              price: null,
            },
          ],
        }}
      >
        <Row gutter={16}>
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
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="نام"
              rules={[
                {
                  required: true,
                  message: "نام آیتم اجباری است!",
                },
              ]}
              extra="مثلا: اسپرسو"
            >
              <Input placeholder="نام آیتم..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="category"
              label="دسته بندی"
              rules={[
                {
                  required: true,
                  message: "دسته بندی اجباری است!",
                },
              ]}
            >
              <Select size="large" placeholder="انتخاب دسته بندی..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="descriptions" label="توضیحات">
          <Input.TextArea placeholder="توضیحات آیتم" />
        </Form.Item>

        <Form.Item label="تصویر" name="image">
          <Upload.Dragger
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
        <Form.Item>
          <Form.List
            name="prices"
            rules={[
              {
                validator(rule, value, callback) {
                  if (!value || value.length < 1) {
                    return Promise.reject(
                      new Error("حداقل 1 قیمت باید وارد کنید!")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Flex gap={"1rem"} vertical className="w-full">
                <Row>
                  <Flex vertical className="w-full" gap={"1rem"}>
                    {fields.map(({ key, name, ...restFields }) => (
                      <Row
                        key={key}
                        gutter={24}
                        className="border p-2 rounded-[1rem]"
                        align={"middle"}
                      >
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="عنوان"
                            name={[name, "title"]}
                            rules={[
                              {
                                required: !!fields.length,
                                message: "عنوان قیمت اجباری است.",
                              },
                            ]}
                          >
                            <Input placeholder="عنوان..." />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={11}>
                          <Form.Item
                            label="قیمت"
                            name={[name, "price"]}
                            rules={[
                              {
                                required: true,
                                message: "قیمت اجباری است.",
                              },
                            ]}
                          >
                            <InputNumber
                              className="w-full"
                              placeholder="قیمت..."
                              min={0}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          span={24}
                          md={1}
                          className={classNames({
                            "border-t": breakpoints.isXs,
                          })}
                        >
                          <TrashOutlined
                            width={20}
                            height={20}
                            color={redColor[600]}
                            className={twMerge(
                              classNames("cursor-pointer block w-fit", {
                                "p-2 mx-auto":
                                  breakpoints.isSm || breakpoints.isXs,
                              })
                            )}
                            onClick={() => remove(name)}
                          />
                        </Col>
                      </Row>
                    ))}
                  </Flex>
                </Row>
                <Row>
                  <Button ghost type="primary" block onClick={add}>
                    افزودن قیمت
                  </Button>
                </Row>
                {!!errors.length && (
                  <Row>
                    <Form.ErrorList errors={errors} />
                  </Row>
                )}
              </Flex>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="تگ ها" name="tags">
          <Checkbox.Group>
            <Checkbox value="new">جدید</Checkbox>
            <Checkbox value="sold-out">تمام شده</Checkbox>
            <Checkbox value="offer">پیشنهاد روز</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ارسال
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddItemForm;
