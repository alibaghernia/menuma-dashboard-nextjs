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
    case "/menu/items": {
      setSelectedKeys([
        ...menu_items,
        MENU_KEYS.menu_children.items_children.list,
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
