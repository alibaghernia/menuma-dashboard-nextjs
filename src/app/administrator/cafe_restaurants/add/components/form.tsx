"use client";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Spin } from "antd";
import {
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TimePicker,
  Upload,
  UploadFile,
} from "antd/lib";
import React, { FC, useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import ImageDisplayerWrapper from "../../../../../components/common/image-displayer";
import Image from "next/image";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapMarker from "@/assets/images/map-marker.png";
import L from "leaflet";
import { useCurrentBreakpoints } from "@/utils/hooks";
import dayjs from "dayjs";
import classNames from "classnames";

const CafeRestaurantForm = () => {
  const [form] = Form.useForm();
  const breakpoints = useCurrentBreakpoints();
  const [logoFileList, setLogoFileList] = useState<UploadFile<any>[]>([]);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>();
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>();
  const [bannerFileList, setBannerFileList] = useState<UploadFile<any>[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>();
  const [loaded, setLoaded] = useState(false);
  function formFinishHandler(values: any) {
    console.log({
      values,
    });
  }
  const locationPoint: [number, number] = [
    parseFloat(form.getFieldValue("lat") || 0),
    parseFloat(form.getFieldValue("long") || 0),
  ];
  useEffect(() => {
    setLoaded(true);
  }, []);

  const socialLinkRules = [
    {
      pattern: /^(http:|https:)/,
      message: "آدرس اشتباه است.",
    },
  ];

  return (
    <Card className="w-full">
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        onFinish={formFinishHandler}
        initialValues={{
          lat: 31.876,
          long: 54.34,
          working_hours: [
            {
              from: null,
              to: null,
              day: null,
            },
          ],
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="manager"
              label="مدیر"
              rules={[
                {
                  required: true,
                  message: "انتخاب مدیر اجباری است",
                },
              ]}
            >
              <Select placeholder="انتخاب مدیر..." />
            </Form.Item>
          </Col>
        </Row>
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
                  <div className="rounded-[.5rem] h-[10rem] md:h-[20rem] relative">
                    {loaded ? (
                      <MapContainer
                        className="w-full h-full z-0"
                        center={selectedLocation || locationPoint}
                        zoom={13}
                      >
                        <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&z={z}&y={y}" />
                        <LocationMarker
                          position={selectedLocation || locationPoint}
                          setPosition={(position) => {
                            setSelectedLocation(position);
                            form.setFieldValue("lat", position[0]);
                            form.setFieldValue("long", position[1]);
                          }}
                        />
                      </MapContainer>
                    ) : (
                      <div className="absolute inset-0 bg-white flex justify-center items-center border">
                        <Spin />
                      </div>
                    )}
                  </div>
                  <Row gutter={24}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="lat" label="طول جغرافیایی">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="long" label="عرض جغرافیایی">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Form.Item>
        <Form.Item>
          <Card title="ساعات کاری">
            <Form.List name="working_hours">
              {(fields, { add, remove }) =>
                !!fields.length ? (
                  <Flex vertical gap={8}>
                    {fields.map(({ key, name }) => (
                      <Flex
                        key={key}
                        vertical={breakpoints.isXs || breakpoints.last == "sm"}
                        justify="space-between"
                        align="center"
                        gap={8}
                      >
                        <Row gutter={8} className="w-full">
                          <Col xs={24} md={4}>
                            <Form.Item
                              className={classNames({
                                "m-0": !breakpoints.isXs,
                              })}
                              name={[name, "day"]}
                              rules={[
                                {
                                  required: true,
                                  message: "انتخاب روز اجباری است",
                                },
                              ]}
                            >
                              <Select
                                options={[
                                  {
                                    label: "شنبه",
                                    value: 6,
                                  },
                                  {
                                    label: "یکشنبه",
                                    value: 7,
                                  },
                                  {
                                    label: "دوشنبه",
                                    value: 1,
                                  },
                                  {
                                    label: "سه شنبه",
                                    value: 2,
                                  },
                                  {
                                    label: "چهارشنبه",
                                    value: 3,
                                  },
                                  {
                                    label: "پنج شنبه",
                                    value: 4,
                                  },
                                  {
                                    label: "جمعه",
                                    value: 5,
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={10}>
                            <Form.Item
                              className={classNames({
                                "m-0": !breakpoints.isXs,
                              })}
                              name={[name, "from"]}
                              rules={[
                                {
                                  required: true,
                                  message: "ساعت شروع اجباری است",
                                },
                              ]}
                              //@ts-ignore
                              getValueProps={(value) => {
                                return dayjs(value);
                              }}
                            >
                              <TimePicker
                                className="w-full"
                                showSecond={false}
                                showNow={false}
                                format={"HH:mm"}
                                placeholder="انتخاب زمان"
                                onChange={(e) => {
                                  form.setFieldValue(
                                    [name, "from"],
                                    e?.format("HH:mm")
                                  );
                                }}
                                onSelect={(e) => {
                                  form.setFieldValue(
                                    [name, "from"],
                                    e?.format("HH:mm")
                                  );
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={10}>
                            <Form.Item
                              className={"m-0"}
                              name={[name, "to"]}
                              //@ts-ignore
                              getValueProps={(value) => {
                                return dayjs(value);
                              }}
                            >
                              <TimePicker
                                className="w-full"
                                showSecond={false}
                                showNow={false}
                                format={"HH:mm"}
                                placeholder="انتخاب زمان"
                                onChange={(e) => {
                                  form.setFieldValue(
                                    [name, "to"],
                                    e?.format("HH:mm")
                                  );
                                }}
                                onSelect={(e) => {
                                  form.setFieldValue(
                                    [name, "to"],
                                    e?.format("HH:mm")
                                  );
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={12}>
                          <Col span={12}>
                            <Button
                              ghost
                              type="primary"
                              onClick={() => {
                                add();
                              }}
                            >
                              <PlusCircleOutlined />
                            </Button>
                          </Col>
                          <Col span={12}>
                            <Button
                              ghost
                              type="primary"
                              onClick={() => {
                                remove(name);
                              }}
                              danger
                            >
                              <MinusCircleOutlined />
                            </Button>
                          </Col>
                        </Row>
                      </Flex>
                    ))}
                  </Flex>
                ) : (
                  <Button
                    ghost
                    type="primary"
                    className={classNames({
                      "mx-auto": !breakpoints.isXs,
                    })}
                    block={breakpoints.isXs}
                    onClick={() => {
                      add();
                    }}
                  >
                    افزودن ساعت کاری
                  </Button>
                )
              }
            </Form.List>
          </Card>
        </Form.Item>
        <Form.Item>
          <Card title="شبکه های اجتماعی">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="instagram"
                  label="اینستاگرام"
                  rules={socialLinkRules}
                >
                  <Input placeholder="آدرس شبکه اجتماعی..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="telegram"
                  label="تلگرام"
                  rules={socialLinkRules}
                >
                  <Input placeholder="آدرس شبکه اجتماعی..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="twitter_x"
                  label="توییتر X"
                  rules={socialLinkRules}
                >
                  <Input placeholder="آدرس شبکه اجتماعی..." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="whatsapp"
                  label="واتساپ"
                  rules={socialLinkRules}
                >
                  <Input placeholder="آدرس شبکه اجتماعی..." />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>
        <Form.Item name="domain" label="آدرس دامنه">
          <Input placeholder="آدرس دامنه..." />
        </Form.Item>
        <Form.Item name="descriptions" label="توضیحات">
          <Input.TextArea placeholder="توضیحات..." />
        </Form.Item>
        <Form.Item name="status" label="وضعیت">
          <Radio.Group defaultValue="active">
            <Radio.Button value="active">فعال</Radio.Button>
            <Radio.Button value="inactive">غیر فعال</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="settings" label="تنظیمات دیگر">
          <Checkbox.Group>
            <Checkbox value="customer_club">باشگاه مشتریان</Checkbox>
          </Checkbox.Group>
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

const LocationMarker: FC<{
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}> = ({ position, setPosition }) => {
  useMapEvent("click", (l) => {
    setPosition([l.latlng.lat, l.latlng.lng]);
  });
  return (
    <Marker
      position={position}
      icon={L.icon({
        iconSize: [32, 32],
        iconAnchor: [32 / 2, 32],
        // className: "mymarker",
        iconUrl: mapMarker.src,
      })}
    />
  );
};
