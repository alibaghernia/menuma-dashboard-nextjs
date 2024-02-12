import { MENU_KEYS } from "./contants";

export const setMenuKeys = ({
  pathname,
  setSelectedKeys,
  params,
}: {
  pathname: string;
  setSelectedKeys: (satte: string[]) => void;
  params: any;
}) => {
  const menu_categories = [MENU_KEYS.menu, MENU_KEYS.menu_children.categories];
  const menu_items = [MENU_KEYS.menu, MENU_KEYS.menu_children.items];
  const customer_club_customers = [
    MENU_KEYS.customer_club,
    MENU_KEYS.customer_club_children.customers,
  ];
  const spaces_halls = [MENU_KEYS.spaces, MENU_KEYS.spaces_children.halls];
  const spaces_tables = [MENU_KEYS.spaces, MENU_KEYS.spaces_children.tables];

  // administrator
  const admin_cafe_restaurants = [MENU_KEYS.administrator.cafe_restaurants];
  switch (pathname) {
    case "/": {
      setSelectedKeys([MENU_KEYS.dashboard]);
      break;
    }
    case "/administrator": {
      setSelectedKeys([MENU_KEYS.dashboard]);
      break;
    }
    case `/${params.business}/menu/categories`: {
      setSelectedKeys([
        ...menu_categories,
        MENU_KEYS.menu_children.categories_children.list,
      ]);
      break;
    }
    case `/${params.business}/menu/categories/add`: {
      setSelectedKeys([
        ...menu_categories,
        MENU_KEYS.menu_children.categories_children.add,
      ]);
      break;
    }
    case `/${params.business}/menu/items/add`: {
      setSelectedKeys([
        ...menu_items,
        MENU_KEYS.menu_children.items_children.add,
      ]);
      break;
    }
    case `/${params.business}/customer_club/customers`: {
      setSelectedKeys([
        ...customer_club_customers,
        MENU_KEYS.customer_club_children.customers_children.list,
      ]);
      break;
    }
    case `/${params.business}/customer_club/customers/add`: {
      setSelectedKeys([
        ...customer_club_customers,
        MENU_KEYS.customer_club_children.customers_children.add,
      ]);
      break;
    }
    case `/${params.business}/events`: {
      setSelectedKeys([
        MENU_KEYS.gatherings,
        MENU_KEYS.gatherings_children.list,
      ]);
      break;
    }
    case `/${params.business}/events/add`: {
      setSelectedKeys([
        MENU_KEYS.gatherings,
        MENU_KEYS.gatherings_children.add,
      ]);
      break;
    }
    case `/${params.business}/discounts/conditional`: {
      setSelectedKeys([
        MENU_KEYS.discounts,
        MENU_KEYS.discounts_children.conditional,
        MENU_KEYS.discounts_children.conditional_children.list,
      ]);
      break;
    }
    case `/${params.business}/discounts/conditional/add`: {
      setSelectedKeys([
        MENU_KEYS.discounts,
        MENU_KEYS.discounts_children.conditional,
        MENU_KEYS.discounts_children.conditional_children.add,
      ]);
      break;
    }
    case `/${params.business}/spaces/halls`: {
      setSelectedKeys([
        ...spaces_halls,
        MENU_KEYS.spaces_children.halls_children.list,
      ]);
      break;
    }
    case `/${params.business}/spaces/halls/add`: {
      setSelectedKeys([
        ...spaces_halls,
        MENU_KEYS.spaces_children.halls_children.add,
      ]);
      break;
    }
    case `/${params.business}/spaces/tables`: {
      setSelectedKeys([
        ...spaces_tables,
        MENU_KEYS.spaces_children.tables_children.list,
      ]);
      break;
    }
    case `/${params.business}/spaces/tables/add`: {
      setSelectedKeys([
        ...spaces_tables,
        MENU_KEYS.spaces_children.tables_children.add,
      ]);
      break;
    }
    case `/${params.business}/settings/profile`: {
      setSelectedKeys([
        MENU_KEYS.settings,
        MENU_KEYS.settings_children.profile,
      ]);
      break;
    }
    // administrator
    case "/administrator/cafe_restaurants": {
      setSelectedKeys([
        MENU_KEYS.administrator.cafe_restaurants,
        MENU_KEYS.administrator.cafe_restaurants_children.list,
      ]);
      break;
    }
    case "/administrator/cafe_restaurants/add": {
      setSelectedKeys([
        MENU_KEYS.administrator.cafe_restaurants,
        MENU_KEYS.administrator.cafe_restaurants_children.add,
      ]);
      break;
    }
    case "/administrator/categories": {
      setSelectedKeys([
        MENU_KEYS.administrator.categories,
        MENU_KEYS.administrator.categories_children.list,
      ]);
      break;
    }
    case "/administrator/categories/add": {
      setSelectedKeys([
        MENU_KEYS.administrator.categories,
        MENU_KEYS.administrator.categories_children.add,
      ]);
      break;
    }
    case "/administrator/items": {
      setSelectedKeys([
        MENU_KEYS.administrator.items,
        MENU_KEYS.administrator.items_children.list,
      ]);
      break;
    }
    case "/administrator/items/add": {
      setSelectedKeys([
        MENU_KEYS.administrator.items,
        MENU_KEYS.administrator.items_children.add,
      ]);
      break;
    }
    case "/administrator/events": {
      setSelectedKeys([
        MENU_KEYS.administrator.events,
        MENU_KEYS.administrator.events_children.list,
      ]);
      break;
    }
    case "/administrator/events/add": {
      setSelectedKeys([
        MENU_KEYS.administrator.events,
        MENU_KEYS.administrator.events_children.add,
      ]);
      break;
    }
    case "/administrator/catalogs": {
      setSelectedKeys([
        MENU_KEYS.administrator.catalogs,
        MENU_KEYS.administrator.catalogs_children.list,
      ]);
      break;
    }
    case "/administrator/catalogs/add": {
      setSelectedKeys([
        MENU_KEYS.administrator.catalogs,
        MENU_KEYS.administrator.catalogs_children.add,
      ]);
      break;
    }
    case "/administrator/users": {
      setSelectedKeys([
        MENU_KEYS.administrator.users,
        MENU_KEYS.administrator.users_children.list,
      ]);
      break;
    }
    case "/administrator/users/add": {
      setSelectedKeys([
        MENU_KEYS.administrator.users,
        MENU_KEYS.administrator.users_children.add,
      ]);
      break;
    }
    default: {
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/menu/categories/[uuid]`
        )
      ) {
        setSelectedKeys([
          ...menu_categories,
          MENU_KEYS.menu_children.categories_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/menu/items/[uuid]`
        )
      ) {
        setSelectedKeys([
          ...menu_items,
          MENU_KEYS.menu_children.items_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/spaces/halls/[uuid]`
        )
      ) {
        setSelectedKeys([
          MENU_KEYS.spaces,
          MENU_KEYS.spaces_children.halls,
          MENU_KEYS.spaces_children.halls_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/spaces/tables/[uuid]`
        )
      ) {
        setSelectedKeys([
          MENU_KEYS.spaces,
          MENU_KEYS.spaces_children.tables,
          MENU_KEYS.spaces_children.tables_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/events/[uuid]`
        )
      ) {
        setSelectedKeys([
          MENU_KEYS.gatherings,
          MENU_KEYS.gatherings_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/discounts/conditional/[uuid]`
        )
      ) {
        setSelectedKeys([
          MENU_KEYS.discounts,
          MENU_KEYS.discounts_children.conditional,
          MENU_KEYS.discounts_children.conditional_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          `/${params.business}/customer_club/customers/[uuid]`
        )
      ) {
        setSelectedKeys([
          MENU_KEYS.customer_club,
          MENU_KEYS.customer_club_children.customers,
          MENU_KEYS.customer_club_children.customers_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(
          pathname,
          "/administrator/cafe_restaurants/[uuid]"
        )
      ) {
        setSelectedKeys([
          ...admin_cafe_restaurants,
          MENU_KEYS.administrator.cafe_restaurants_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(pathname, "/administrator/categories/[uuid]")
      ) {
        setSelectedKeys([
          MENU_KEYS.administrator.categories,
          MENU_KEYS.administrator.categories_children.edit,
        ]);
        break;
      }
      if (comparePatternWithPathname(pathname, "/administrator/items/[uuid]")) {
        setSelectedKeys([
          MENU_KEYS.administrator.items,
          MENU_KEYS.administrator.items_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(pathname, "/administrator/events/[uuid]")
      ) {
        setSelectedKeys([
          MENU_KEYS.administrator.events,
          MENU_KEYS.administrator.events_children.edit,
        ]);
        break;
      }
      if (
        comparePatternWithPathname(pathname, "/administrator/catalogs/[uuid]")
      ) {
        setSelectedKeys([
          MENU_KEYS.administrator.catalogs,
          MENU_KEYS.administrator.catalogs_children.edit,
        ]);
        break;
      }
      if (comparePatternWithPathname(pathname, "/administrator/users/[uuid]")) {
        setSelectedKeys([
          MENU_KEYS.administrator.users,
          MENU_KEYS.administrator.users_children.edit,
        ]);
        break;
      }
    }
  }
};

export const comparePatternWithPathname = (
  pathname: string,
  pattern: string
) => {
  const pathArr = pathname.split("/");
  const patternArr = pattern.split("/");
  if (pathArr.length != patternArr.length) return false;

  for (const [idx, patternSlice] of patternArr.entries()) {
    if (patternSlice.startsWith("[")) {
      pathArr.splice(idx, 1, patternSlice);
    }
  }

  return pathArr.join("/") == pattern;
};
