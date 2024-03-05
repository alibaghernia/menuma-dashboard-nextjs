"use client";
import { Flex, Row, Col, Button, Form, UploadFile } from "antd/lib";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { useParams } from "next/navigation";
import { BusinessProviderContext } from "@/providers/business/provider";
import { Product } from "@/services/dashboard/items/types";
import { Category } from "@/services/dashboard/categories/types";
const AddItemForm = dynamic(() => import("./components/form"), { ssr: false });

const AddItemsPage = ({ isEdit }: any) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();

  // private implementations
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const [form] = Form.useForm<
    Omit<Product, "categories"> & { categories: string; image: string }
  >();

  const { businessService } = useContext(BusinessProviderContext);

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
          image: data.data.image,
          order: data.data.order,
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
  function handleRemove() {
    addL("delete-item");
    businessService.itemsService
      .delete(params.uuid as string)
      .then(() => {
        message.success("آیتم مورد نظر با موفقیت حذف شد");
        router.replace(`/${params.business}/menu/items`);
      })
      .finally(() => {
        removeL("delete-item");
      });
  }

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchItem();
    }
  }, []);

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (isEdit) {
      businessService.itemsService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("آیتم با موفقیت بروزرسانی شد.");
          router.push(`/${params.business}/menu/items`);
        });
    } else {
      businessService.itemsService
        .create(values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("آیتم با موفقیت ساخته شد.");
          router.push(`/${params.business}/menu/items`);
        });
    }
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
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <AddItemForm
              form={form}
              categories={categories}
              imagePreviewUrl={imagePreviewUrl}
              setImagePreviewUrl={setImagePreviewUrl}
              isEdit={isEdit}
              handleRemove={handleRemove}
              onFinish={onFinish}
            />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default AddItemsPage;
