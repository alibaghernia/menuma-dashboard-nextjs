import auth from "@/middleware";
import { Avatar, Flex, Layout } from "antd/lib";
import { Content } from "antd/lib/layout/layout";
import Link from "antd/lib/typography/Link";
import React from "react";
import Logout from "./[business]/components/user/logout";
import bg from "@/assets/images/login-bg.svg";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth();
  if (session?.user?.businesses?.length == 1) {
    const business = session?.user?.businesses[0];
    redirect(`/${business.uuid}`);
  }
  const businesses = session?.user?.businesses?.map((bus, idx) => {
    return (
      <Link key={idx} href={`/${bus.uuid}`}>
        <Flex
          align="center"
          className="py-2 px-[1rem] border rounded-[1rem] bg-white"
          gap="1rem"
        >
          <Avatar
            size={"large"}
            src={bus.logo_url}
            className="border-typography/[.5] w-[3rem] h-[3rem]"
          />
          <div className="text-[1rem] text-typography font-semibold">
            {bus.name}
          </div>
        </Flex>
      </Link>
    );
  });

  return (
    <Layout
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <Content className="relative">
        <Flex
          vertical
          className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
          gap="1.5rem"
        >
          <div className="text-[.9rem] text-typography text-center">
            لطفا کافه یا رستوران را انتخاب کنید.
          </div>
          <Flex vertical gap={"1rem"}>
            {businesses}
          </Flex>
          <Logout />
        </Flex>
      </Content>
    </Layout>
  );
};

export default Dashboard;
