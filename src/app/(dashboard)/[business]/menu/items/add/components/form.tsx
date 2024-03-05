"use client";
import ConfirmModal from "@/components/common/confirm_modal/confirm_modal";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import TrashOutlined from "@/icons/trash-outlined";
import { BusinessProviderContext } from "@/providers/business/provider";
import { Category } from "@/services/dashboard/categories/types";
import { Product } from "@/services/dashboard/items/types";
import { FilesService } from "@/services/file/file.service";
import { FormType } from "@/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { uploadCustomRequest } from "@/utils/upload";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd/lib";
import classNames from "classnames";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface IAddItemForm {
  form: FormInstance<any>;
  categories: Category[];
  imagePreviewUrl?: string;
  isEdit?: boolean;
  setImagePreviewUrl: (state?: string) => void;
  handleRemove?: () => void;
  onFinish: (values: any) => void;
}

const AddItemForm: FC<IAddItemForm> = (props) => {
  const [addL, removeL] = useLoadings();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const breakpoints = useCurrentBreakpoints();
  const redColor = useTailwindColor("red");
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
          layout="vertical"
          className="w-full"
          onFinish={(values) => {
            props.onFinish(values);
          }}
          onFinishFailed={(error) => {
            console.log({
              error,
            });
          }}
          initialValues={{
            prices: [
              {
                title: "",
                value: null,
              },
            ],
          }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="title"
                label="عنوان"
                rules={[
                  {
                    required: true,
                    message: "عنوان آیتم اجباری است!",
                  },
                ]}
                extra="مثلا: اسپرسو"
              >
                <Input size="large" placeholder="عنوان آیتم..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="categories"
                label="دسته بندی"
                rules={[
                  {
                    required: true,
                    message: "دسته بندی اجباری است!",
                  },
                ]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={props.categories.map((cat) => ({
                    label: cat.title,
                    value: cat.uuid,
                  }))}
                  size="large"
                  placeholder="انتخاب دسته بندی..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="توضیحات">
            <Input.TextArea placeholder="توضیحات آیتم" />
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
                    console.log({
                      data,
                    });
                    props.form.setFieldValue("image", data.uuid);
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
            {!!props.imagePreviewUrl && (
              <ImageDisplayerWrapper
                onRemove={() => {
                  setFileList([]);
                  props.setImagePreviewUrl(undefined);
                  props.form.setFieldValue("image", "");
                }}
                className="mx-auto"
                imageRootClassName="relative w-[5rem] h-[5rem] border"
              >
                <Image fill src={props.imagePreviewUrl} alt="logo" />
              </ImageDisplayerWrapper>
            )}
          </Form.Item>
          <Form.Item>
            <Form.List
              name="prices"
              rules={[
                {
                  async validator(rule, value, callback) {
                    if (!value || value.length < 1) {
                      return Promise.reject(
                        new Error("حداقل 1 قیمت باید وارد کنید!")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <Flex gap={"1rem"} vertical className="w-full">
                  <Row>
                    <Flex vertical className="w-full" gap={"1rem"}>
                      {fields.map(({ key, name, ...restFields }) => (
                        <Row
                          key={key}
                          gutter={24}
                          className="border p-2 rounded-[1rem]"
                          align={"middle"}
                        >
                          <Col xs={24} md={12}>
                            <Form.Item
                              label="عنوان"
                              name={[name, "title"]}
                              rules={[
                                {
                                  required: fields.length > 1,
                                  message: "عنوان قیمت اجباری است.",
                                },
                              ]}
                            >
                              <Input placeholder="عنوان..." />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={11}>
                            <Form.Item
                              label="قیمت"
                              name={[name, "value"]}
                              rules={[
                                {
                                  required: true,
                                  message: "قیمت اجباری است.",
                                },
                              ]}
                            >
                              <InputNumber
                                className="w-full"
                                placeholder="قیمت..."
                                min={0}
                              />
                            </Form.Item>
                          </Col>
                          <Col
                            span={24}
                            md={1}
                            className={classNames({
                              "border-t": breakpoints.isXs,
                            })}
                          >
                            <TrashOutlined
                              width={20}
                              height={20}
                              color={redColor[600]}
                              className={twMerge(
                                classNames("cursor-pointer block w-fit", {
                                  "p-2 mx-auto":
                                    breakpoints.isSm || breakpoints.isXs,
                                })
                              )}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        </Row>
                      ))}
                    </Flex>
                  </Row>
                  <Row>
                    <Button type="primary" block onClick={() => add()}>
                      افزودن قیمت
                    </Button>
                  </Row>
                  {!!errors.length && (
                    <Row>
                      <Form.ErrorList errors={errors} />
                    </Row>
                  )}
                </Flex>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="تگ ها" name={"metadata"}>
            <Checkbox.Group>
              <Checkbox value="new">جدید</Checkbox>
              <Checkbox value="sold_out">تمام شده</Checkbox>
              <Checkbox value="day_offer">پیشنهاد روز</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            label="اولویت نمایش"
            name={"order"}
            extra="اولویت از عدد کوچک به بزرگ است"
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

export default AddItemForm;
