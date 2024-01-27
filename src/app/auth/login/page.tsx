import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import bg from "@/assets/images/login-bg.svg";
import { Logo } from "@/components/core/logo";
import {} from "antd/lib/icon";
import LoginForm from "./components/form.component";

export const metadata = {
  title: "ورود به پنل",
};

const LoginPage = () => {
  return (
    <Layout className="!min-h-screen">
      <Content
        className="!min-h-screen flex items-center justify-center bg-white"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <div className="pt-[4.2rem] px-[2.87rem] md:px-[4.87rem] w-[34.37rem] h-[30rem] flex flex-col md:bg-[#fcfcfc95] rounded-[1rem] md:border relative overflow-hidden">
          <span className="absolute inset-0 blur z-0"></span>
          <div className="z-10">
            <Logo className="mx-auto mb-[2.81rem] text-[3rem]" />
            <hr className="mb-[1.38rem]" />
            <LoginForm />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
