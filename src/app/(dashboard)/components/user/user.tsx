import { Flex, Col, Typography, Avatar, Skeleton } from "antd";
import React, { useMemo, useState } from "react";
import userAvatar from "@/assets/images/user-avatar.png";
import { useSession } from "next-auth/react";
import { Button, Popover } from "antd/lib";
import { signOut } from "@/lib/auth";
import Logout from "./logout";

const User = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const userFullName = useMemo(
    () =>
      [session.data?.user?.first_name, session.data?.user?.last_name]
        .filter(Boolean)
        .join(" "),
    [session.data?.user]
  );

  const popoverContent = useMemo(
    () => (
      <Flex vertical gap={8}>
        <Flex align="center" gap={".75rem"}>
          <Col>
            <Typography>
              {userFullName ? (
                userFullName
              ) : (
                <Skeleton.Input size="small" className="w-[5rem] md:w-[8rem]" />
              )}
            </Typography>
          </Col>
          <Col>
            <Avatar src={userAvatar.src} />
          </Col>
        </Flex>
        <Logout />
      </Flex>
    ),
    [session.data?.user]
  );

  return (
    <Popover open={open} onOpenChange={setOpen} content={popoverContent}>
      <Flex align="center" gap={".75rem"} onClick={() => setOpen(true)}>
        <Col>
          <Typography>
            {userFullName ? (
              userFullName
            ) : (
              <Skeleton.Input size="small" className="w-[5rem] md:w-[8rem]" />
            )}
          </Typography>
        </Col>
        <Col>
          <Avatar src={userAvatar.src} />
        </Col>
      </Flex>
    </Popover>
  );
};

export default User;
