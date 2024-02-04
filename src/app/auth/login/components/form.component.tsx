"use client";
import LockOutlinedIcon from "@/icons/lock-outlined";
import { useLoadings, useTailwindColor } from "@/utils/hooks";
import { MobileOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import { ILoginForm } from "./types";
import { useFormState, useFormStatus } from "react-dom";
import { submit } from "./actions";
import ErrorList from "antd/lib/form/ErrorList";

const LoginForm: ILoginForm = (props) => {
  const color = useTailwindColor("primary");
  const [form] = Form.useForm();
  const [formErrors, dispatch] = useFormState(submit, undefined);
  return (
    <Form form={form} onFinish={dispatch}>
      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: "شماره موبایل اجباری است!",
          },
          {
            pattern: /^(09)\d{9}$/,
            message: "شماره موبایل درست نیست!",
          },
        ]}
      >
        <Input
          placeholder="شماره موبایل"
          className="!rounded-[.63rem] placeholder:text-[.875rem]"
          prefix={<MobileOutlined className="text-primary" />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "کلمه عبور اجباری است!",
          },
        ]}
      >
        <Input.Password
          placeholder="کلمه عبور"
          className="!rounded-[.63rem] placeholder:text-[.875rem]"
          prefix={<LockOutlinedIcon color={color} />}
        />
      </Form.Item>
      {/* <Form.Item>
        <Flex justify="space-between" align="center">
          <Col>
            <Form.Item name="remember" valuePropName="checked" className="!m-0">
              <Checkbox>ماندن در سیستم</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Link href="#">فراموشی کلمه عبور</Link>
          </Col>
        </Flex>
      </Form.Item> */}
      {formErrors == "CredentialsSignin" && (
        <Form.Item>
          <Form.ErrorList
            className="text-red-500"
            errors={["نام کاربری یا رمز عبور اشتباه است!"]}
          />
        </Form.Item>
      )}
      <Form.Item>
        <SubmitButton />
      </Form.Item>
    </Form>
  );
};

export default LoginForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  console.log({
    pending,
  });
  return (
    <Button
      type="primary"
      htmlType="submit"
      size="large"
      loading={pending}
      block
    >
      ورود
    </Button>
  );
}
