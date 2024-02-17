"use client";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import { BusinessProviderContext } from "@/providers/business/provider";
import { BusinessService } from "@/services/administrator/business.service";
import { CategoryService } from "@/services/administrator/cateogires/categories.service";
import { Business } from "@/services/administrator/types";
import { FormType } from "@/types";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { uploadCustomRequest } from "@/utils/upload";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd/lib";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";

// TODO: fix upload image and display it
const AddCategoryForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const businessService = BusinessService.init();
  const categoryService = CategoryService.init();

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (props.isEdit) {
      categoryService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دسته بندی با موفقیت بروزرسانی شد.");
          router.push(`/administrator/categories`);
        });
    } else {
      categoryService
        .create(values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دسته بندی با موفقیت ساخته شد.");
          router.push(`/administrator/categories`);
        });
    }
  }
  const handleUploadOnChange = async (info: any) => {
    const arrayBuffer = await info.file.originFileObj?.arrayBuffer();
    if (arrayBuffer) {
      var arrayBufferView = new Uint8Array(arrayBuffer);
      var blob = new Blob([arrayBufferView], {
        type: info.file.type,
      });
      const url = window.URL.createObjectURL(blob);
      setImagePreviewUrl(url);
    } else {
      setImagePreviewUrl(undefined);
    }
    setFileList(info.fileList);
  };

  function fetchItem() {
    addL("load-item");
    categoryService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          title: data.data.title,
          image: data.data.image,
          business_uuid: data.data.business?.uuid,
        });
        setImagePreviewUrl(data.data.image_url);
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

  useEffect(() => {
    if (!fileList.length) setImagePreviewUrl(undefined);
  }, [fileList]);

  return (
    <Card className="w-full">
      <Form form={form} onFinish={onFinish} layout="vertical" className="">
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
                options={businesses.map((bus) => ({
                  label: bus.name,
                  value: bus.uuid,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="title"
          label="عنوان"
          rules={[
            {
              required: true,
              message: "عنوان دسته بندی اجباری است!",
            },
          ]}
          extra="مثلا: نوشیدنی گرم"
        >
          <Input size="large" placeholder="عنوان دسته بندی..." />
        </Form.Item>
        <Form.Item label="تصویر دسته بندی" name="image">
          <Upload.Dragger
            name="image"
            listType="picture-circle"
            multiple={false}
            showUploadList={false}
            accept=".png,.jpg,.jpeg"
            onChange={handleUploadOnChange}
            customRequest={(options) => {
              addL("load-item");
              return uploadCustomRequest(options)
                .finally(() => {
                  removeL("load-item");
                })
                .then((data) => {
                  console.log({
                    data,
                  });
                  form.setFieldValue("image", data.uuid);
                });
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
          {!!imagePreviewUrl && (
            <ImageDisplayerWrapper
              avatar
              onRemove={() => {
                setFileList([]);
                form.setFieldValue("image", null);
              }}
              className="mx-auto"
              imageRootClassName="relative w-[5rem] h-[5rem] border"
            >
              <Image fill src={imagePreviewUrl} alt="logo" />
            </ImageDisplayerWrapper>
          )}
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

export default AddCategoryForm;
