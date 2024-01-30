"use client";
import { InboxOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";
import ImageDisplayerWrapper from "./components/image-displayer";
import Image from "next/image";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CafeRestaurantForm = () => {
  const [form] = Form.useForm();
  const [logoFileList, setLogoFileList] = useState<UploadFile<any>[]>([]);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>();
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>();
  const [bannerFileList, setBannerFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  const [date, setDate] = useState<DateObject | DateObject[] | null>();
  const [editorLoading, setEditorLoading] = useState(true);

  function formFinishHandler(values: any) {
    console.log({
      values,
    });
  }

  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        onFinish={formFinishHandler}
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
          <Col xs={24} sm={12}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "اسلاگ اجباری است",
                },
              ]}
              name="slug"
              label="اسلاگ"
            >
              <Input placeholder="اسلاگ..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Card title="تصاویر">
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item label="لوگو" name="logo">
                  <Upload.Dragger
                    name="logo"
                    listType="picture-circle"
                    multiple={false}
                    showUploadList={false}
                    accept=".png,.jpg,.jpeg"
                    onChange={async (info) => {
                      const arrayBuffer =
                        await info.file.originFileObj?.arrayBuffer();
                      if (arrayBuffer) {
                        var arrayBufferView = new Uint8Array(arrayBuffer);
                        var blob = new Blob([arrayBufferView], {
                          type: info.file.type,
                        });
                        const url = window.URL.createObjectURL(blob);
                        setLogoPreviewUrl(url);
                      } else {
                        setLogoPreviewUrl(undefined);
                      }
                      setLogoFileList(info.fileList);
                    }}
                    fileList={logoFileList}
                    openFileDialogOnClick={!!!logoFileList.length}
                  >
                    {Boolean(logoFileList.length) ? (
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
                  {Boolean(logoFileList.length) && (
                    <ImageDisplayerWrapper
                      avatar
                      onRemove={() => setLogoFileList([])}
                      className="mx-auto"
                      imageRootClassName="relative w-[5rem] h-[5rem] border"
                    >
                      <Image fill src={logoPreviewUrl!} alt="logo" />
                    </ImageDisplayerWrapper>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="بنر" name="banner">
                  <Upload.Dragger
                    name="banner"
                    listType="picture-card"
                    multiple={false}
                    showUploadList={false}
                    className="mx-auto"
                    accept=".png,.jpg,.jpeg"
                    onChange={async (info) => {
                      const arrayBuffer =
                        await info.file.originFileObj?.arrayBuffer();
                      if (arrayBuffer) {
                        var arrayBufferView = new Uint8Array(arrayBuffer);
                        var blob = new Blob([arrayBufferView], {
                          type: info.file.type,
                        });
                        const url = window.URL.createObjectURL(blob);
                        setBannerPreviewUrl(url);
                      } else {
                        setBannerPreviewUrl(undefined);
                      }
                      setBannerFileList(info.fileList);
                    }}
                    fileList={bannerFileList}
                    openFileDialogOnClick={!!!logoFileList.length}
                  >
                    {Boolean(bannerFileList.length) ? (
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

                  {Boolean(bannerFileList.length) && (
                    <ImageDisplayerWrapper
                      onRemove={() => setBannerFileList([])}
                      className="mx-auto"
                      imageRootClassName="relative w-[10rem] h-[5rem] border"
                    >
                      <Image
                        fill
                        src={bannerPreviewUrl!}
                        alt="logo"
                        className="p-2"
                      />
                    </ImageDisplayerWrapper>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>

        <Form.Item>
          <Card title="راه های ارتباطی">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="address" label="آدرس">
                  <Input.TextArea placeholder="آدرس..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="mobile"
                  label="شماره تماس"
                  rules={[
                    {
                      pattern: /^(09|0)\d{9,11}$/,
                      message: "شماره درست نیست!",
                    },
                  ]}
                  extra="برای شماره تلفن به همراه کد استان وارد شود."
                >
                  <Input placeholder="شماره تماس..." />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="آدرس ایمیل"
                  rules={[
                    {
                      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "ایمیل درست نیست!",
                    },
                  ]}
                >
                  <Input placeholder="آدرس ایمیل..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Flex className="w-full" vertical gap={24}>
                  <MapContainer
                    className="w-full h-[10rem]"
                    center={[31.876936163535166, 54.34009516632624]}
                    zoom={13}
                  >
                    <TileLayer url="http://mt1.google.com/vt/lyrs=m&x={x}&z={z}&y={y}"></TileLayer>
                  </MapContainer>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Form.Item>
        <Form.Item name="status" label="وضعیت">
          <Radio.Group defaultValue="active">
            <Radio.Button value="active">فعال</Radio.Button>
            <Radio.Button value="inactive">غیر فعال</Radio.Button>
          </Radio.Group>
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

export default CafeRestaurantForm;
