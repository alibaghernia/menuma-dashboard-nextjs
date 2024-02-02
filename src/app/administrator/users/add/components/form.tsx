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
import React, { useEffect, useState } from "react";
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
import { UsersService } from "@/services/administrator/users/users.service";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { FormType } from "@/types";
import { useParams } from "next/navigation";
import { BusinessService } from "@/services/administrator/business.service";
import { Business } from "@/services/administrator/types";

const UserForm: FormType = (props) => {
  const [password, setPassword] = useState<string>();
  const params = useParams();
  const [form] = Form.useForm();
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const businessService = BusinessService.init();
  const usersService = UsersService.init();

  const loadingKey = "save-user-noall";
  function formFinishHandler(values: any) {
    const { confirm, ...payload } = values;
    addL(loadingKey);

    //
    (props.isEdit
      ? usersService.update(params.uuid as string, payload)
      : usersService.create(payload)
    )
      .finally(() => {
        removeL(loadingKey);
      })
      .then(() => {
        if (props.isEdit) message.success("کاربر با موفقیت ویرایش شد.");
        else message.success("کاربر با موفقیت ساخته شد.");
        router.push("/administrator/users");
      })
      .catch((err) => {
        console.log({
          err,
        });
        if (props.isEdit) message.error("مشکلی در ویرایش کاربر وجود دارد.");
        else message.error("مشکلی در ساخت کاربر وجود دارد.");
      });
  }

  function fetchItem() {
    addL("load-item");
    usersService
      .get(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          mobile: data.data.mobile,
          role: data.data.role,
        });
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }

  function fetchBusinesses() {
    const loadingKey = "fetch-businesses";
    addL(loadingKey);
    businessService
      .getAll()
      .finally(() => {
        removeL(loadingKey);
      })
      .then((data) => {
        setBusinesses(data.data.businesses);
      });
  }

  useEffect(() => {
    if (props.isEdit) {
      fetchItem();
    }
    fetchBusinesses();
  }, []);

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
              name="role"
              label="نقش"
              initialValue={"user"}
              rules={[
                {
                  required: true,
                  message: "نقش اجباری است",
                },
              ]}
            >
              <Select
                placeholder="انتخاب نقش..."
                options={[
                  {
                    label: "کاربر",
                    value: "user",
                  },
                  {
                    label: "مدیر",
                    value: "manager",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="business_uuid"
              label="کافه یا رستوران"
              rules={[
                {
                  required: true,
                  message: "انتخاب کافه یا رستوران اجباری است",
                },
              ]}
            >
              <Select
                placeholder="انتخاب کافه یا رستوران..."
                options={businesses.map((bus) => ({
                  label: bus.name,
                  value: bus.uuid,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="password"
              label="کلمه عبور"
              rules={[
                {
                  required: !props.isEdit,
                  message: "لطفا کلمه عبور را وارد کنید!",
                },
              ]}
              extra="در صورتی که مایل به تغییر کلمه عبور نیستید این قسمت را خالی بگذارید."
            >
              <Input.Password
                placeholder="کلمه عبور..."
                onChange={({ target: { value } }) => {
                  setPassword(value);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="confirm"
              label="تأیید کلمه عبور"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: !props.isEdit || !!password,
                  message: "لطفا کلمه عبور خود را تأیید کنید!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("کلمه عبور های وارد شده یکسان نیستند!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="تکرار کلمه عبور..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={!!hasL(loadingKey)}>
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
