"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useContext, useEffect, useState } from "react";
import DateObject from "react-date-object";
import moment from "jalali-moment";
import classNames from "classnames";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker from "react-multi-date-picker";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import { useParams } from "next/navigation";
import { BusinessProviderContext } from "@/providers/business/provider";
import { FormType } from "@/types";
import { AxiosResponseType } from "@/lib/auth/types";
import { CustomerEntity } from "@/services/dashboard/customer_club/customers/types";
import { errorHandling } from "@/utils/forms";

const CustomerForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  const [birthDate, setBirthDate] = useState<
    DateObject | DateObject[] | null
  >();
  const { businessService } = useContext(BusinessProviderContext);

  const fields = {
    mobile: "شماره موبایل",
  };

  async function onFinish(values: unknown) {
    const { birth_date, ...payload } = values as any;

    addL("create-item");
    if (props.isEdit) {
      businessService.customerClubService.customersService
        .update(params.uuid as string, {
          birth_date: moment(
            (birth_date as DateObject).format("YYYY-MM-DD"),
            "jYYYY-jMM-jDD"
          ).format("YYYY-MM-DD"),
          ...payload,
        })
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("مشتری با موفقیت بروزرسانی شد.");
          router.push(`/${params.business}/customer_club/customers`);
        })
        .catch((error) => {
          if (errorHandling(error.data, message, fields))
            message.error("مشکلی در زخیره اطلاعات وجود دارد");
        });
    } else {
      businessService.customerClubService.customersService
        .create({
          birth_date: moment(
            (birth_date as DateObject).format("YYYY-MM-DD"),
            "jYYYY-jMM-jDD"
          ).format("YYYY-MM-DD"),
          ...payload,
        })
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("مشتری با موفقیت ساخته شد.");
          router.push(`/${params.business}/customer_club/customers`);
        })
        .catch((error) => {
          console.log({
            error,
          });
          if (errorHandling(error.data, message, fields))
            message.error("مشکلی در زخیره اطلاعات وجود دارد");
        });
    }
  }

  function fetchItem() {
    addL("load-item");

    businessService.customerClubService.customersService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        const birth_date = new DateObject({
          date: data.data.birth_date,
          format: "YYYY-MM-DD",
        });
        form.setFieldsValue({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          gender: data.data.gender,
          mobile: data.data.mobile,
          description: data.data.description,
          birth_date,
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
        </Row>
        <Row gutter={24}>
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
              label="تاریخ تولد"
              name="birth_date"
              className={"w-full"}
            >
              <DatePicker
                inputClass={classNames(
                  "ant-input ant-input-outlined",
                  designToken.hashId
                )}
                containerClassName="w-full"
                className="rmdp-mobile"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={birthDate}
                highlightToday={false}
                digits={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                onChange={(date: DateObject) => {
                  // form.setFieldValue("birth_date", date.format("YYYY-MM-DD"));
                  return date as any;
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="gender"
              label="جنسیت"
              rules={[
                {
                  required: true,
                  message: "انتخاب جنسیت اجباری است",
                },
              ]}
            >
              <Radio.Group>
                <Radio.Button value="man">آقا</Radio.Button>
                <Radio.Button value="woman">خانم</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item name="description" label="توضیحات">
              <Input.TextArea placeholder="توضیحات..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CustomerForm;
