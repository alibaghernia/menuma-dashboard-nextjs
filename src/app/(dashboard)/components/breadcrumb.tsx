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
        case MENU_KEYS.menu_children.categories_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش دسته بندی",
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
        case MENU_KEYS.conditional_discounts: {
          breadcrumbsItems.push({
            title: linking("تخفیف های شرطی", "/conditional_discounts", idx),
          });
          break;
        }
        case MENU_KEYS.conditional_discounts_children.list: {
          breadcrumbsItems.push({
            title: linking("تخفیف های شرطی", "/conditional_discounts", idx),
          });
          break;
        }
        case MENU_KEYS.spaces: {
          breadcrumbsItems.push({
            title: "فضاها",
          });
          break;
        }
        case MENU_KEYS.spaces_children.halls: {
          breadcrumbsItems.push({
            title: linking("سالن ها", "/spaces/halls", idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.halls_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست سالن ها", "/spaces/halls", idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.halls_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن سالن", "/spaces/halls/add", idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables: {
          breadcrumbsItems.push({
            title: linking("میز ها", "/spaces/tables", idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست میز ها", "/spaces/tables", idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن میز", "/spaces/tables/add", idx),
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
        case MENU_KEYS.administrator.cafe_restaurants: {
          breadcrumbsItems.push({
            title: linking(
              "کافه و رستوران ها",
              "/administrator/cafe_restaurants",
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.cafe_restaurants_children.list: {
          breadcrumbsItems.push({
            title: linking(
              "لیست کافه و رستوران ها",
              "/administrator/cafe_restaurants",
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.cafe_restaurants_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن کافه یا رستوران",
              "/administrator/cafe_restaurants/add",
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.categories: {
          breadcrumbsItems.push({
            title: linking("دسته بندی ها", "/administrator/categories", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.categories_children.list: {
          breadcrumbsItems.push({
            title: linking(
              "لیست دسته بندی ها",
              "/administrator/categories",
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.categories_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن دسته بندی",
              "/administrator/categories/add",
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.items: {
          breadcrumbsItems.push({
            title: linking("آیتم ها", "/administrator/items", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.items_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست آیتم ها", "/administrator/items", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.items_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن آیتم", "/administrator/items/add", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.events: {
          breadcrumbsItems.push({
            title: linking("دورهمی ها", "/administrator/events", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.events_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست دورهمی ها", "/administrator/events", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.events_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن دورهمی", "/administrator/events/add", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.catalogs: {
          breadcrumbsItems.push({
            title: linking("کاتالوگ", "/administrator/catalogs", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.catalogs_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست کاتالوگ ها", "/administrator/catalogs", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.catalogs_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن کاتالوگ",
              "/administrator/catalogs/add",
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.users: {
          breadcrumbsItems.push({
            title: linking("کاربران", "/administrator/users", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.users_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست کاربران", "/administrator/users", idx),
          });
          break;
        }
        case MENU_KEYS.administrator.users_children.add: {
          breadcrumbsItems.push({
            title: linking("افزودن کاربر", "/administrator/users/add", idx),
          });
          break;
        }
        case MENU_KEYS.conditional_discounts_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن تحفیف شرطی",
              "/conditional_discounts/add",
              idx
            ),
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
