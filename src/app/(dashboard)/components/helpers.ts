import { MENU_KEYS } from "./contants";

export const setMenuKeys = ({
  pathname,
  setSelectedKeys,
}: {
  pathname: string;
  setSelectedKeys: (satte: string[]) => void;
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
    case "/menu/categories": {
      setSelectedKeys([
        ...menu_categories,
        MENU_KEYS.menu_children.categories_children.list,
      ]);
      break;
    }
    case "/menu/categories/add": {
      setSelectedKeys([
        ...menu_categories,
        MENU_KEYS.menu_children.categories_children.add,
      ]);
      break;
    }
    case "/menu/items/add": {
      setSelectedKeys([
        ...menu_items,
        MENU_KEYS.menu_children.items_children.add,
      ]);
      break;
    }
    case "/customer_club/customers": {
      setSelectedKeys([
        ...customer_club_customers,
        MENU_KEYS.customer_club_children.customers_children.list,
      ]);
      break;
    }
    case "/customer_club/customers/add": {
      setSelectedKeys([
        ...customer_club_customers,
        MENU_KEYS.customer_club_children.customers_children.add,
      ]);
      break;
    }
    case "/events": {
      setSelectedKeys([
        MENU_KEYS.gatherings,
        MENU_KEYS.gatherings_children.list,
      ]);
      break;
    }
    case "/events/add": {
      setSelectedKeys([
        MENU_KEYS.gatherings,
        MENU_KEYS.gatherings_children.add,
      ]);
      break;
    }
    case "/conditional_discounts": {
      setSelectedKeys([
        MENU_KEYS.conditional_discounts,
        MENU_KEYS.conditional_discounts_children.list,
      ]);
      break;
    }
    case "/conditional_discounts/add": {
      setSelectedKeys([
        MENU_KEYS.conditional_discounts,
        MENU_KEYS.conditional_discounts_children.add,
      ]);
      break;
    }
    case "/spaces/halls": {
      setSelectedKeys([
        ...spaces_halls,
        MENU_KEYS.spaces_children.halls_children.list,
      ]);
      break;
    }
    case "/spaces/halls/add": {
      setSelectedKeys([
        ...spaces_halls,
        MENU_KEYS.spaces_children.halls_children.add,
      ]);
      break;
    }
    case "/spaces/tables": {
      setSelectedKeys([
        ...spaces_tables,
        MENU_KEYS.spaces_children.tables_children.list,
      ]);
      break;
    }
    case "/spaces/tables/add": {
      setSelectedKeys([
        ...spaces_tables,
        MENU_KEYS.spaces_children.tables_children.add,
      ]);
      break;
    }
    case "/settings/profile": {
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
    default: {
      if (comparePatternWithPathname(pathname, "/menu/categories/[add]")) {
        setSelectedKeys([
          MENU_KEYS.menu,
          MENU_KEYS.menu_children.categories,
          MENU_KEYS.menu_children.categories_children.add,
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
