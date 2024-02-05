"use client";
import { useCustomRouter } from "@/utils/hooks";
import { Button } from "antd/lib";
import { useParams } from "next/navigation";
import React from "react";

const NavigateToAddButton = () => {
  const router = useCustomRouter();
  const params = useParams();
  return (
    <Button
      ghost
      type="primary"
      onClick={() => router.push(`/${params.business}/menu/categories/add`)}
    >
      افزودن
    </Button>
  );
};

export default NavigateToAddButton;
