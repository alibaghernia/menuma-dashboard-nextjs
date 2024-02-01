"use client";
import { Logo } from "@/components/core/logo";
import MenuBarsIcon from "@/icons/menu-bars";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useNotification,
  useTailwindColor,
} from "@/utils/hooks";
import { Badge, Col, Flex, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import classNames from "classnames";
import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { BellOutlined, LoadingOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import type { MenuProps } from "antd";
import DashboardOutlinedIcon from "@/icons/dashboard-outlined";
import ArrowCollapseRightIcon from "@/icons/arrow-collapse-right";
import { Content } from "antd/lib/layout/layout";
import PicRightOutlinedIcon from "@/icons/pic-right-outlined";
import _ from "lodash";
import PeopleOutlinedIcon from "@/icons/people-outlined";
import HandshakeOutlined from "@/icons/handshake-outlined";
import SpacesOutlined from "@/icons/spaces-outlined";
import GearOutlined from "@/icons/gear-outlined";
import { usePathname } from "next/navigation";
import { MENU_KEYS } from "./contants";
import { setMenuKeys } from "./helpers";
import Breadcrumb from "./breadcrumb";
import DiscountOutlined from "@/icons/discount-outlined";
import Link from "@/components/common/link/link";
import PagerRequestsDrawer from "./pager-requests-drawer";
import User from "./user/user";
import { Session } from "next-auth";
import { BusinessProviderContext } from "@/providers/business/provider";
import { Request } from "@/services/dashboard/pager/types";
import { Howl } from "howler";
import axios from "@/lib/axios";

const PanelTemplate: FC<
  PropsWithChildren<{ administrator?: boolean; session: Session }>
> = ({ children, administrator, session }) => {
  const [addL, remvoeL, hasL] = useLoadings();
  const message = useMessage();
  const notification = useNotification();
  const [requests, setRequests] = useState<Request[]>([]);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const breakpoints = useCurrentBreakpoints();
  const typographyColor = useTailwindColor("typography");
  const primaryColor = useTailwindColor("primary");
  const router = useCustomRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["dashboard"]);
  const pathname = usePathname();
  const [requestPagersDrawerOpen, setRequestPagersDrawerOpen] = useState(false);
  const { businessService, business } = useContext(BusinessProviderContext);

  useEffect(() => {
    setMenuKeys({ pathname, setSelectedKeys });
  }, [pathname]);

  const sideMenuItems = useMemo<MenuProps["items"]>(() => {
    const iconColor = (id: string) =>
      selectedKeys.some((key) => key == id) ? primaryColor : typographyColor;
    const items: MenuProps["items"] = [
      {
        key: MENU_KEYS.dashboard,
        label: (
          <Link href={administrator ? "/administrator" : "/"}>داشبورد</Link>
        ),
        icon: (
          <DashboardOutlinedIcon
            className="ml-1"
            color={iconColor(MENU_KEYS.dashboard)}
          />
        ),
      },
    ];
    if (administrator)
      return items.concat([
        {
          type: "group",
          label: <div className="text-[.8rem]">کافه و رستوران</div>,
        },
        {
          key: MENU_KEYS.administrator.cafe_restaurants,
          label: (
            <Link href="/administrator/cafe_restaurants">
              کافه و رستوران ها
            </Link>
          ),
        },
        {
          key: MENU_KEYS.administrator.categories,
          label: <Link href="/administrator/categories">دسته بندی ها</Link>,
        },
        {
          key: MENU_KEYS.administrator.items,
          label: <Link href="/administrator/items">آیتم ها</Link>,
        },
        {
          key: MENU_KEYS.administrator.events,
          label: <Link href="/administrator/events">دورهمی ها</Link>,
        },
        {
          type: "group",
          label: <div className="text-[.8rem]">پلتفرم</div>,
        },
        {
          key: MENU_KEYS.administrator.catalogs,
          label: <Link href="/administrator/catalogs">کاتالوگ</Link>,
        },
        {
          key: MENU_KEYS.administrator.users,
          label: <Link href="/administrator/users">کاربران</Link>,
        },
      ]);
    else
      return items.concat([
        {
          key: MENU_KEYS.conditional_discounts,
          icon: (
            <DiscountOutlined
              className="ml-1"
              color={iconColor(MENU_KEYS.conditional_discounts)}
            />
          ),
          label: "تخفیف های شرطی",
          onClick: () => router.push("/conditional_discounts"),
        },
        {
          key: MENU_KEYS.gatherings,
          onClick: () => router.push("/events"),
          icon: (
            <HandshakeOutlined
              className="ml-1"
              color={iconColor(MENU_KEYS.gatherings)}
            />
          ),
          label: "دورهمی ها",
        },
        {
          key: MENU_KEYS.menu,
          label: "منو",
          icon: (
            <PicRightOutlinedIcon
              className="ml-1"
              color={iconColor(MENU_KEYS.menu)}
            />
          ),
          children: [
            {
              key: MENU_KEYS.menu_children.categories,
              label: "دسته بندی ها",
              onClick: () => router.push("/menu/categories"),
            },
            {
              key: MENU_KEYS.menu_children.items,
              label: "آیتم ها",
              onClick: () => router.push("/menu/items"),
            },
          ],
        },
        {
          key: MENU_KEYS.customer_club,
          icon: (
            <PeopleOutlinedIcon
              className="ml-1"
              color={iconColor(MENU_KEYS.customer_club)}
            />
          ),
          label: "باشگاه مشتریان",
          children: [
            {
              key: MENU_KEYS.customer_club_children.customers,
              label: "مشتریان",
              onClick: () => router.push("/customer_club/customers"),
            },
          ],
        },
        {
          key: MENU_KEYS.spaces,
          icon: (
            <SpacesOutlined
              className="ml-1"
              color={iconColor(MENU_KEYS.spaces)}
            />
          ),
          label: "فضا ها",
          children: [
            {
              key: MENU_KEYS.spaces_children.halls,
              label: <Link href="/spaces/halls">سالن ها</Link>,
            },
            {
              key: MENU_KEYS.spaces_children.tables,
              label: <Link href="/spaces/tables">میز ها</Link>,
            },
          ],
        },
        {
          key: MENU_KEYS.settings,
          icon: (
            <GearOutlined
              className="ml-1"
              color={iconColor(MENU_KEYS.settings)}
            />
          ),
          label: "تنظیمات",
          children: [
            {
              key: MENU_KEYS.settings_children.profile,
              label: <Link href="/settings/profile">پروفایل</Link>,
            },
          ],
        },
      ]);
  }, [selectedKeys]);

  function fetchPagerRequests() {
    addL("load-pager-requests-noall");
    businessService.pagerService
      .getItems({
        status: ["DOING", "TODO"],
      })
      .finally(() => {
        remvoeL("load-pager-requests-noall");
      })
      .then((data) => {
        setRequests(data.data.requests);
      })
      .catch(() => {
        message.error("دریافت اطلاعات پیجر با مشکل مواجه شد.");
      });
  }

  useEffect(() => {
    if (!administrator) {
      const notifiationSound = new Howl({
        src: "/sounds/notification_sound.mp3",
        preload: true,
      }).load();
      const newRequestHandler = (request: Request) => {
        try {
          notifiationSound.play();
        } catch (error) {}
        navigator.vibrate([500, 100, 500]);
        setRequests((requests) => requests.concat(request));
        notification.warning({
          message: "درخواست پیجر دریافت شد",
          placement: "topRight",
        });
        setRequestPagersDrawerOpen(true);
      };
      const cancelRequestHandler = (request_id: Request["uuid"]) => {
        setRequests((requests) =>
          requests.filter((req) => req.uuid != request_id)
        );
      };
      fetchPagerRequests();
      const socketConnection = businessService.pagerService.socket.connect(
        business.uuid
      );
      socketConnection.on("new-request", newRequestHandler);
      socketConnection.on("cancel-request", cancelRequestHandler);
      socketConnection.on("update-requests", fetchPagerRequests.bind(this));

      // push notifications
      navigator?.serviceWorker?.getRegistration().then(async (register) => {
        const publicKey = process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_PUBLIC_KEY;
        if (!publicKey) {
          console.error("Check push notification public key!");
          process.exit(1);
        }
        const subscription = await register?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: publicKey,
        });

        await axios.post(
          `/panel/business/${business.uuid}/web-push/subscribe`,
          JSON.stringify(subscription)
        );
      });

      return () => {
        socketConnection.off("new-request", newRequestHandler);
        socketConnection.off("cancel-request", cancelRequestHandler);
        socketConnection.off("update-requests", fetchPagerRequests.bind(this));
      };
    }
  }, []);

  return (
    <>
      <Layout>
        <Header
          className={twMerge(
            classNames(
              "bg-white shadow-[0_-2px_8px_0_rgba(0,0,0,.2)] sticky z-20 top-0",
              {
                "px-[1.5rem]": breakpoints.isXs,
              }
            )
          )}
        >
          <Flex justify="space-between" align="center">
            <Col>
              <Flex align="center" gap={"0.63rem"}>
                <Col hidden={breakpoints.isSm}>
                  {!siderCollapsed && breakpoints.isXs ? (
                    <ArrowCollapseRightIcon
                      color={typographyColor}
                      onClick={() => setSiderCollapsed(!siderCollapsed)}
                    />
                  ) : (
                    <MenuBarsIcon
                      color={typographyColor}
                      onClick={() => setSiderCollapsed(!siderCollapsed)}
                    />
                  )}
                </Col>
                <Col>
                  <Flex align="center" gap={16}>
                    <Logo
                      className="text-[2rem]"
                      href={administrator ? "/administrator" : "/"}
                    />
                    {administrator && (
                      <div className="text-typography/[.8]">(مدیریت)</div>
                    )}
                  </Flex>
                </Col>
              </Flex>
            </Col>
            <Col>
              <Flex align="center" gap={"1rem"}>
                {!administrator && (
                  <Col>
                    {!!hasL("load-pager-requests-noall") ? (
                      <LoadingOutlined
                        color={typographyColor}
                        onClick={() => setRequestPagersDrawerOpen(true)}
                        size={24}
                      />
                    ) : (
                      <Badge
                        className=""
                        count={
                          requests.filter((req) => req.status == "TODO").length
                        }
                      >
                        <BellOutlined
                          color={typographyColor}
                          onClick={() => setRequestPagersDrawerOpen(true)}
                          size={24}
                        />
                      </Badge>
                    )}
                  </Col>
                )}
                <Col>
                  <User />
                </Col>
              </Flex>
            </Col>
          </Flex>
        </Header>
        <Layout className="min-h-[calc(100vh-64px)]">
          <span
            onClick={() => setSiderCollapsed(true)}
            className={twMerge(
              classNames(
                "z-10 fixed inset-0 bg-black/[.1] pointer-events-none opacity-0 transition-opacity duration-[.3s]",
                {
                  "pointer-events-auto opacity-1":
                    breakpoints.isXs && !siderCollapsed,
                }
              )
            )}
          />

          <Sider
            width={"13rem"}
            className={twMerge(
              classNames(
                "bg-white fixed h-full shadow-[0_8px_8px_0_rgba(0,0,0,.1)] z-30",
                {
                  "transition-all duration-[.1s] right-0": breakpoints.isXs,
                  "right-[-100%]": siderCollapsed && breakpoints.isXs,
                }
              )
            )}
            trigger={null}
          >
            <Menu
              key={selectedKeys.toString()}
              mode="inline"
              items={sideMenuItems}
              selectedKeys={selectedKeys}
              defaultOpenKeys={selectedKeys}
              onSelect={(info) => {
                setSiderCollapsed(true);
                setSelectedKeys(info.keyPath.reverse());
              }}
            />
          </Sider>
          <Layout
            className={twMerge(
              classNames("transition duration-[.3s] p-[1.5rem] sm:p-[2.5rem]", {
                "mr-[13rem]": breakpoints.isSm,
              })
            )}
          >
            <Breadcrumb selectedKeys={selectedKeys} />
            <Content className="mt-[1.5rem]">{children}</Content>
          </Layout>
        </Layout>
      </Layout>
      {!administrator && (
        <PagerRequestsDrawer
          requests={requests}
          open={requestPagersDrawerOpen}
          onClose={() => setRequestPagersDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default PanelTemplate;
