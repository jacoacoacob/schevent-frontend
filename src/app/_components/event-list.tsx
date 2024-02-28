"use client";

import React from "react";
import { EventListItem } from "./event-list-item";
import { paths } from "@/api-types";
import { useEventsList } from "./events-provider";

type EventListData = paths["/events"]["get"]["responses"]["200"]["content"]["application/json"];

function delay(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

function EventList() {

  const { data, error, isBusy, doFetch } = useEventsList();

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

  if (isBusy && eventList.length === 0) {
    return (
      <div>
        We&apos;re getting your fun cool exciting events 😃 Just a moment...
      </div>
    )
  }

  return (
    <div>
      {isBusy && "Updating event list"}
      <ul className="space-y-4">
        {eventList.map(event =>
          <EventListItem key={event._id} data={event} refetchEventList={doFetch} />
        )}
      </ul>
    </div>
  );
}

export { EventList };
export type { EventListData };