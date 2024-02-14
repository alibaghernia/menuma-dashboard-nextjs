"use client";
import { BusinessProviderContext } from "@/providers/business/provider";
import { HallEntity } from "@/services/dashboard/halls/types";
import { FormType } from "@/types";
import { errorHandling } from "@/utils/forms";
import { useLoadings, useCustomRouter } from "@/utils/hooks";
import { Button, Select, UploadFile, message } from "antd";
import { Card, Col, Form, Input, InputNumber, Row, Upload } from "antd/lib";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";

const ItemForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [halls, setHalls] = useState<HallEntity[]>([]);
  const { businessService } = useContext(BusinessProviderContext);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();

  const fieldsName = {
    slug: "اسلاگ",
  };
  const saveLoadingKey = "save-data-noall";
  function formFinishHandler(values: any) {
    addL(saveLoadingKey);
    if (props.isEdit)
      businessService.qrCodeService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL(saveLoadingKey);
        })
        .then(() => {
          message.success("با موفقیت ویرایش شد");
          router.push(`/${params.business}/qr-codes`);
        })
        .catch((error) => {
          if (errorHandling(error.response?.data, message, fieldsName))
            message.error("مشکلی در ویرایش وجود داشت.");
        });
  }

  function fetchItem() {
    addL("load-item");
    businessService.qrCodeService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          slug: data.data.slug,
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
        onFinish={formFinishHandler}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="slug"
              label="اسلاگ"
              rules={[
                {
                  required: true,
                  message: "اسلاگ اجباری است",
                },
              ]}
            >
              <Input placeholder="اسلاگ..." />
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

export default ItemForm;
