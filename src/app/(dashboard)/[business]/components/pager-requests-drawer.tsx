"use client";
import BellRingOutlinedIcon from "@/icons/bell-ring-outlined";
import { GeneralProviderContext } from "@/providers/general/provider";
import { Request } from "@/services/dashboard/pager/types";
import {
  useCurrentBreakpoints,
  useLoadings,
  useMessage,
  useNotification,
  useTailwindColor,
} from "@/utils/hooks";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Flex,
  Row,
  Space,
  Typography,
} from "antd/lib";
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import moment, { Moment } from "jalali-moment";
import { BusinessProviderContext } from "@/providers/business/provider";
import ConfirmModal from "@/components/common/confirm_modal/confirm_modal";
import axios from "@/lib/axios";
import { Howl } from "howler";

export type PagerRequest = Request;
interface IPagerRequestsDrawer extends DrawerProps {
  setRequestPagersDrawerOpen: (status: boolean) => void;
  setRequestsCount: (count: number) => void;
}

const RequestItem: FC<{ request: Request }> = ({ request }) => {
  const [addL, removeL, hasL] = useLoadings();
  const message = useMessage();
  const [requestTime, setRequestTime] = useState<string>();
  const [updatetTime, setUpdateTime] = useState<string>();
  const { businessService } = useContext(BusinessProviderContext);
  const [cancelConfirmModal, setCancelConfirmModal] = useState(false);

  const typographyColor = useTailwindColor("typography");

  useEffect(() => {
    const getFormat = (time: Moment) => {
      return `${time.format("HH:mm")} (${time.fromNow()})`;
    };
    const time = moment(request.createdAt).locale("fa");
    setRequestTime(getFormat(time));
    const interval1 = setInterval(() => {
      setRequestTime(getFormat(time));
    }, 2000);
    const updateTime = moment(request.updatedAt).locale("fa");
    setUpdateTime(getFormat(updateTime));
    const interval2 = setInterval(() => {
      setUpdateTime(getFormat(updateTime));
    }, 2000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  const loadingKey = useMemo(() => `${request.uuid}-noall`, []);
  const cancelLoadingKey = useMemo(() => `${request.uuid}-cancel-noall`, []);
  const handlePagerRequestSubmit = () => {
    addL(loadingKey);
    businessService.pagerService
      .update(request.uuid, {
        status: request.status == "DOING" ? "DONE" : "DOING",
      })
      .finally(() => {
        removeL(loadingKey);
      })
      .catch(() => {
        message.error("مشکلی در انجام عملیات رخ داد!");
      });
  };
  const handleCancelRequest = () => {
    setCancelConfirmModal(false);
    addL(cancelLoadingKey);
    businessService.pagerService
      .update(request.uuid, { status: "CANCELED" })
      .finally(() => {
        removeL(cancelLoadingKey);
      })
      .catch(() => {
        message.error("مشکلی در انجام عملیات رخ داد!");
      });
  };
  return (
    <>
      <Flex vertical gap={8} className="py-2 px-4 border rounded-[.5rem]">
        <Row gutter={8}>
          <Col>
            <BellRingOutlinedIcon
              color={typographyColor}
              width={24}
              height={24}
            />
          </Col>
          <Col className="grow">
            <Flex vertical>
              <Row className="text-[1rem] text-typography">
                میز: {request.table.code}
              </Row>
            </Flex>
          </Col>
          <Col>
            <Button
              ghost
              type="primary"
              onClick={handlePagerRequestSubmit}
              loading={!!hasL(loadingKey)}
            >
              {!hasL(loadingKey) && (
                <Flex gap={4} align="center">
                  {request.status != "TODO" && (
                    <div className="text-primary text-[.8rem] font-semibold">
                      انجام شد
                    </div>
                  )}
                  <CheckOutlined />
                </Flex>
              )}
            </Button>
          </Col>
          <Col>
            <Button
              ghost
              danger
              type="primary"
              onClick={() => setCancelConfirmModal(true)}
              loading={!!hasL(cancelLoadingKey)}
            >
              {!hasL(cancelLoadingKey) && (
                <Flex gap={4} align="center">
                  <div className="text-red-500 text-[.8rem] font-semibold">
                    لغو
                  </div>
                  <CloseOutlined />
                </Flex>
              )}
            </Button>
          </Col>
        </Row>
        <Flex gap={8} justify="start" align="middle">
          <div className="text-typography text-[.8rem] w-fit">
            زمان درخواست:
          </div>
          <div className="text-[.8rem] text-primary w-fit font-bold">
            {requestTime}
          </div>
        </Flex>
        {request.createdAt != request.updatedAt && (
          <Flex gap={8} justify="start" align="middle">
            <div className="text-typography text-[.8rem] w-fit">
              آخرین بروزرسانی:
            </div>
            <div className="text-[.8rem] text-primary w-fit font-bold">
              {updatetTime}
            </div>
          </Flex>
        )}
      </Flex>
      {cancelConfirmModal && (
        <ConfirmModal
          open
          title="لغو درخواست"
          dangerConfirm
          confirmText="لغو کن"
          onClose={() => setCancelConfirmModal(false)}
          onConfirm={handleCancelRequest}
        >
          <div className="text-center text-typography text-[.9rem]">
            آیا از لغو این درخواست اطمینان دارید؟
          </div>
        </ConfirmModal>
      )}
    </>
  );
};
const PagerRequestsDrawer: FC<IPagerRequestsDrawer> = ({ ...props }) => {
  const breakpoints = useCurrentBreakpoints();
  const typographyColor = useTailwindColor("typography");
  const [requests, setRequests] = useState<Request[]>([]);
  const { businessService, business } = useContext(BusinessProviderContext);
  const [addL, remvoeL, hasL] = useLoadings();
  const message = useMessage();
  const notification = useNotification();

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
    props.setRequestsCount(
      requests.filter((req) => req.status == "TODO").length
    );
  }, [requests]);

  useEffect(() => {
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
      props.setRequestPagersDrawerOpen(true);
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

    return () => {
      socketConnection.off("new-request", newRequestHandler);
      socketConnection.off("cancel-request", cancelRequestHandler);
      socketConnection.off("update-requests", fetchPagerRequests.bind(this));
    };
  }, []);

  const pendings = useMemo(() => {
    return requests
      .filter((req) => req.status == "TODO")
      .map((req, idx) => <RequestItem request={req} key={idx} />);
  }, [requests]);
  const doing = useMemo(() => {
    return requests
      .filter((req) => req.status == "DOING")
      .map((req, idx) => <RequestItem request={req} key={idx} />);
  }, [requests]);

  return (
    <Drawer
      title="درخواست های پیجر"
      placement={"left"}
      closable
      onClose={props.onClose}
      open={props.open}
      width={breakpoints.isXs ? "100vw" : "25rem"}
    >
      <Flex vertical gap={16}>
        <div>
          <Typography.Text className="text-[1rem]">در انتظار</Typography.Text>
          <Divider className="my-[.5rem]" />
          <Flex vertical gap={8}>
            {pendings}
          </Flex>
        </div>
        {!!doing.length && (
          <div>
            <Typography.Text className="text-[1rem]">
              در حال انجام
            </Typography.Text>
            <Divider className="my-[.5rem]" />
            <Flex vertical gap={8}>
              {doing}
            </Flex>
          </div>
        )}
      </Flex>
    </Drawer>
  );
};

export default PagerRequestsDrawer;
