"use client";

import ReactTimeago from "react-timeago";

export const TimeAgoText = ({ date }: { date: string }) => {
  return <ReactTimeago date={date} />;
};
