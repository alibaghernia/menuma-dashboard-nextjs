"use client";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { IDataViewProps } from "./types";
import {
  Badge,
  Button,
  Checkbox,
  Flex,
  Modal,
  Popover,
  Table,
  TableProps,
} from "antd/lib";
import FilterFilledIcon from "@ant-design/icons/FilterFilled";
import { BarsOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/lib/table";
import Search from "antd/lib/input/Search";
import type { SortableContainerProps, SortEnd } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";

// drag sorting handlers
const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));
const SortableItem = SortableElement(
  (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
);
const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />
);

function DataView<T extends {}>(props: IDataViewProps<T>) {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, boolean>>(
    Object.fromEntries(
      (props.filters?.items || [])
        .filter((filter) => filter.intialValue)
        .map((filter) => [filter.name, true])
    )
  );
  const [columns, setColumns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const columns: any = {};
    for (const column of props.options.columns || []) {
      columns[column.dataIndex ? column.dataIndex : column.key] =
        column.key == "actions" ||
        (props.columns ? props.columns?.includes(column.dataIndex) : true);
    }
    setColumns(columns);
  }, [props.columns?.length]);
  useEffect(() => {
    props.onChange({
      filters,
      search,
    });
  }, [filters]);

  const renderColumnsItems = useMemo(
    () =>
      Object.entries(columns).map(([key, value]) => {
        const column = props.options.columns?.find(
          (col: any) => col.dataIndex == key || col.key == key
        );
        return (
          <Checkbox
            key={`${key}_${value}`}
            checked={value}
            onChange={({ target: { checked } }) =>
              setColumns((columns) => {
                return {
                  ...columns,
                  [key]: checked,
                };
              })
            }
          >
            {column.title ? column.title : column.dataIndex}
          </Checkbox>
        );
      }),
    [columns]
  );
  const renderFiltersItems = useMemo(
    () =>
      props.filters?.items.map((filter) => (
        <Checkbox
          key={filter.name}
          checked={!!filters[filter.name]}
          onChange={({ target: { checked } }) => {
            // if (checked) {
            setFilters((filters) => ({ ...filters, [filter.name]: checked }));
            // } else {
            //   disableFilter(filter.name);
            // }
          }}
        >
          {filter.title}
        </Checkbox>
      )),
    [filters]
  );
  const renderFiltersBadges = useMemo(
    () =>
      Object.entries(filters)
        .filter(([, val]) => val)
        ?.map(([filter]) => {
          const fil = props.filters?.items?.find((filt) => filt.name == filter);
          return (
            <Flex
              key={filter}
              className="bg-orange-50 px-2 py-1 rounded-[.5rem] border"
              gap={4}
              align="center"
            >
              <div className=" text-[.7rem] font-bold">{fil?.title}</div>
              <CloseOutlined
                className="text-[.7rem] cursor-pointer"
                onClick={() => {
                  // disableFilter(filter);
                  setFilters((filters) => ({ ...filters, [filter]: false }));
                }}
              />
            </Flex>
          );
        }),
    [filters]
  );

  // drag sorting handlers
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const getNewIndex = () => {
      if (props.options.pagination) {
        const page = props.options.pagination.current;
        const pageSize = props.options.pagination.pageSize;
        return page * pageSize - pageSize + newIndex;
      } else return newIndex;
    };
    if (oldIndex !== newIndex) {
      props.dragSorting?.onSort(
        (props.data as any[]).find((_, idx) => idx == oldIndex),
        getNewIndex()
      );
    }
  };
  const DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow: React.FC<any> = ({
    className,
    style,
    ...restProps
  }) => {
    const index = props.data
      .map((item, index) => ({ ...item, index }))
      .findIndex(
        //@ts-ignore
        (x) => x.index === restProps["data-row-key"]
      );
    return <SortableItem index={index} {...restProps} />;
  };

  const tableComponents = useMemo(() => {
    if (props.dragSorting) {
      return {
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      };
    }
  }, [props.dragSorting]);
  const tableColumns = useMemo(() => {
    let columnsItems = props.options.columns?.filter(
      (col: any) => columns[(col.dataIndex ? col.dataIndex : col.key) as string]
    );
    if (props.dragSorting) {
      columnsItems = [
        {
          dataIndex: "order",
          width: 30,
          className: "drag-visible",
          render: () => <DragHandle />,
        },
        ,
        ...columnsItems,
      ];
    }
    return columnsItems;
  }, [props.dragSorting, columns, props.options.columns]);

  return (
    <>
      <Flex vertical gap={8} className="w-full">
        <Flex gap={4} className="lg:w-fit">
          {!!props.filters && (
            <Popover
              trigger={"click"}
              content={
                <Flex vertical gap={4}>
                  {renderFiltersItems}
                </Flex>
              }
            >
              <Badge
                dot
                count={Object.entries(filters).filter(([, val]) => val).length}
              >
                <Button>
                  <FilterFilledIcon />
                </Button>
              </Badge>
            </Popover>
          )}
          <Popover
            trigger={"click"}
            content={
              <Flex vertical gap={4}>
                {renderColumnsItems}
              </Flex>
            }
          >
            <Button>
              <BarsOutlined />
            </Button>
          </Popover>
          <Search
            value={search}
            onChange={({ target: { value } }) => {
              setSearch(value);
            }}
            onSearch={() => {
              props.onChange({
                search,
                filters,
              });
            }}
          />
        </Flex>
        {!!Object.entries(filters).filter(([, val]) => val).length && (
          <Flex gap={4} align="center">
            <div className="text-[.8rem]">فیلتر ها:</div>
            <Flex wrap="wrap" gap={4}>
              {renderFiltersBadges}
            </Flex>
          </Flex>
        )}
        <Table
          {...props.options}
          dataSource={props.data.map((item, index) => ({ ...item, index }))}
          columns={tableColumns}
          rowKey="index"
          components={tableComponents}
        />
      </Flex>
    </>
  );
}

export default DataView;
