import { Card, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import bg from "@/assets/images/login-bg.svg";
import { Logo } from "@/components/core/logo";

export const metadata = {
  title: "ورود به پنل",
};

const LoginPage = () => {
  return (
    <Layout className="!min-h-screen">
      <Content
        className="!min-h-screen"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <div className="pt-[4.2rem] px-[4.81rem]">
          <Logo className="mx-auto" />
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
