"use client";
import { logOut } from "@/app/(dashboard)/components/user/actions";
import { LOADINGS } from "@/providers/general/constants";
import { UsersService } from "@/services/users.service";
import { useLoadings, useCustomRouter, useMessage } from "@/utils/hooks";
import { InboxOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Upload,
  UploadFile,
  theme,
} from "antd/lib";
import React, { useEffect, useState } from "react";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/layouts/mobile.css";

const ProfileForm = () => {
  const [password, setPassword] = useState<string>();
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const router = useCustomRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [date, setDate] = useState<DateObject | DateObject[] | null>();
  const [editorLoading, setEditorLoading] = useState(true);

  const usersService = UsersService.init();

  function fetch() {
    addL("get-me");
    usersService
      .getMe()
      .finally(() => {
        removeL("get-me");
      })
      .then((data) => {
        form.setFieldsValue({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          mobile: data.data.mobile,
        });
      })
      .catch(() => {
        message.error("مشکلی در دریافت اطلاعات وجود دارد.");
      });
  }

  useEffect(() => {
    fetch();
  }, []);

  function formFinishHandler(values: any) {
    const { confirm, mobile, ...payload } = values;
    addL("save-noall");
    usersService
      .updateProfile(payload)
      .finally(() => {
        removeL("save-noall");
      })
      .then(() => {
        message.success("پروفایل شما با موفقیت بروز شد");
        if (!!password) {
          message.info("در حال خروج از پنل...", 2);
          addL(LOADINGS.page);
          logOut();
        }
      })
      .catch(() => {
        message.error("خطایی در بروزرسانی پروفایل رخ داد.");
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
              name="first_name"
              label="نام"
              rules={[
                {
                  required: true,
                  message: "نام اجباری است",
                },
              ]}
            >
              <Input placeholder="نام..." />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="last_name" label="نام خانوادگی">
              <Input placeholder="نام خانوادگی..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item name="mobile" label="شماره موبایل">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="password"
              label="کلمه عبور"
              extra="در صورتی که مایل به تغییر کلمه عبور نیستید این قسمت را خالی بگذارید."
            >
              <Input.Password
                placeholder="کلمه عبور..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="confirm"
              label="تأیید کلمه عبور"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: !!password,
                  message: "لطفا کلمه عبور خود را تأیید کنید!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("کلمه عبور های وارد شده یکسان نیستند!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item label="آواتار" name="picture">
          <Upload.Dragger
            name="avatar"
            listType="picture-circle"
            multiple={false}
            showUploadList
            accept=".png,.jpg,.jpeg"
            onChange={(info) => {
              setFileList(info.fileList);
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
        </Form.Item> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={!!hasL("save-noall")}
          >
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileForm;
