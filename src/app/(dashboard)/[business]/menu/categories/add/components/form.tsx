"use client";
import ConfirmModal from "@/components/common/confirm_modal/confirm_modal";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import { BusinessProviderContext } from "@/providers/business/provider";
import { FormType } from "@/types";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { uploadCustomRequest } from "@/utils/upload";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import {
  Card,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Upload,
  UploadFile,
} from "antd/lib";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";

export interface IAddItemForm {
  form: FormInstance<any>;
  imagePreviewUrl?: string;
  isEdit?: boolean;
  setImagePreviewUrl: (state?: string) => void;
  handleRemove?: () => void;
  onFinish: (values: any) => void;
}

const AddCategoryForm: FC<IAddItemForm> = (props) => {
  const [addL, removeL] = useLoadings();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [removeConfirmModal, setRemoveConfirmModal] = useState(false);

  const handleUploadOnChange = async (info: any) => {
    const arrayBuffer = await info.file.originFileObj?.arrayBuffer();
    if (arrayBuffer) {
      var arrayBufferView = new Uint8Array(arrayBuffer);
      var blob = new Blob([arrayBufferView], {
        type: info.file.type,
      });
      const url = window.URL.createObjectURL(blob);
      props.setImagePreviewUrl(url);
    } else {
      props.setImagePreviewUrl(undefined);
    }
    setFileList(info.fileList);
  };

  return (
    <>
      <Card className="w-full">
        <Form
          form={props.form}
          onFinish={props.onFinish}
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
                    props.form.setFieldValue("image", data.uuid);
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
            {!!props.imagePreviewUrl && (
              <ImageDisplayerWrapper
                avatar
                onRemove={() => {
                  setFileList([]);
                  props.form.setFieldValue("image", "");
                }}
                className="mx-auto"
                imageRootClassName="relative w-[5rem] h-[5rem] border"
              >
                <Image fill src={props.imagePreviewUrl} alt="logo" />
              </ImageDisplayerWrapper>
            )}
          </Form.Item>
          <Form.Item
            label="اولویت نمایش"
            name={"order"}
            extra="اولویت از عدد کوچک به بزرگ است"
            rules={[
              {
                required: true,
                message: "اجباری است",
              },
            ]}
          >
            <InputNumber placeholder="اولویت..." />
          </Form.Item>
          <Form.Item>
            <Flex gap={4}>
              <Button type="primary" onClick={() => props.form.submit()}>
                ذخیره
              </Button>
              {props.isEdit && (
                <Button
                  type="primary"
                  danger
                  onClick={() => setRemoveConfirmModal(true)}
                >
                  حذف
                </Button>
              )}
            </Flex>
          </Form.Item>
        </Form>
      </Card>

      <ConfirmModal
        open={removeConfirmModal}
        title="حدف"
        dangerConfirm
        confirmText="حذف کن"
        onClose={() => setRemoveConfirmModal(false)}
        onConfirm={props.handleRemove}
      >
        <div className="text-center text-typography text-[.9rem]">
          آیا از لغو این آیتم اطمینان دارید؟
        </div>
      </ConfirmModal>
    </>
  );
};

export default AddCategoryForm;
