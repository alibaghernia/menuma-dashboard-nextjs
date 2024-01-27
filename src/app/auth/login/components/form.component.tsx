"use client";
import LockOutlinedIcon from "@/icons/lock-outlined";
import UserOutlinedIcon from "@/icons/user-outlined";
import { useTailwindColor } from "@/utils/hooks";
import { Button, Col, Flex, Form, Input } from "antd";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  const color = useTailwindColor("primary");
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "نام کاربری اجباری است!",
          },
        ]}
      >
        <Input
          placeholder="نام کاربری"
          className="!rounded-[.63rem] placeholder:text-[.875rem]"
          prefix={<UserOutlinedIcon color={color} />}
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
      <Form.Item>
        <Flex justify="space-between" align="center">
          {/* <Col>
            <Form.Item name="remember" valuePropName="checked" className="!m-0">
              <Checkbox>ماندن در سیستم</Checkbox>
            </Form.Item>
          </Col> */}
          <Col>
            <Link href="#">فراموشی کلمه عبور</Link>
          </Col>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          ورود
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
