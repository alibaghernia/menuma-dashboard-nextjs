"use client";
import { Button } from "antd";
import React from "react";
import { logOut } from "./actions";
import { useLoadings } from "@/utils/hooks";
import { LOADINGS } from "@/providers/general/constants";

const Logout = () => {
  const [addL] = useLoadings();
  return (
    <form
      action={async () => {
        addL(LOADINGS.page);
        await logOut();
      }}
    >
      <Button htmlType="submit" block ghost danger type="primary">
        خروج
      </Button>
    </form>
  );
};

export default Logout;
