"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Card, Col, Flex, Form, Input, Row, Select } from "antd/lib";
import React, { useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { UsersService } from "@/services/administrator/users/users.service";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { FormType } from "@/types";
import { useParams } from "next/navigation";
import { BusinessService } from "@/services/administrator/business.service";
import { Business } from "@/services/administrator/types";
import TrashOutlined from "@/icons/trash-outlined";
import { errorHandling } from "@/utils/forms";

const UserForm: FormType = (props) => {
  const [password, setPassword] = useState<string>();
  const params = useParams();
  const [form] = Form.useForm();
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const redColor = useTailwindColor("red");
  const breakpoints = useCurrentBreakpoints();

  const businessService = BusinessService.init();
  const usersService = UsersService.init();
  const fieldsLabels = {
    mobile: "شماره موبایل",
  };
  const loadingKey = "save-user-noall";
  function formFinishHandler(values: any) {
    const handleCatch = (err: any) => {
      if (err.response?.data) {
        errorHandling(err.response?.data, message, fieldsLabels);
      } else message.error("خطایی در ذخیره اطلاعات رخ داد.");
    };

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
      .catch(handleCatch);
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
          businesses: data.data.businesses?.map((bus) => ({
            business_uuid: bus.uuid,
            role: bus.BusinessUser.role,
          })),
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
            <Form.Item
              name="last_name"
              label="نام خانوادگی"
              rules={[
                {
                  required: true,
                  message: "نام خانوادگی اجباری است",
                },
              ]}
            >
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
        </Row>
        <Form.Item>
          <Card title="کافه ها و رستوران ها">
            <Form.List name="businesses">
              {(fields, { add, remove }) => (
                <>
                  {fields.length ? (
                    fields.map(({ name, key }) => (
                      <Row key={key} align={"bottom"} gutter={8}>
                        <Col xs={24} sm={10}>
                          <Form.Item
                            name={[name, "role"]}
                            label="نقش"
                            initialValue={"employee"}
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
                                  label: "کارمند",
                                  value: "employee",
                                },
                                {
                                  label: "مدیر",
                                  value: "manager",
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={10}>
                          <Form.Item
                            name={[name, "business_uuid"]}
                            label="کافه یا رستوران"
                            rules={[
                              {
                                required: true,
                                message: "انتخاب کافه یا رستوران اجباری است",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                              }
                              placeholder="انتخاب کافه یا رستوران..."
                              options={businesses.map((bus) => ({
                                label: bus.name,
                                value: bus.uuid,
                              }))}
                              allowClear
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={4}>
                          <Form.Item>
                            <Flex gap={4} wrap="wrap" align="center">
                              <Button
                                ghost
                                danger
                                type="primary"
                                block={breakpoints.isXs}
                              >
                                <TrashOutlined
                                  color={redColor[500]}
                                  className="flex items-center justify-center mx-auto"
                                  width={16}
                                  height={16}
                                  onClick={() => {
                                    remove(name);
                                  }}
                                />
                              </Button>
                              <Button
                                ghost
                                type="primary"
                                block={breakpoints.isXs}
                              >
                                <PlusCircleOutlined
                                  className="flex items-center justify-center"
                                  onClick={() => {
                                    add();
                                  }}
                                />
                              </Button>
                            </Flex>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))
                  ) : (
                    <Button
                      ghost
                      type="primary"
                      className="mx-auto"
                      onClick={() => {
                        add();
                      }}
                    >
                      افزودن کافه یا رستوران
                    </Button>
                  )}
                </>
              )}
            </Form.List>
          </Card>
        </Form.Item>

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
