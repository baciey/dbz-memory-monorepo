import { format } from "date-fns";
import { APP_DATE_FORMAT } from "../constants/date";

export const dateFormatter = (
  date: string,
  formatDate: string = APP_DATE_FORMAT
) => format(new Date(date), formatDate);
