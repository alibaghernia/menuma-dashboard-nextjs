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
  Select,
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
              name="capacity"
              label="ظرفیت"
              help="تعداد افراد شرکت کننده"
            >
              <InputNumber min={1} className="w-full" placeholder="ظرفیت..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Card title="زمان برگزاری">
            <Form.Item label="تاریخ" name="date" className={"w-full"}>
              <DatePicker
                inputClass={classNames(
                  "ant-input ant-input-outlined",
                  designToken.hashId
                )}
                className="rmdp-mobile"
                placeholder="تاریخ برگزاری..."
                calendar={persian}
                locale={persian_fa}
                digits={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                calendarPosition="bottom-right"
                value={date}
                onChange={(date: DateObject) => {
                  form.setFieldValue("birth_date", date.format("YYYY-MM-DD"));
                  return date as any;
                }}
              />
            </Form.Item>
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="start_time"
                  label="ساعت شروع"
                  rules={[
                    {
                      required: true,
                      message: "ساعت شروع اجباری است",
                    },
                  ]}
                  //@ts-ignore
                  getValueProps={(value) => {
                    console.log({ value });
                    return dayjs(value);
                  }}
                >
                  <TimePicker
                    className={classNames(
                      "ant-input ant-input-outlined",
                      designToken.hashId
                    )}
                    showSecond={false}
                    showNow={false}
                    format={"HH:mm"}
                    placeholder="انتخاب زمان"
                    onChange={(e) => {
                      form.setFieldValue("start_time", e?.format("HH:mm"));
                    }}
                    onSelect={(e) => {
                      form.setFieldValue("start_time", e?.format("HH:mm"));
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="end_time"
                  label="ساعت پایان"
                  //@ts-ignore
                  getValueProps={(value) => {
                    console.log({ value });
                    return dayjs(value);
                  }}
                >
                  <TimePicker
                    className={classNames(
                      "ant-input ant-input-outlined",
                      designToken.hashId
                    )}
                    showSecond={false}
                    showNow={false}
                    format={"HH:mm"}
                    placeholder="انتخاب زمان"
                    onChange={(e) => {
                      form.setFieldValue("start_time", e?.format("HH:mm"));
                    }}
                    onSelect={(e) => {
                      form.setFieldValue("start_time", e?.format("HH:mm"));
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>
        <Form.Item label="تصویر بنر" name="picture">
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
