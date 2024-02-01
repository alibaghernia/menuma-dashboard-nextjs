"use client";
import BellRingOutlinedIcon from "@/icons/bell-ring-outlined";
import { GeneralProviderContext } from "@/providers/general/provider";
import { Request } from "@/services/dashboard/pager/types";
import {
  useCurrentBreakpoints,
  useLoadings,
  useMessage,
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

export type PagerRequest = Request;
interface IPagerRequestsDrawer extends DrawerProps {
  requests: PagerRequest[];
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
  const [loadings, setLoadings] = useState<PagerRequest["uuid"][]>([]);

  const pendings = useMemo(() => {
    return props.requests
      .filter((req) => req.status == "TODO")
      .map((req, idx) => <RequestItem request={req} key={idx} />);
  }, [props.requests, loadings]);
  const doing = useMemo(() => {
    return props.requests
      .filter((req) => req.status == "DOING")
      .map((req, idx) => <RequestItem request={req} key={idx} />);
  }, [props.requests, loadings]);

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
