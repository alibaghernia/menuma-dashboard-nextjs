"use client";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import { BusinessProviderContext } from "@/providers/business/provider";
import { HallEntity } from "@/services/dashboard/halls/types";
import { FormType } from "@/types";
import { errorHandling } from "@/utils/forms";
import { useCustomRouter, useLoadings } from "@/utils/hooks";
import { uploadCustomRequest } from "@/utils/upload";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";

const HallForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  const [editorLoading, setEditorLoading] = useState(true);
  const { businessService } = useContext(BusinessProviderContext);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();

  const fieldsName = {
    code: "کد",
  };

  const saveLoadingKey = "save-data-noall";
  function formFinishHandler(values: any) {
    console.log({
      values,
    });
    addL(saveLoadingKey);
    if (props.isEdit)
      businessService.hallsService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL(saveLoadingKey);
        })
        .then(() => {
          message.success("سالن با موفقیت ویرایش شد");
          router.push("/spaces/halls");
        })
        .catch((error) => {
          errorHandling(error.response?.data, message, fieldsName);
          message.error("مشکلی در ویرایش سالن وجود داشت.");
        });
    else
      businessService.hallsService
        .create(values)
        .finally(() => {
          removeL(saveLoadingKey);
        })
        .then(() => {
          message.success("سالن با موفقیت ایجاد شد");
          router.push("/spaces/halls");
        })
        .catch((error) => {
          if (errorHandling(error.response?.data, message, fieldsName))
            message.error("مشکلی در ساخت سالن وجود داشت.");
        });
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
    businessService.hallsService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          code: data.data.code,
          capacity: data.data.capacity,
          max_capacity: data.data.max_capacity,
          image: data.data.image,
          description: data.data.description,
        });
        setImagePreviewUrl(data.data.image_url);
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
              name="code"
              label="کد"
              rules={[
                {
                  required: true,
                  message: "کد اجباری است",
                },
              ]}
            >
              <Input placeholder="کد..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Card title="ظرفیت">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="capacity"
                  label="ظرفیت"
                  help="ظرفیت سالن در حالت عادی"
                  rules={[
                    {
                      required: true,
                      message: "تعیین ظرفیت اجباری است!",
                    },
                  ]}
                >
                  <InputNumber className="w-full" placeholder="ظرفیت..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="max_capacity"
                  label="حداکثر ظرفیت"
                  help="ظرفیت سالن در حالت حداکثری"
                >
                  <InputNumber
                    className="w-full"
                    placeholder="حداکثر ظرفیت..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>

        <Form.Item name="description" label="توضیحات">
          <Input.TextArea placeholder="توضیحات در مورد این سالن..." />
        </Form.Item>
        <Form.Item label="تصویر" name="image">
          <Upload.Dragger
            multiple={false}
            showUploadList={false}
            accept=".png,.jpg,.jpeg"
            customRequest={(options) => {
              addL("upload-image");
              return uploadCustomRequest(options)
                .finally(() => {
                  removeL("upload-image");
                })
                .then((data) => {
                  form.setFieldValue("image", data.uuid);
                });
            }}
            onChange={handleUploadOnChange}
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
                  برای انتخاب کلیک کنید یا عکس را به اینجا بکشید.
                </p>
              </>
            )}
          </Upload.Dragger>
          {!!imagePreviewUrl && (
            <ImageDisplayerWrapper
              onRemove={() => {
                setFileList([]);
                setImagePreviewUrl(undefined);
                form.setFieldValue("image", null);
              }}
              className="mx-auto"
              imageRootClassName="relative w-[8rem] h-[5rem] md:w-[15rem] md:h-[10rem] border"
            >
              <Image
                className="object-contain"
                fill
                src={imagePreviewUrl}
                alt="image"
              />
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

export default HallForm;
