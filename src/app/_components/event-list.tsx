"use client";

import React from "react";
import { useFetcher } from "../_hooks/use-fetcher";
import { client } from "@/api-client";
import { EventListItem } from "./event-list-item";
import { paths } from "@/api-types";

type EventListData = paths["/events"]["get"]["responses"]["200"]["content"]["application/json"];

function EventList() {

  const { data, error } = useFetcher(() => client.GET("/events"), {
    initialData: [],
    immediate: true,
  });

  const eventList = React.useMemo(
    () => Array
      .from(data)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [data]
  );

  return (
    <ul className="space-y-4">
      {eventList.map(event =>
        <EventListItem key={event._id} data={event} />
      )}
    </ul>
  )
}

export { EventList };
export type { EventListData };