"use client";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Spin, TimePicker } from "antd";
import {
  Card,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Upload,
  UploadFile,
} from "antd/lib";
import React, { FC, useEffect, useMemo, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import ImageDisplayerWrapper from "../../../../../components/common/image-displayer";
import Image from "next/image";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapMarker from "@/assets/images/map-marker.png";
import L from "leaflet";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
} from "@/utils/hooks";
import dayjs from "dayjs";
import classNames from "classnames";
import { FormType } from "@/types";
import { useParams } from "next/navigation";
import { BusinessService } from "@/services/administrator/business.service";
import { uploadCustomRequest } from "@/utils/upload";
import { UsersService } from "@/services/administrator/users/users.service";
import { User } from "@/services/dashboard/users/types";
import _ from "lodash";
import { errorHandling } from "@/utils/forms";

const CafeRestaurantForm: FormType = (props) => {
  const [form] = Form.useForm();
  const params = useParams();
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const breakpoints = useCurrentBreakpoints();
  const [logoFileList, setLogoFileList] = useState<UploadFile<any>[]>([]);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string>();
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string>();
  const [bannerFileList, setBannerFileList] = useState<UploadFile<any>[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>();
  const [loaded, setLoaded] = useState(false);
  const businessService = useMemo(() => BusinessService.init(), []);
  const usersService = useMemo(() => UsersService.init(), []);
  const [users, setUsers] = useState<User[]>([]);

  const fieldsLabels = {
    slug: "اسلاگ",
  };

  function formFinishHandler(values: any) {
    const handleCatch = (err: any) => {
      if (err.data) {
        errorHandling(err.data, message, fieldsLabels);
      } else message.error("خطایی در ذخیره اطلاعات رخ داد.");
    };

    addL("save-data");
    if (props.isEdit) {
      businessService
        .update(params.uuid as string, values)
        .finally(() => {
          removeL("save-data");
        })
        .then(() => {
          message.success("اطلاعات با موفقیت ذخیره شد.");
          router.push("/administrator/cafe_restaurants");
        })
        .catch(handleCatch);
    } else {
      businessService
        .create(values)
        .finally(() => {
          removeL("save-data");
        })
        .then(() => {
          message.success("اطلاعات با موفقیت ذخیره شد.");
          router.push("/administrator/cafe_restaurants");
        })
        .catch(handleCatch);
    }
  }
  const locationPoint: [number, number] = [
    parseFloat(form.getFieldValue("location_lat") || 0),
    parseFloat(form.getFieldValue("location_long") || 0),
  ];
  function fetchItem() {
    addL("load-item");
    businessService
      .get(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          name: data.data.name,
          address: data.data.address,
          phone_number: data.data.phone_number,
          banner: data.data.banner,
          description: data.data.description,
          email: data.data.email,
          location_lat: data.data.location_lat,
          location_long: data.data.location_long,
          logo: data.data.logo,
          slug: data.data.slug,
          domain: data.data.domain,
          working_hours: data.data.working_hours?.map((wh) => ({
            ...wh,
            from: dayjs(wh.from),
            to: dayjs(wh.to),
          })),
          instagram: data.data.socials?.find((soc) => soc.type == "instagram")
            ?.link,
          telegram: data.data.socials?.find((soc) => soc.type == "telegram")
            ?.link,
          twitter_x: data.data.socials?.find((soc) => soc.type == "twitter_x")
            ?.link,
          whatsapp: data.data.socials?.find((soc) => soc.type == "whatsapp")
            ?.link,
          status: data.data.status == "1" ? "active" : "inactive",
          manager: data.data.users?.[0]?.uuid,
          users: data.data.users?.map((user) => ({
            user_uuid: user.uuid,
            //@ts-ignore
            role: user.BusinessUser.role,
          })),
          pager: data.data.pager,
          customer_club: data.data.customer_club,
        });
        setLogoPreviewUrl(data.data.logo_url);
        setBannerPreviewUrl(data.data.banner_url);
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد!");
      });
  }
  function fetchUsers() {
    addL("fetch-users");
    usersService
      .getAll()
      .finally(() => {
        removeL("fetch-users");
      })
      .then((data) => {
        setUsers(data.data.users);
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات رخ داد");
      });
  }
  useEffect(() => {
    setLoaded(true);
    fetchUsers();
    if (props.isEdit) {
      fetchItem();
    }
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
          location_lat: "31.876",
          location_long: "54.34",
          status: "active",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
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
                    customRequest={(options) => {
                      addL("upload-image");
                      return uploadCustomRequest(options)
                        .finally(() => {
                          removeL("upload-image");
                        })
                        .then((data) => {
                          form.setFieldValue("logo", data.uuid);
                        });
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
                  {!!logoPreviewUrl && (
                    <ImageDisplayerWrapper
                      avatar
                      onRemove={() => {
                        setLogoFileList([]);
                        setLogoPreviewUrl(undefined);
                        form.setFieldValue("logo", undefined);
                      }}
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
                    customRequest={(options) => {
                      addL("upload-image");
                      return uploadCustomRequest(options)
                        .finally(() => {
                          removeL("upload-image");
                        })
                        .then((data) => {
                          form.setFieldValue("banner", data.uuid);
                        });
                    }}
                    fileList={bannerFileList}
                    openFileDialogOnClick={!!!bannerFileList.length}
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

                  {!!bannerPreviewUrl && (
                    <ImageDisplayerWrapper
                      onRemove={() => {
                        setBannerFileList([]);
                        setBannerPreviewUrl(undefined);
                        form.setFieldValue("banner", undefined);
                      }}
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
                  name="phone_number"
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
                            form.setFieldValue(
                              "location_lat",
                              position[0].toString()
                            );
                            form.setFieldValue(
                              "location_long",
                              position[1].toString()
                            );
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
                      <Form.Item name="location_lat" label="طول جغرافیایی">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="location_long" label="عرض جغرافیایی">
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
                        align="start"
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
                                placeholder="روز هفته..."
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
                            >
                              <TimePicker
                                className="w-full"
                                showSecond={false}
                                showNow={false}
                                format={"HH:mm"}
                                placeholder="انتخاب زمان"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={10}>
                            <Form.Item className={"m-0"} name={[name, "to"]}>
                              <TimePicker
                                className="w-full"
                                showSecond={false}
                                showNow={false}
                                format={"HH:mm"}
                                placeholder="انتخاب زمان"
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
          <Card title="اعضا">
            <Form.List name="users">
              {(fields, { add, remove }) =>
                !!fields.length ? (
                  <Flex vertical gap={8}>
                    {fields.map(({ key, name }) => (
                      <Flex
                        key={key}
                        vertical={breakpoints.isXs || breakpoints.last == "sm"}
                        justify="space-between"
                        gap={8}
                        wrap="wrap"
                      >
                        <Row gutter={8} align="bottom" className="w-full" wrap>
                          <Col xs={24} sm={11}>
                            <Form.Item
                              label="کاربر"
                              name={[name, "user_uuid"]}
                              rules={[
                                {
                                  required: true,
                                  message: "انتخاب کاربر",
                                },
                              ]}
                            >
                              <Select
                                placeholder="انتخاب کاربر..."
                                options={users.map((user) => ({
                                  label: [user.first_name, user.last_name].join(
                                    " "
                                  ),
                                  value: user.uuid,
                                }))}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={11}>
                            <Form.Item
                              name={[name, "role"]}
                              label="نقش"
                              initialValue={"user"}
                              rules={[
                                {
                                  required: true,
                                  message: "نقش اجباری است",
                                },
                              ]}
                            >
                              <Select
                                placeholder="انتخاب نقش..."
                                options={[
                                  {
                                    label: "کاربر",
                                    value: "user",
                                  },
                                  {
                                    label: "کارمند",
                                    value: "employee",
                                  },
                                  {
                                    label: "مدیر",
                                    value: "manager",
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={2}>
                            <Form.Item>
                              <Row gutter={8}>
                                <Col span={12}>
                                  <Button
                                    ghost
                                    type="primary"
                                    onClick={() => {
                                      add();
                                    }}
                                    block={breakpoints.isXs}
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
                                    block={breakpoints.isXs}
                                    danger
                                  >
                                    <MinusCircleOutlined />
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Item>
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
                    افزودن عضو
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
        <Form.Item name="description" label="توضیحات">
          <Input.TextArea placeholder="توضیحات..." />
        </Form.Item>
        <Form.Item name="status" label="وضعیت">
          <Radio.Group defaultValue="active">
            <Radio.Button value="active">فعال</Radio.Button>
            <Radio.Button value="inactive">غیر فعال</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Row gutter={8}>
          <Col xs={12} md={8}>
            <Form.Item name="pager" label="پیجر">
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={12} md={8}>
            <Form.Item name="customer_club" label="باشگاه مشتریان">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
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
