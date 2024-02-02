"use client";
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
import React, { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const AddItemForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm<
    Omit<Product, "categories"> & { categories: string; image: string }
  >();
  const breakpoints = useCurrentBreakpoints();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const redColor = useTailwindColor("red");

  // private implementations
  const [categories, setCategories] = useState<Category[]>([]);

  const { businessService } = useContext(BusinessProviderContext);

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (props.isEdit) {
      businessService.itemsService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("آیتم با موفقیت بروزرسانی شد.");
          router.push("/menu/items");
        });
    } else {
      businessService.itemsService
        .create(values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("آیتم با موفقیت ساخته شد.");
          router.push("/menu/items");
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
    businessService.itemsService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          title: data.data.title,
          prices: data.data.prices,
          categories: data.data.categories?.[0]?.uuid,
          description: data.data.description,
          metadata: data.data.metadata,
          image: data.data.images?.[0]?.uuid,
        });
        setImagePreviewUrl(data.data.image_url);
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }
  function fetchCategories() {
    addL("load-categories");
    businessService.categoriesService
      .getItems()
      .finally(() => {
        removeL("load-categories");
      })
      .then((data) => {
        setCategories(data.data.categories);
      })
      .catch(() => {
        message.error("مشکلی در دریافت لیست دسته بندی ها وجود دارد!");
      });
  }

  useEffect(() => {
    fetchCategories();
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
        onFinish={(values) => {
          onFinish(values);
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
                options={categories.map((cat) => ({
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
              imageRootClassName="relative w-[5rem] h-[5rem] border"
            >
              <Image fill src={imagePreviewUrl} alt="logo" />
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
                  <Button ghost type="primary" block onClick={() => add()}>
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
            <Checkbox value="sold-out">تمام شده</Checkbox>
            <Checkbox value="offer">پیشنهاد روز</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ارسال
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddItemForm;
