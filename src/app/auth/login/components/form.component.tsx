"use client";
import LockOutlinedIcon from "@/icons/lock-outlined";
import { useLoadings, useTailwindColor } from "@/utils/hooks";
import { MobileOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input } from "antd";
import React from "react";
import { ILoginForm } from "./types";
import { useFormState, useFormStatus } from "react-dom";
import { submit } from "./actions";
import { useSearchParams } from "next/navigation";
import { LOADINGS } from "@/providers/general/constants";

const LoginForm: ILoginForm = (props) => {
  const [addL] = useLoadings();
  const searchParams = useSearchParams();
  const color = useTailwindColor("primary");
  const [form] = Form.useForm();
  const [formErrors, dispatch] = useFormState(submit, undefined);
  return (
    <Form
      form={form}
      onFinish={(values) => {
        addL(LOADINGS.page);
        dispatch(values);
      }}
    >
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
      {searchParams.get("error") == "CredentialsSignin" && (
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
