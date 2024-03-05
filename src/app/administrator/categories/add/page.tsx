"use client";
import { Flex, Row, Col, Button, Form, UploadFile } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import CategoriesTable from "../components/table";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { BusinessService } from "@/services/administrator/business.service";
import { CategoryService } from "@/services/administrator/cateogires/categories.service";
import { Business } from "@/services/administrator/types";
import { useParams } from "next/navigation";
import { Select } from "antd/lib";
import dynamic from "next/dynamic";
const AddCategoryForm = dynamic(
  () =>
    import("@/app/(dashboard)/[business]/menu/categories/add/components/form"),
  { ssr: false }
);

const AddCategoryPage = ({ isEdit }: any) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const businessService = BusinessService.init();
  const categoryService = CategoryService.init();

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (isEdit) {
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
          order: data.data.order,
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

  function handleRemove() {
    addL("delete-item");
    categoryService
      .delete(params.uuid as string)
      .then(() => {
        message.success("آیتم مورد نظر با موفقیت حذف شد");
        router.replace(`/administrator/categories`);
      })
      .finally(() => {
        removeL("delete-item");
      });
  }
  useEffect(() => {
    fetchBusinesses();
    if (isEdit) {
      fetchItem();
    }
  }, []);

  return (
    <Flex vertical gap="1.44rem">
      <Row>
        <Flex>
          <Col>
            <div className="text-[1.5rem] font-semibold">
              {isEdit ? "ویرایش" : "افزودن"} دسته بندی
            </div>
          </Col>
        </Flex>
      </Row>
      <Row>
        <Form form={form} layout="vertical" className="w-full">
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
                className="w-full"
                placeholder="بیزنس..."
                disabled={isEdit}
                options={businesses.map((bus) => ({
                  label: bus.name,
                  value: bus.uuid,
                }))}
              />
            </Form.Item>
          </Col>
          <Form.Item>
            <AddCategoryForm
              form={form}
              onFinish={onFinish}
              setImagePreviewUrl={setImagePreviewUrl}
              imagePreviewUrl={imagePreviewUrl}
              handleRemove={handleRemove}
            />
          </Form.Item>
        </Form>
      </Row>
    </Flex>
  );
};

export default AddCategoryPage;
