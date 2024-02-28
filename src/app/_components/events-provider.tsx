"use client";

import React from "react";
import { client } from "@/api-client";
import { paths } from "@/api-types";
import { Fetcher, useFetcher } from "../_hooks/use-fetcher";

const EventsContext = React.createContext({});

type EventListData = paths["/events"]["get"]["responses"]["200"]["content"]["application/json"];

interface EventsContextValue {
  eventsList: Fetcher<EventListData>;
}

function delay(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

interface Props {
  children: React.ReactNode;
}


function useEventsList() {
  const { eventsList } = React.useContext(EventsContext) as EventsContextValue;

  return eventsList;
}

function EventsProvider({ children }: Props) {
  const eventsList = useFetcher(
    async () => {
      // // mock network latency
      await delay(1000);
      return client.GET("/events")
    },
    {
      initialData: [],
      immediate: true,
    }
  );

  const value = {
    eventsList
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  )
}

export { EventsProvider, useEventsList };
