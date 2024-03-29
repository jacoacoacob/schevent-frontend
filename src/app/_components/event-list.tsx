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

  const { data, error, isBusy } = useEventsList();

  const eventList = React.useMemo(
    () => Array
      .from(data)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()),
    [data]
  );

  if (error.current) {
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
    <div className="relative">
      {isBusy &&
        <span>Refreshing event list</span>
      }
      <ul className="space-y-4">
        {eventList.map(event =>
          <EventListItem key={event._id} data={event} />
        )}
      </ul>
    </div>
  );
}

export { EventList };
export type { EventListData };