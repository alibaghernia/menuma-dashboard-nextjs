"use client";
import { BusinessProviderContext } from "@/providers/business/provider";
import { BusinessService } from "@/services/administrator/business.service";
import { DiscountsService } from "@/services/administrator/discounts/discounts.service";
import { Business } from "@/services/administrator/types";
import { FormType } from "@/types";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
} from "antd/lib";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";

const EventForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const discountsService = DiscountsService.init();
  const businessService = BusinessService.init();

  const [form] = Form.useForm();

  async function onFinish(values: object) {
    const payload = {
      ...values,
      type: "CONDITIONAL",
    };
    const then = () => {
      message.success("آیتم با موفقیت ذخیره شد.");
      router.push(`/administrator/discounts/conditional`);
    };
    const onCatch = () => {
      message.error("مشکلی در ذخیره اطلاعات وجود داشت!");
    };
    addL("create-item");
    if (props.isEdit) {
      discountsService
        .update(params.uuid as string, payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(then)
        .catch(onCatch);
    } else {
      discountsService
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
    discountsService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          title: data.data.title,
          discount: data.data.discount,
          description: data.data.description,
          business_uuid: data.data.business_uuid,
          pin: data.data.pin,
        });
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }

  function fetchBusinesses() {
    addL("load-businesses");
    businessService
      .getAll()
      .finally(() => {
        removeL("load-businesses");
      })
      .then((data) => {
        setBusinesses(data.data.businesses);
      })
      .catch(() => {
        message.error("مشکلی در دریافت داده ها وجود دارد!");
      });
  }
  useEffect(() => {
    fetchBusinesses();
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
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="business_uuid"
              label="بیزنس"
              rules={[
                {
                  required: true,
                  message: "بیزنس اجباری است!",
                },
              ]}
            >
              <Select
                size="large"
                placeholder="بیزنس..."
                disabled={props.isEdit}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
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
        <Form.Item name="pin" label="پین شده">
          <Switch />
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
