"use client";

import React from "react";
import { client } from "@/api-client";
import { useFetcher } from "../_hooks/use-fetcher";
import { useEventsList } from "./events-provider";
import { useEditEvent } from "../_hooks/use-edit-event";

function CreateEvent() {
  const [isFormShowing, setIsFormShowing] = React.useState(false);

  const eventsList = useEventsList();

  const { dateAndTime, description, onInputDescription, name, onInputName, reset } = useEditEvent();

  const { date, time, onDateChange, onTimeChange } = dateAndTime;

  const query = React.useCallback(
    () => client.POST("/events", {
      body: {
        timestamp: new Date(`${date} ${time}`).toISOString(),
        name,
        description,
        invitees: [],
      },
    }),
    [date, description, name, time]
  );

  const createEvent = useFetcher(query);

  const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(async (ev) => {
    ev.preventDefault();
    await createEvent.doFetch();
    await eventsList.doFetch();
    reset();
    setIsFormShowing(false);
  }, [createEvent, eventsList, reset])


  return (
    <div>
      <button className="px-2 py-1 border border-slate-400 rounded" onClick={() => setIsFormShowing(!isFormShowing)}>
        + Create Event
      </button>
      {isFormShowing && (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <input type="text" value={name} onInput={onInputName} />
          <textarea value={description} onInput={onInputDescription}></textarea>
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  )
}

export { CreateEvent };
