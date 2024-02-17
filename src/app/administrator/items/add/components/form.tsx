"use client";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import TrashOutlined from "@/icons/trash-outlined";
import { BusinessProviderContext } from "@/providers/business/provider";
import { BusinessService } from "@/services/administrator/business.service";
import { CategoryService } from "@/services/administrator/cateogires/categories.service";
import { ItemsService } from "@/services/administrator/items/items.service";
import { Business } from "@/services/administrator/types";
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
  Switch,
  Upload,
  UploadFile,
} from "antd/lib";
import classNames from "classnames";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const AddItemForm: FormType = (props) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const breakpoints = useCurrentBreakpoints();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const redColor = useTailwindColor("red");

  // private implementations
  const [categories, setCategories] = useState<Category[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const businessService = BusinessService.init();
  const categoryService = CategoryService.init();
  const itemsService = ItemsService.init();

  // data
  const business_uuid_watch = Form.useWatch("business_uuid", form);

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (props.isEdit) {
      itemsService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("آیتم با موفقیت بروزرسانی شد.");
          router.push(`/administrator/items`);
        });
    } else {
      itemsService
        .create(values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("آیتم با موفقیت ساخته شد.");
          router.push(`/administrator/items`);
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

  function fetchCategories(business_uuid: string) {
    addL("load-categories-noall");
    categoryService
      .getItems({
        business_uuid,
      })
      .finally(() => {
        removeL("load-categories-noall");
      })
      .then((data) => {
        setCategories(data.data.categories);
      })
      .catch(() => {
        message.error("مشکلی در دریافت لیست دسته بندی ها وجود دارد!");
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
  function fetchItem() {
    addL("load-item");
    itemsService
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
          business_uuid: data.data.business?.uuid,
        });
        setImagePreviewUrl(data.data.image_url);
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }

  useEffect(() => {
    fetchBusinesses();
    if (props.isEdit) {
      fetchItem();
    }
  }, []);

  useEffect(() => {
    if (business_uuid_watch) fetchCategories(business_uuid_watch);
    else setCategories([]);
  }, [business_uuid_watch]);

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
              <Input placeholder="عنوان آیتم..." />
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
                options={categories.map((cat) => ({
                  label: cat.title,
                  value: cat.uuid,
                }))}
                placeholder="انتخاب دسته بندی..."
                loading={hasL("load-categories-noall")}
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
            <Checkbox value="offer">پیشنهاد روز</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col xs={12} md={8}>
              <Form.Item name="pin" label="پین شده">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
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
