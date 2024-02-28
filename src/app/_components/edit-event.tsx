import React from "react";
import { client } from "../../api-client";
import { useUsersList } from "../_hooks/use-users-list";
import { useEditEvent } from "../_hooks/use-edit-event";
import { useFetcher } from "../_hooks/use-fetcher";
import type { EventListData } from "./event-list";
import { EditEventDateTime } from "./edit-event-date-time";
import { EventFormInviteeSelect } from "./edit-event-invitees";

interface EditEventProps {
  data?: EventListData[number];
  action: "create" | "update";
  onSuccess: () => void;
}

function EditEvent({ data, action, onSuccess }: EditEventProps) {
  const {
    dateTime,
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

  const { date, time } = dateTime;

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
    () => client.PATCH("/events/{id}", {
      body: requestBody,
      params: {
        path: {
          id: data?._id ?? "",
        }
      }
    }),
    [data?._id, requestBody]
  );

  const fetcher = useFetcher(
    action === "create" ? createEventQuery : updateEventQuery
  );

  const onSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (ev) => {
      ev.preventDefault();
      await fetcher.doFetch();
      if (!fetcher.error.current) {
        onSuccess();
      }
    },
    [fetcher, onSuccess]
  );

  return (
    <div>
      {fetcher.error.current &&
        <div className="bg-red-100 text-red-500 rounded border border-red-500 p-4">
          {fetcher.error.current}
        </div>
      }
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          className="p-2 rounded border outline-none focus:ring"
          value={name}
          onInput={onInputName}
          placeholder="Give your event a name"
        />
        <EditEventDateTime {...dateTime} />
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
    </div>
  )
}

export { EditEvent }
