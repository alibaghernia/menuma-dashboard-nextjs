import { Button } from "antd";
import React from "react";
import { logOut } from "./actions";

const Logout = () => {
  return (
    <form action={logOut}>
      <Button htmlType="submit" block ghost danger type="primary">
        خروج
      </Button>
    </form>
  );
};

export default Logout;
