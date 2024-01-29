"use client";
import React, { FC, useMemo } from "react";
import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps } from "antd/lib";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useCurrentBreakpoints } from "@/utils/hooks";
import { MENU_KEYS } from "./contants";
import _ from "lodash";
import Link from "@/components/common/link/link";
const Breadcrumb: FC<{ selectedKeys: string[] }> = ({ selectedKeys }) => {
  const breakpoints = useCurrentBreakpoints();

  const breadcrumbs = useMemo(() => {
    const keys = _.clone(selectedKeys);
    const breadcrumbsItems: BreadcrumbProps["items"] = [];

    const linking = (title: string, href: string, key: number) => {
      if (key + 1 == keys.length) {
        return title;
      } else {
        return <Link href={href}>{title}</Link>;
      }
    };

    for (const [idx, key] of keys.entries()) {
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
            title: linking("دسته بندی ها", "/menu/categories", idx),
          });
          break;
        }
        case MENU_KEYS.menu_children.categories_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن دسته بندی", "/menu/categories/add", idx),
          });
          break;
        }
        case MENU_KEYS.customer_club_children.customers: {
          breadcrumbsItems.push({
            title: linking("مشتریان", "/customer_club/customers", idx),
          });
          break;
        }
        case MENU_KEYS.menu_children.categories_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست دسته بندی ها", "/menu/categories", idx),
          });
          break;
        }
        case MENU_KEYS.gatherings: {
          breadcrumbsItems.push({
            title: linking("دورهمی ها", "/events", idx),
          });
          break;
        }
        case MENU_KEYS.gatherings_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست دورهمی ها", "/events", idx),
          });
          break;
        }
        case MENU_KEYS.gatherings_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن دورهمی", "/events/add", idx),
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
            title: linking("پروفایل", "/settings/profile", idx),
          });
          break;
        }
        case MENU_KEYS.menu_children.items: {
          breadcrumbsItems.push({
            title: linking("آیتم ها", "/menu/items", idx),
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست آیتم ها", "/menu/items", idx),
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن آیتم", "/menu/items/add", idx),
          });
          break;
        }
        case MENU_KEYS.customer_club: {
          breadcrumbsItems.push({
            title: linking("باشگاه مشتریان", "/customer_club/customers", idx),
          });
          break;
        }
        case MENU_KEYS.customer_club_children.customers_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن مشتری", "/customer_club/customers/add", idx),
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
