"use client";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Switch } from "antd";
import {
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Spin,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useEffect, useRef, useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FormType } from "@/types";
import { errorHandling } from "@/utils/forms";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import moment from "jalali-moment";
import { useParams } from "next/navigation";
import { CatalogsService } from "@/services/administrator/catalogs/catalogs.service";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import Image from "next/image";
import { uploadCustomRequest } from "@/utils/upload";

const CatalogForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  const [date, setDate] = useState<DateObject | DateObject[] | null>();
  const [editorLoading, setEditorLoading] = useState(true);
  const catalogsService = CatalogsService.init();
  const ckEditor = useRef<ClassicEditor>();

  async function onFinish(values: unknown) {
    const { birth_date, ...payload } = values as any;

    addL("create-item");
    if (props.isEdit) {
      catalogsService
        .update(params.uuid as string, payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("کاتالوگ با موفقیت بروزرسانی شد.");
          router.push(`/administrator/catalogs`);
        })
        .catch((error) => {
          console.log({
            error,
          });
          message.error("مشکلی در ذخیره اطلاعات وجود دارد");
        });
    } else {
      catalogsService
        .create(payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("کاتالوگ با موفقیت ساخته شد.");
          router.push(`/administrator/catalogs`);
        })
        .catch((error) => {
          message.error("مشکلی در ذخیره اطلاعات وجود دارد");
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
    catalogsService
      .get(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        console.log({
          labels: data.data.labels,
        });
        form.setFieldsValue({
          title: data.data.title,
          long_description: data.data.long_description,
          short_description: data.data.short_description,
          image: data.data.image,
          soon: data.data.soon,
          labels: data.data.labels,
        });
        if (data.data.long_description)
          ckEditor.current?.setData(data.data.long_description);
        if (data.data.image_url) setImagePreviewUrl(data.data.image_url);
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

  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="title"
              label="عنوان"
              rules={[
                {
                  required: true,
                  message: "عنوان اجباری است",
                },
              ]}
            >
              <Input placeholder="عنوان..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="تصویر" name="image">
          <Upload.Dragger
            listType="picture"
            multiple={false}
            showUploadList={false}
            accept=".png,.jpg,.jpeg"
            onChange={handleUploadOnChange}
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
        <Form.Item name="short_description" label="توضیحات متخصر">
          <Input.TextArea placeholder="توضیحات مختصر..." />
        </Form.Item>
        <Form.Item
          name="long_description"
          label="توضیحات کامل"
          className="relative min-h-[3rem]"
          valuePropName=""
          initialValue={""}
        >
          <div>
            <CKEditor
              editor={ClassicEditor}
              config={{
                language: "fa",
              }}
              onReady={(editor) => {
                ckEditor.current = editor;
                setEditorLoading(false);
                editor.setData(form.getFieldValue("long_description"));
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "min-height",
                    "10rem",
                    //@ts-ignore
                    editor.editing.view.document.getRoot()
                  );
                  writer.setStyle(
                    "direction",
                    "rtl",
                    //@ts-ignore
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(_, editor) => {
                form.setFieldValue("long_description", editor.getData());
              }}
            />
            {editorLoading && (
              <div className="absolute inset-0 bg-white flex justify-center items-center">
                <Spin />
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item label="برچسب ها">
          <Form.List name="labels">
            {(fields, { add, remove }, { errors }) => (
              <Row gutter={16}>
                {!Boolean(fields.length) ? (
                  <Col>
                    <Button
                      className="flex items-center"
                      icon={<PlusCircleOutlined />}
                      onClick={() => add()}
                    >
                      افزودن
                    </Button>
                  </Col>
                ) : (
                  fields.map(({ key, name }) => (
                    <Col key={key} xs={24} md={12} lg={8}>
                      <Flex gap={8} align="center">
                        <Form.Item name={[name, "label"]} className="w-full">
                          <Input className="w-full" placeholder="برچسب..." />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            className="flex items-center justify-center"
                            icon={<PlusCircleOutlined />}
                            onClick={() => {
                              add();
                            }}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            className="flex items-center justify-center"
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                          />
                        </Form.Item>
                      </Flex>
                    </Col>
                  ))
                )}
              </Row>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name="soon" label="به زودی">
          <Switch />
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

export default CatalogForm;
