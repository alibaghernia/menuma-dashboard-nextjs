"use client";
import TableActions from "@/components/common/_table/actions";
import { BusinessProviderContext } from "@/providers/business/provider";
import { BusinessService } from "@/services/administrator/business.service";
import { EventsService } from "@/services/administrator/events/events.service";
import { IGetFilters } from "@/services/administrator/events/types";
import { UsersService } from "@/services/administrator/users/users.service";
import {
  EventEntity,
  IGetItemsFilters,
} from "@/services/dashboard/events/types";
import { Product } from "@/services/file/types";
import {
  useCurrentBreakpoints,
  useCustomRouter,
  useLoadings,
  useMessage,
  useTailwindColor,
} from "@/utils/hooks";
import { renderTime } from "@/utils/tables";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Select, Table, TableProps } from "antd/lib";
import moment from "jalali-moment";
import _ from "lodash";
import { useParams } from "next/navigation";
import React, { FC, useContext, useEffect, useState } from "react";
export type ItemsTableType = FC<{
  search?: string;
}>;
const EventsTable: ItemsTableType = (props) => {
  const params = useParams();
  const message = useMessage();
  const [addL, removeL, hasL] = useLoadings();
  const [items, setItems] = useState<EventEntity[]>([]);
  const [orginizers, setOrginizers] = useState<
    { name: string; uuid: string }[]
  >([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>();
  const [selectedOrganizerType, setSelectedOrganizerType] = useState<string>();
  const router = useCustomRouter();
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const eventService = EventsService.init();
  const businessService = BusinessService.init();
  const userService = UsersService.init();

  const renderDateTime = (value: string) => {
    if (!value) return "";
    const time = moment(value).locale("fa").format("dddd DD jMMMM jYYYY HH:mm");
    return time;
  };

  const renderUser = (value: any) => {
    return [value.user?.first_name, value.user?.last_name]
      .filter(Boolean)
      .join(" ");
  };
  const renderBusiness = (value: any) => {
    return value.business?.name;
  };

  const columns: TableProps["columns"] = [
    {
      title: "عنوان",
      dataIndex: "title",
    },
    {
      title: "برگذار کننده",
      render: (_, value) => {
        if (value?.organizer_type == "BUSINESS") {
          return renderBusiness(value);
        } else if (value?.organizer_type == "USER") {
          return renderUser(value);
        }
      },
    },
    {
      title: "ظرفیت",
      dataIndex: "limit",
      responsive: ["md"],
    },
    {
      title: "تاریخ",
      dataIndex: "start_at",
      render: renderDateTime,
      responsive: ["md"],
    },
    {
      key: "actions",
      title: "عملیات",
      width: 100,
      render: (value, rec, idx) => {
        return (
          <TableActions
            value={value}
            record={rec}
            index={idx}
            onDelete={async () => {
              addL("delete-item-noall");
              eventService
                .delete(rec["uuid"])
                .finally(() => {
                  removeL("delete-item-noall");
                })
                .then(() => {
                  message.success("دورهمی مورد نظر با موفقیت حذف شد.");
                  fetchItems();
                })
                .catch(() => {
                  message.error("مشکلی در حذف دورهمی وجود دارد.");
                });
            }}
            onEdit={() => {
              router.push(`/administrator/events/${rec["uuid"]}`);
            }}
            seeAllExcludeFields={[
              "uuid",
              "banner_uuid",
              "organizer_uuid",
              "long_description",
              "pin",
              "deleted_at",
              "pin",
              "banner_url",
            ]}
            seeAllNames={{
              title: "نام",
              limit: "ظرفیت",
              start_at: "زمان شروع",
              end_at: "زمان پایان",
              short_description: "توضیحات مختصر",
              cycle: "نوع برگذاری",
              price: "هزینه",
              created_at: "زمان ساخت",
              updated_at: "آخرین بروزرسانی",
              business: "برگذار کننده",
              user: "برگذار کننده",
              organizer_type: "نوع برگذار کننده",
            }}
            seeAllRender={{
              start_at: renderDateTime,
              end_at: renderDateTime,
              created_at: renderTime,
              updated_at: renderTime,
              user: (_, value) => renderUser(value),
              business: (_, value) => renderBusiness(value),
              organizer_type: (value) =>
                value == "BUSINESS" ? "کافه/رستوران" : "کاربر",
            }}
            seeAll
          />
        );
      },
    },
  ];
  async function fetchItems(
    filters: IGetFilters = { page: currentPage, limit: pageSize }
  ) {
    try {
      addL("fetch-items-noall");
      const { data } = await eventService.getItems(filters);
      setTotal(data.total);
      setItems(data.items);
    } catch (error) {
      console.log({
        error,
      });
    }

    removeL("fetch-items-noall");
  }
  useEffect(() => {
    fetchItems({
      page: currentPage,
      limit: pageSize,
      title: props.search,
      organizer_type: selectedOrganizerType,
      organizer_uuid: selectedOrganizer,
    });
  }, [currentPage, pageSize, selectedOrganizer, selectedOrganizerType]);
  useEffect(
    _.debounce(() => {
      fetchItems({
        page: currentPage,
        limit: pageSize,
        title: props.search,
        organizer_type: selectedOrganizerType,
        organizer_uuid: selectedOrganizer,
      });
    }, 500),
    [props.search]
  );
  async function fetchOrganizer(orginizer_type: string) {
    addL("load-organizer-noall");
    try {
      if (orginizer_type == "BUSINESS") {
        const {
          data: { businesses },
        } = await businessService.getAll();
        setOrginizers(
          businesses.map((bus) => ({ name: bus.name, uuid: bus.uuid }))
        );
      } else if (orginizer_type == "USER") {
        const {
          data: { users },
        } = await userService.getAll();
        setOrginizers(
          users.map((user) => ({
            name: [user.first_name, user.last_name].join(" "),
            uuid: user.uuid,
          }))
        );
      }
    } catch (error) {
      message.error("مشکلی در بارگذاری داده ها وجود دارد");
    }
    removeL("load-organizer-noall");
  }

  useEffect(() => {
    setSelectedOrganizer(undefined);
    if (selectedOrganizerType) {
      fetchOrganizer(selectedOrganizerType);
    }
  }, [selectedOrganizerType]);

  const tablePaginationOnChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
  };
  return (
    <Flex vertical gap={"1rem"} className="w-full">
      <Row className="gap-[1rem]">
        <Col xs={24} lg={6}>
          <Select
            className="w-full"
            placeholder="نوع برگذار کننده"
            allowClear
            options={[
              {
                label: "کافه/رستوران",
                value: "BUSINESS",
              },
              {
                label: "کاربر",
                value: "USER",
              },
            ]}
            value={selectedOrganizerType}
            onChange={setSelectedOrganizerType}
          />
        </Col>
        <Col xs={24} lg={6}>
          <Select
            className="w-full"
            placeholder="برگذار کننده"
            allowClear
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={orginizers.map((item) => ({
              label: item.name,
              value: item.uuid,
            }))}
            loading={hasL("load-organizer-noall")}
            value={selectedOrganizer}
            onChange={setSelectedOrganizer}
          />
        </Col>
      </Row>
      <Row>
        <Table
          className="w-full rounded-[1rem] overflow-hidden"
          loading={hasL("fetch-items-noall", "delete-item-noall")}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            onChange: tablePaginationOnChange,
          }}
          dataSource={items}
        />
      </Row>
    </Flex>
  );
};

export default EventsTable;
