import TrashOutlined from "@/icons/trash-outlined";
import { useTailwindColor } from "@/utils/hooks";
import { Button } from "antd";
import { Flex } from "antd/lib";
import classNames from "classnames";
import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
interface IImageDisplayerWrapperProps extends HTMLAttributes<HTMLDivElement> {
  avatar?: boolean;
  onRemove: () => void;
  imageRootClassName?: string;
}
export type IImageDisplayerWrapper = FC<
  PropsWithChildren<IImageDisplayerWrapperProps>
>;

const ImageDisplayerWrapper: IImageDisplayerWrapper = (props) => {
  const redColor = useTailwindColor("red");
  return (
    <div
      {...props}
      className={twMerge(classNames("relative w-fit", props.className))}
    >
      <Flex vertical align="center" gap={16}>
        <div
          className={twMerge(
            classNames(
              "z-0 w-fit pointer-events-none rounded-[.5rem] overflow-hidden",
              {
                "rounded-full": props.avatar,
              },
              props.imageRootClassName
            )
          )}
        >
          {props.children}
        </div>
        <Button
          className="flex items-center"
          danger
          ghost
          onClick={() => props.onRemove()}
          icon={<TrashOutlined width={16} height={16} color={redColor[500]} />}
        >
          حذف
        </Button>
      </Flex>
    </div>
  );
};

export default ImageDisplayerWrapper;
