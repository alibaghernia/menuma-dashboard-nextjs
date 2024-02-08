"use client";
import { BusinessProviderContext } from "@/providers/business/provider";
import { FormType } from "@/types";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import { Button } from "antd";
import { Card, Col, Form, Input, InputNumber, Row } from "antd/lib";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";

const EventForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const { businessService } = useContext(BusinessProviderContext);

  const [form] = Form.useForm();

  async function onFinish(values: object) {
    const payload = {
      ...values,
      type: "CONDITIONAL",
    };
    const then = () => {
      message.success("آیتم با موفقیت ذخیره شد.");
      router.push(`/${params.business}/discounts/conditional`);
    };
    const onCatch = () => {
      message.error("مشکلی در ذخیره اطلاعات وجود داشت!");
    };
    addL("create-item");
    if (props.isEdit) {
      businessService.discountsService
        .update(params.uuid as string, payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(then)
        .catch(onCatch);
    } else {
      businessService.discountsService
        .create(payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(then)
        .catch(onCatch);
    }
  }

  function fetchItem() {
    addL("load-item");
    businessService.discountsService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          title: data.data.title,
          discount: data.data.discount,
          description: data.data.description,
        });
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }

  useEffect(() => {
    if (props.isEdit) {
      fetchItem();
    }
  }, []);

  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        onFinish={onFinish}
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
          <Col xs={24} sm={12}>
            <Form.Item
              name="discount"
              label="مقدار تخفیف"
              help="مقدار به عدد وارد شود، مثلا: 10"
            >
              <InputNumber
                min={1}
                max={100}
                className="w-full"
                placeholder="مقدار تخفیف..."
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="توضیحات">
          <Input.TextArea placeholder="توضیحات..." />
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
