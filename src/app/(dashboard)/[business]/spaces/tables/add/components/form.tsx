"use client";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import { BusinessProviderContext } from "@/providers/business/provider";
import { HallEntity } from "@/services/dashboard/halls/types";
import { FormType } from "@/types";
import { errorHandling } from "@/utils/forms";
import { useLoadings, useCustomRouter } from "@/utils/hooks";
import { uploadCustomRequest } from "@/utils/upload";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Select, UploadFile, message } from "antd";
import { Card, Col, Form, Input, InputNumber, Row, Upload } from "antd/lib";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";

const TableForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [date, setDate] = useState<DateObject | DateObject[] | null>();
  const [editorLoading, setEditorLoading] = useState(true);
  const [halls, setHalls] = useState<HallEntity[]>([]);
  const { businessService } = useContext(BusinessProviderContext);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();

  const fieldsName = {
    code: "کد",
  };
  const saveLoadingKey = "save-data-noall";
  function formFinishHandler(values: any) {
    addL(saveLoadingKey);
    if (props.isEdit)
      businessService.tablesService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL(saveLoadingKey);
        })
        .then(() => {
          message.success("میز با موفقیت ویرایش شد");
          router.push(`/${params.business}/spaces/tables`);
        })
        .catch((error) => {
          errorHandling(error.response?.data, message, fieldsName);
          message.error("مشکلی در ویرایش میز وجود داشت.");
        });
    else
      businessService.tablesService
        .create(values)
        .finally(() => {
          removeL(saveLoadingKey);
        })
        .then(() => {
          message.success("میز با موفقیت ایجاد شد");
          router.push(`/${params.business}/spaces/tables`);
        })
        .catch((error) => {
          if (errorHandling(error.response?.data, message, fieldsName))
            message.error("مشکلی در ساخت میز وجود داشت.");
        });
  }

  function fetchHalls() {
    addL("load-halls");
    businessService.hallsService
      .getItems()
      .finally(() => {
        removeL("load-halls");
      })
      .then((data) => {
        setHalls(data.data.halls);
      })
      .catch(() => {
        message.error("مشکلی در دریافت لیست سالن ها وجود دارد!");
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
    businessService.tablesService
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
          hall_uuid: data.data.hall_uuid,
        });
        setImagePreviewUrl(data.data.image_url);
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }

  useEffect(() => {
    fetchHalls();
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
          <Col xs={24} sm={12}>
            <Form.Item
              name="hall_uuid"
              label="سالن"
              help="در صورتی که میز داخل سالن خاصی است، سالن را انتخاب کنید."
            >
              <Select
                options={halls.map((hall) => ({
                  label: hall.code,
                  value: hall.uuid,
                }))}
                allowClear
                onClear={() => {
                  form.setFieldValue("hall_uuid", "");
                }}
                className="w-full"
                placeholder="سالن..."
              />
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
                  help="ظرفیت میز در حالت عادی"
                >
                  <InputNumber
                    min={1}
                    className="w-full"
                    placeholder="ظرفیت..."
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="max_capacity"
                  label="حداکثر ظرفیت"
                  help="ظرفیت میز در حالت حداکثری"
                >
                  <InputNumber
                    min={1}
                    className="w-full"
                    placeholder="حداکثر ظرفیت..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>

        <Form.Item name="description" label="توضیحات">
          <Input.TextArea placeholder="توضیحات در مورد این میز..." />
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

export default TableForm;
