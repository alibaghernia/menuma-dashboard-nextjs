"use client";
import { Flex, Row, Col, Button, Form, UploadFile } from "antd";
import Search from "antd/lib/input/Search";
import React, { useContext, useEffect, useState } from "react";
import CategoriesTable from "../components/table";
import AddCategoryForm from "./components/form";
import { useCustomRouter, useLoadings, useMessage } from "@/utils/hooks";
import { BusinessProviderContext } from "@/providers/business/provider";
import { useParams } from "next/navigation";

const AddCategoryPage = ({ isEdit }: any) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const { businessService } = useContext(BusinessProviderContext);

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
          order: data.data.order,
        });
        setImagePreviewUrl(data.data.image_url);
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }

  async function onFinish(values: unknown) {
    console.log({ values });
    addL("create-item");
    if (isEdit) {
      businessService.categoriesService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دسته بندی با موفقیت بروزرسانی شد.");
          router.push(`/${params.business}/menu/categories`);
        });
    } else {
      businessService.categoriesService
        .create(values)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دسته بندی با موفقیت ساخته شد.");
          router.push(`/${params.business}/menu/categories`);
        });
    }
  }

  function handleRemove() {
    addL("delete-item");
    businessService.categoriesService
      .delete(params.uuid as string)
      .then(() => {
        message.success("آیتم مورد نظر با موفقیت حذف شد");
        router.replace(`/${params.business}/menu/categories`);
      })
      .finally(() => {
        removeL("delete-item");
      });
  }
  useEffect(() => {
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
        <Flex className="w-full" vertical gap="1rem">
          <Row>
            <AddCategoryForm
              form={form}
              onFinish={onFinish}
              setImagePreviewUrl={setImagePreviewUrl}
              imagePreviewUrl={imagePreviewUrl}
              handleRemove={handleRemove}
            />
          </Row>
        </Flex>
      </Row>
    </Flex>
  );
};

export default AddCategoryPage;
