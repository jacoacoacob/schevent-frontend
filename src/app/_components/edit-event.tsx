import React from "react";
import { useEditEvent } from "../_hooks/use-edit-event";
import type { EventListData } from "./event-list";
import { paths } from "@/api-types";
import { EditEventDateTime } from "./edit-event-date-time";
import { EventFormInviteeSelect } from "./edit-event-invitees";
import { useUsersList } from "../_hooks/use-users-list";
import { useFetcher } from "../_hooks/use-fetcher";
import { client } from "@/api-client";

type CreateEventRequestBody = paths["/events"]["post"]["requestBody"]["content"]["application/json"];
type UpdateEventRequestBody = paths["/events/{id}"]["patch"]["requestBody"]["content"]["application/json"];

interface EditEventProps {
  data?: EventListData[number];
  action: "create" | "update";
  onSuccess: () => void;
}

function EditEvent({ data, action, onSuccess }: EditEventProps) {
  const {
    dateAndTime,
    description,
    name,
    invitees,
    onInputName,
    onInputDescription,
    setInvitees,
    reset
  } = useEditEvent(data);

  React.useEffect(() => {
    return () => {
      reset();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const usersList = useUsersList();

  const { date, time } = dateAndTime;

  const requestBody = React.useMemo(() => ({
    name,
    description,
    invitees,
    timestamp: new Date(`${date} ${time}`).toISOString(),
  }), [date, description, invitees, name, time]);

  const createEventQuery = React.useCallback(
    () => client.POST("/events", { body: requestBody }),
    [requestBody]
  );

  const updateEventQuery = React.useCallback(
    () => client.POST("/events", { body: requestBody }),
    [requestBody]
  );

  const fetcher = useFetcher(
    action === "create" ? createEventQuery : updateEventQuery
  );

  const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (ev) => {
      ev.preventDefault();
      await fetcher.doFetch();
      if (!fetcher.error) {
        onSuccess();
      }
    },
    [fetcher, onSuccess]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        className="p-2 rounded border outline-none focus:ring"
        value={name}
        onInput={onInputName}
        placeholder="Give your event a name"
      />
      <EditEventDateTime {...dateAndTime} />
      <textarea
        value={description}
        onInput={onInputDescription}
        placeholder="Give your event a description"
      ></textarea>
      <EventFormInviteeSelect
        value={invitees}
        onChange={setInvitees}
        options={usersList}
      />
      <button type="submit">
        Save Event
      </button>
    </form>
  )
}

export { EditEvent }
export type { CreateEventRequestBody, UpdateEventRequestBody };
