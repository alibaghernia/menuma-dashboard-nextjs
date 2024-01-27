"use client";

import { useRouteChangeContext } from "@/providers/routeChange/provider";
import NextLink from "next/link";
import { forwardRef, useContext } from "react";

// https://github.com/vercel/next.js/blob/400ccf7b1c802c94127d8d8e0d5e9bdf9aab270c/packages/next/src/client/link.tsx#L169
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.button === 2)
  );
}

const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
  function Link({ href, onClick, ...rest }, ref) {
    const useLink = href && href.startsWith("/");
    if (!useLink) {
      return <a href={href} onClick={onClick} {...rest} />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { onRouteChangeStart } = useRouteChangeContext();

    return (
      <NextLink
        href={href}
        onClick={(event) => {
          if (!isModifiedEvent(event)) {
            const { pathname, search, hash } = window.location;
            const hrefCurrent = `${pathname}${search}${hash}`;
            const hrefTarget = href as string;
            if (hrefTarget !== hrefCurrent) {
              onRouteChangeStart();
            }
          }
          if (onClick) onClick(event);
        }}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default Link;
