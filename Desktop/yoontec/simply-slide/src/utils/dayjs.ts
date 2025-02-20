import Dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
Dayjs.extend(relativeTime)
import { v4 } from "uuid"

export type DayFormat =
  | "h:mm A"
  | "h:mm:ss A"
  | "MM/DD/YYYY"
  | "MMMM D, YYYY"
  | "MMMM D, YYYY h:mm A"
  | "dddd, MMMM D, YYYY h:mm A"
  | "M/D/YYYY"
  | "MMM D, YYYY"
  | "MMM D, YYYY h:mm A"
  | "ddd, MMM D, YYYY h:mm A"

export const getCreatedAt = (format: DayFormat = "ddd, MMM D, YYYY h:mm A") =>
  Dayjs().format(format)

export const getFromNow = (date: string, withoutSuffix: boolean = false) =>
  Dayjs(date).fromNow(withoutSuffix)

export const getUUID = () => v4()
