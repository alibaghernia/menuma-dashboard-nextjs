"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  TimePicker,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useContext, useEffect, useState } from "react";
import DateObject from "react-date-object";
import moment from "jalali-moment";
import classNames from "classnames";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePicker from "react-multi-date-picker";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import dayjs from "dayjs";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import { useParams } from "next/navigation";
import { FormType } from "@/types";
import { uploadCustomRequest } from "@/utils/upload";
import ImageDisplayerWrapper from "@/components/common/image-displayer";
import Image from "next/image";
import { BusinessProviderContext } from "@/providers/business/provider";

const EventForm: FormType = (props) => {
  const params = useParams();
  const [addL, removeL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const designToken = theme.useToken();
  // const [date, setDate] = useState<DateObject | DateObject[] | null>();
  const [editorLoading, setEditorLoading] = useState(true);
  const { businessService } = useContext(BusinessProviderContext);

  async function onFinish(values: unknown) {
    const { start_date, start_time, end_date, end_time, ...payload } =
      values as any;

    payload.organizer_type = "BUSINESS";
    payload.organizer_uuid = params.business;
    const start = moment(
      `${start_date} ${start_time}`,
      "jYYYY-jMM-jDD HH:mm"
    ).toLocaleString();
    let end: string;
    if (end_date) {
      end = moment(
        `${end_date} ${end_time || "00:00"}`,
        "jYYYY-jMM-jDD HH:mm"
      ).toLocaleString();
      payload.end_at = end;
    }
    payload.start_at = start;

    addL("create-item");
    if (props.isEdit) {
      businessService.eventsService
        .update(params.uuid as string, payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دورهمی با موفقیت بروزرسانی شد.");
          router.push(`/${params.business}/events`);
        });
    } else {
      businessService.eventsService
        .create(payload)
        .finally(() => {
          removeL("create-item");
        })
        .then(() => {
          message.success("دورهمی با موفقیت ساخته شد.");
          router.push(`/${params.business}/events`);
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
    businessService.eventsService
      .getItem(params.uuid as string)
      .finally(() => {
        removeL("load-item");
      })
      .then((data) => {
        form.setFieldsValue({
          title: data.data.title,
          price: data.data.price,
          short_description: data.data.short_description,
          long_description: data.data.long_description,
          cycle: data.data.cycle,
          banner_uuid: data.data.banner_uuid,
          limit: data.data.limit,
        });
        const start_at = moment(data.data.start_at);
        let end_at;
        if (data.data.end_at) end_at = moment(data.data.end_at);

        form.setFieldValue("start_time", dayjs(data.data.start_at));
        form.setFieldValue("start_date", start_at.format("jYYYY/jMM/jDD"));
        if (end_at) {
          form.setFieldValue("end_time", dayjs(data.data.end_at));
          form.setFieldValue("end_date", end_at.format("jYYYY/jMM/jDD"));
        }

        setImagePreviewUrl(data.data.banner_url);
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
        initialValues={{
          cycle: "ONETIME",
        }}
      >
        <Form.Item>
          <Row gutter={24}>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
              <Form.Item
                name="limit"
                label="ظرفیت"
                help="تعداد افراد شرکت کننده"
              >
                <InputNumber
                  min={1}
                  className="w-full"
                  placeholder="ظرفیت..."
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="price"
                label="هزینه"
                help="مبلغ به تومان، در صورت رایگان بودن خالی بگذارید"
              >
                <InputNumber
                  min={0}
                  className="w-full"
                  placeholder="هزینه..."
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Card title="زمان برگزاری">
            <Row gutter={8}>
              <Col xs={24} md={4}>
                <Form.Item label="دوره زمانی" name="cycle">
                  <Select
                    defaultValue={["ONETIME"]}
                    options={[
                      {
                        label: "یکبار",
                        value: "ONETIME",
                      },
                      {
                        label: "هفتگی",
                        value: "WEEKLY",
                      },
                      {
                        label: "روزانه",
                        value: "DAYLY",
                      },
                      {
                        label: "ماهانه",
                        value: "MONTHLY",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} md={6}>
                <Form.Item
                  label="تاریخ شروع"
                  name="start_date"
                  className={"w-full"}
                  rules={[
                    {
                      required: true,
                      message: "تاریخ شروع اجباری است",
                    },
                  ]}
                >
                  <DatePicker
                    inputClass={classNames(
                      "ant-input ant-input-outlined w-full",
                      designToken.hashId
                    )}
                    className="rmdp-mobile"
                    containerClassName="w-full"
                    placeholder="تاریخ برگزاری..."
                    calendar={persian}
                    highlightToday={false}
                    locale={persian_fa}
                    digits={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                    calendarPosition="bottom-right"
                    onChange={(date: DateObject) => {
                      console.log({
                        date,
                      });
                      form.setFieldValue(
                        "start_date",
                        date.format("YYYY-MM-DD")
                      );
                      return date as any;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="start_time"
                  label="ساعت شروع"
                  rules={[
                    {
                      required: true,
                      message: "ساعت شروع اجباری است",
                    },
                  ]}
                >
                  <TimePicker
                    className={classNames(
                      "ant-input ant-input-outlined",
                      designToken.hashId
                    )}
                    showSecond={false}
                    showNow={false}
                    format={"HH:mm"}
                    placeholder="انتخاب زمان"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  label="تاریخ پایان"
                  name="end_date"
                  className={"w-full"}
                >
                  <DatePicker
                    inputClass={classNames(
                      "ant-input ant-input-outlined w-full",
                      designToken.hashId
                    )}
                    className="rmdp-mobile"
                    containerClassName="w-full"
                    placeholder="تاریخ پایان..."
                    calendar={persian}
                    locale={persian_fa}
                    highlightToday={false}
                    mobileButtons={[
                      {
                        label: "پاک کردن",
                        className: "rmdp-button rmdp-action-button",
                        onClick: () => form.setFieldValue("end_date", ""),
                      },
                    ]}
                    digits={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                    calendarPosition="bottom-right"
                    onChange={(date: DateObject) => {
                      form.setFieldValue("end_date", date.format("YYYY-MM-DD"));
                      return date as any;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="end_time" label="ساعت پایان">
                  <TimePicker
                    className={classNames(
                      "ant-input ant-input-outlined",
                      designToken.hashId
                    )}
                    showSecond={false}
                    showNow={false}
                    format={"HH:mm"}
                    placeholder="انتخاب زمان"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form.Item>
        <Form.Item label="تصویر بنر" name="banner_uuid">
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
                  form.setFieldValue("banner_uuid", data.uuid);
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
                editor.setData(form.getFieldValue("long_description"));
                setEditorLoading(false);
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EventForm;
