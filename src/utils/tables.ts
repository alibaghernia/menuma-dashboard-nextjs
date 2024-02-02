import { ColumnProps } from "antd/lib/table";
import moment from "jalali-moment";

export const renderTime: ColumnProps<unknown>["render"] = (val) => {
  const time = moment(val);
  return time.format("jYYYY/jMM/jDD HH:mm");
};
