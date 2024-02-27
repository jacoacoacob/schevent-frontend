"use client";

import React from "react";
import { useFetcher } from "../_hooks/use-fetcher";
import { client } from "@/api-client";
import { EventListItem } from "./event-list-item";
import { paths } from "@/api-types";

type EventListData = paths["/events"]["get"]["responses"]["200"]["content"]["application/json"];

function delay(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

function EventList() {

  const { data, error, isBusy } = useFetcher(
    async () => {
      // mock network latency
      // await delay(2000);
      return client.GET("/events")
    },
    {
      initialData: [],
      immediate: true,
    }
  );

  const eventList = React.useMemo(
    () => Array
      .from(data)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [data]
  );

  if (error) {
    return (
      <div>
        Oh dear 😕 We couldn&apos;t load your events 😭
      </div>
    )
  }

  if (isBusy) {
    return (
      <div>
        We&apos;re getting your fun cool exciting events 😃 Just a moment...
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {eventList.map(event =>
        <EventListItem key={event._id} data={event} />
      )}
    </ul>
  );
}

export { EventList };
export type { EventListData };