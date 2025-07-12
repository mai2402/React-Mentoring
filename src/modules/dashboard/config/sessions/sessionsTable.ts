import { Session } from "../../../sessions/interfaces/session";
import { HourLabelsEnum } from "./timeLabelsConfig";

// This file defines the columns for the session table in the dashboard.
const options: Intl.DateTimeFormatOptions = {
  dateStyle: "medium"
}

export  const sessionTableColumns = [
    { key: "title", label: "Title" },
    // Date Column
    { 
      key: "date", 
      label: "Date",
      render: (s: Session) => new Date(s.date).toLocaleDateString('en-US', options)},
    { key: "summary", label: "Summary" },
    // Duration Column
    {
      key: "duration",
      label: "Duration",
      render: (s: Session) => `${s.duration} ${(s.duration > 1) ? HourLabelsEnum.Plural: HourLabelsEnum.singular}`,
    },
  ];