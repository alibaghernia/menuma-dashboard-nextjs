"use client";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import { BusinessProviderContext } from "@/providers/business/provider";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { uploadCustomRequest } from "@/utils/upload";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Card, Form, Input, Upload, UploadFile } from "antd/lib";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";

export type FormType = FC<{ isEdit?: boolean }>;
// TODO: fix upload image and display it
const AddCategoryForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const { businessService } = useContext(BusinessProviderContext);

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (props.isEdit) {
      businessService.categoriesService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دسته بندی با موفقیت بروزرسانی شد.");
          router.push("/menu/categories");
        });
    } else {
      businessService.categoriesService
        .create(values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دسته بندی با موفقیت ساخته شد.");
          router.push("/menu/categories");
        });
    }
  }
  const handleUploadOnChange = async (info: any) => {
    if (info.file.status == "uploading") {
      addL("upload-image");
      return;
    } else if (info.file.status == "done") {
      removeL("upload-image");
    }

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
    businessService.categoriesService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          title: data.data.title,
          image: data.data.image,
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

  useEffect(() => {
    if (!fileList.length) setImagePreviewUrl(undefined);
  }, [fileList]);

  return (
    <Card className="w-full">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="w-full md:w-fit"
      >
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
        <Form.Item label="تصویر دسته بندی" name="picture">
          <Upload.Dragger
            name="logo"
            listType="picture-circle"
            multiple={false}
            showUploadList={false}
            accept=".png,.jpg,.jpeg"
            onChange={handleUploadOnChange}
            customRequest={uploadCustomRequest}
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
