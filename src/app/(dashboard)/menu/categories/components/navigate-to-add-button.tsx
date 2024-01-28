"use client";
import { useCustomRouter } from "@/utils/hooks";
import { Button } from "antd/lib";
import React from "react";

const NavigateToAddButton = () => {
  const router = useCustomRouter();
  return (
    <Button
      ghost
      type="primary"
      onClick={() => router.push("/menu/categories/add")}
    >
      افزودن
    </Button>
  );
};

export default NavigateToAddButton;
