"use client";
import React, { FC, useMemo } from "react";
import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps } from "antd/lib";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useCurrentBreakpoints } from "@/utils/hooks";
import { MENU_KEYS } from "./contants";
import _ from "lodash";
const Breadcrumb: FC<{ selectedKeys: string[] }> = ({ selectedKeys }) => {
  const breakpoints = useCurrentBreakpoints();

  const breadcrumbs = useMemo(() => {
    const keys = _.clone(selectedKeys);
    const breadcrumbsItems: BreadcrumbProps["items"] = [];
    for (const key of keys) {
      switch (key) {
        case MENU_KEYS.dashboard: {
          breadcrumbsItems.push({
            title: "داشبورد",
          });
          break;
        }
        case MENU_KEYS.menu: {
          breadcrumbsItems.push({
            title: "منو",
          });
          break;
        }
        case MENU_KEYS.menu_children.categories: {
          breadcrumbsItems.push({
            title: "دسته بندی ها",
          });
          break;
        }
        case MENU_KEYS.customer_club: {
          breadcrumbsItems.push({
            title: "باشگاه مشتریان",
          });
          break;
        }
        case MENU_KEYS.customer_club_children.customers: {
          breadcrumbsItems.push({
            title: "مشتریان",
          });
          break;
        }
        case MENU_KEYS.menu_children.categories_children.add: {
          breadcrumbsItems.push({
            title: "افزودن دسته بندی",
          });
          break;
        }
        case MENU_KEYS.menu_children.categories_children.list: {
          breadcrumbsItems.push({
            title: "لیست دسته بندی ها",
          });
          break;
        }
        case MENU_KEYS.gatherings: {
          breadcrumbsItems.push({
            title: "دورهمی ها",
          });
          break;
        }
        case MENU_KEYS.gatherings_children.list: {
          breadcrumbsItems.push({
            title: "لیست دورهمی ها",
          });
          break;
        }
        case MENU_KEYS.spaces: {
          breadcrumbsItems.push({
            title: "فضا ها",
          });
          break;
        }
        case MENU_KEYS.spaces_children.list: {
          breadcrumbsItems.push({
            title: "لیست فضا ها",
          });
          break;
        }
        case MENU_KEYS.settings: {
          breadcrumbsItems.push({
            title: "تنظیمات",
          });
          break;
        }
        case MENU_KEYS.settings_children.profile: {
          breadcrumbsItems.push({
            title: "پروفایل",
          });
          break;
        }
        case MENU_KEYS.menu_children.items: {
          breadcrumbsItems.push({
            title: "آیتم ها",
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.list: {
          breadcrumbsItems.push({
            title: "لیست آیتم ها",
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.add: {
          breadcrumbsItems.push({
            title: "افزودن آیتم",
          });
          break;
        }
      }
    }
    return breadcrumbsItems;
  }, [selectedKeys]);

  return (
    <AntdBreadcrumb
      className={twMerge(
        classNames({
          "text-[.7rem]": breakpoints.isXs,
        })
      )}
      items={breadcrumbs}
    />
  );
};

export default Breadcrumb;
