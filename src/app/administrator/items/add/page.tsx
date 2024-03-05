"use client";
import { Flex, Row, Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CategoryService } from "@/services/administrator/cateogires/categories.service";
import { Business } from "@/services/administrator/types";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import { useParams } from "next/navigation";
import { BusinessService } from "@/services/administrator/business.service";
import { ItemsService } from "@/services/administrator/items/items.service";
import { Category } from "@/services/administrator/cateogires/types";
import { Select } from "antd/lib";
const AddItemForm = dynamic(
  () => import("@/app/(dashboard)/[business]/menu/items/add/components/form"),
  { ssr: false }
);

const AddItemsPage = ({ isEdit }: any) => {
  const params = useParams();
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();

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
    if (isEdit) {
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
          image: data.data.image,
          order: data.data.order,
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
    if (isEdit) {
      fetchItem();
    }
  }, []);

  useEffect(() => {
    if (business_uuid_watch) fetchCategories(business_uuid_watch);
    else setCategories([]);
  }, [business_uuid_watch]);

  function handleRemove() {
    addL("delete-item");
    itemsService
      .delete(params.uuid as string)
      .then(() => {
        message.success("آیتم مورد نظر با موفقیت حذف شد");
        router.replace(`/administrator/items`);
      })
      .finally(() => {
        removeL("delete-item");
      });
  }

  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">
              {isEdit ? "ویرایش" : "افزودن"} آیتم
            </div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Form form={form} className="w-full" layout="vertical">
          <Col xs={24} lg={6}>
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
                className="w-full"
                disabled={isEdit}
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
          <Form.Item>
            <AddItemForm
              categories={categories}
              form={form}
              onFinish={onFinish}
              setImagePreviewUrl={setImagePreviewUrl}
              handleRemove={handleRemove}
              imagePreviewUrl={imagePreviewUrl}
              isEdit={isEdit}
            />
          </Form.Item>
        </Form>
      </Row>
    </Flex>
  );
};

export default AddItemsPage;
