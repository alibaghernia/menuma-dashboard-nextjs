"use client";
import React, { FC, useMemo } from "react";
import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps } from "antd/lib";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { useCurrentBreakpoints } from "@/utils/hooks";
import { MENU_KEYS } from "./contants";
import _ from "lodash";
import Link from "@/components/common/link/link";
import { useParams } from "next/navigation";
const Breadcrumb: FC<{ selectedKeys: string[] }> = ({ selectedKeys }) => {
  const params = useParams();
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
            title: linking(
              "دسته بندی ها",
              `/${params.business}/menu/categories`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.menu_children.categories_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن دسته بندی",
              `/${params.business}/menu/categories/add`,
              idx
            ),
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
            title: linking(
              "مشتریان",
              `/${params.business}/customer_club/customers`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.menu_children.categories_children.list: {
          breadcrumbsItems.push({
            title: linking(
              "لیست دسته بندی ها",
              `/${params.business}/menu/categories`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.gatherings: {
          breadcrumbsItems.push({
            title: linking("دورهمی ها", `/${params.business}/events`, idx),
          });
          break;
        }
        case MENU_KEYS.gatherings_children.list: {
          breadcrumbsItems.push({
            title: linking("لیست دورهمی ها", `/${params.business}/events`, idx),
          });
          break;
        }
        case MENU_KEYS.gatherings_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن دورهمی",
              `/${params.business}/events/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.gatherings_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش دورهمی",
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
            title: linking(
              "پروفایل",
              `/${params.business}/settings/profile`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.menu_children.items: {
          breadcrumbsItems.push({
            title: linking("آیتم ها", `/${params.business}/menu/items`, idx),
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.list: {
          breadcrumbsItems.push({
            title: linking(
              "لیست آیتم ها",
              `/${params.business}/menu/items`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن آیتم",
              `/${params.business}/menu/items/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.menu_children.items_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش آیتم",
          });
          break;
        }
        case MENU_KEYS.customer_club: {
          breadcrumbsItems.push({
            title: linking(
              "باشگاه مشتریان",
              `/${params.business}/customer_club/customers`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.customer_club_children.customers_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن مشتری",
              `/${params.business}/customer_club/customers/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.customer_club_children.customers_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش مشتری",
          });
          break;
        }
        case MENU_KEYS.qrCode: {
          breadcrumbsItems.push({
            title: linking("کیو آر کد ها", `/${params.business}/qr-codes`, idx),
          });
          break;
        }
        case MENU_KEYS.qrCode_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن کیو آر کد",
              `/${params.business}/qr-codes/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.qrCode_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش کیو آر کد",
          });
          break;
        }
        case MENU_KEYS.discounts: {
          breadcrumbsItems.push({
            title: "تخفیف ها",
          });
          break;
        }
        case MENU_KEYS.discounts_children.conditional: {
          breadcrumbsItems.push({
            title: linking(
              "تخفیف های شرطی",
              `/${params.business}/discounts/conditional`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.discounts_children.conditional_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن تخفیف شرطی",
              `/${params.business}/discounts/conditional/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.discounts_children.conditional_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش تخفیف شرطی",
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
            title: linking("سالن ها", `/${params.business}/spaces/halls`, idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.halls_children.list: {
          breadcrumbsItems.push({
            title: linking(
              "لیست سالن ها",
              `/${params.business}/spaces/halls`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.spaces_children.halls_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن سالن",
              `/${params.business}/spaces/halls/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.spaces_children.halls_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش سالن",
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables: {
          breadcrumbsItems.push({
            title: linking("میز ها", `/${params.business}/spaces/tables`, idx),
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables_children.list: {
          breadcrumbsItems.push({
            title: linking(
              "لیست میز ها",
              `/${params.business}/spaces/tables`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables_children.add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن میز",
              `/${params.business}/spaces/tables/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.spaces_children.tables_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش میز",
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
            title: linking(
              "پروفایل",
              `/${params.business}/settings/profile`,
              idx
            ),
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
        case MENU_KEYS.administrator.cafe_restaurants_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش کافه یا رستوران",
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
        case MENU_KEYS.administrator.categories_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش دسته بندی",
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
        case MENU_KEYS.administrator.items_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش آیتم",
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
        case MENU_KEYS.administrator.events_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش دورهمی",
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
        case MENU_KEYS.administrator.catalogs_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش کاتالوگ",
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
        case MENU_KEYS.administrator.users_children.edit: {
          breadcrumbsItems.push({
            title: "ویرایش کاربر",
          });
          break;
        }
        case MENU_KEYS.administrator.discounts: {
          breadcrumbsItems.push({
            title: "تخفیف ها",
          });
          break;
        }
        case MENU_KEYS.administrator.discounts_children.conditional: {
          breadcrumbsItems.push({
            title: linking(
              "تخفیف های شرطی",
              `/administrator/discounts/conditional`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.discounts_children.conditional_children
          .add: {
          breadcrumbsItems.push({
            title: linking(
              "افزودن تخفیف شرطی",
              `/administrator/discounts/conditional/add`,
              idx
            ),
          });
          break;
        }
        case MENU_KEYS.administrator.discounts_children.conditional_children
          .edit: {
          breadcrumbsItems.push({
            title: "ویرایش تخفیف شرطی",
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
