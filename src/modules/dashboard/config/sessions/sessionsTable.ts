import { Session } from "../../../sessions/interfaces/session";
import { HourLabelsEnum } from "./timeLabelsConfig";


export  const sessionTableColumns = [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "summary", label: "Summary" },
    {
      key: "duration",
      label: "Duration",
      render: (s: Session) => `${s.duration} ${(s.duration > 1) ? HourLabelsEnum.Plural: HourLabelsEnum.singular}`,
    },
  ];