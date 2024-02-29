import React from "react";
import { client } from "../../api-client";
import { useUsersList } from "../_hooks/use-users-list";
import { useEditEvent } from "../_hooks/use-edit-event";
import { useFetcher } from "../_hooks/use-fetcher";
import type { EventListData } from "./event-list";
import { EditEventDateTime } from "./edit-event-date-time";
import { EditEventInvitees } from "./edit-event-invitees";

interface EditEventProps {
  data?: EventListData[number];
  action: "create" | "update";
  onSuccess: () => void;
  onCancel: () => void;
}

function EditEvent({ data, action, onSuccess, onCancel }: EditEventProps) {
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

  const requestBody = React.useMemo(() => {
    // try/catch handles invalid `date` input
    // TODO: Don't rely on native browser date input validation to prevent
    // user from submitting form with invalid date
    let startsAt = "";
    try {
      startsAt = new Date(`${date} ${time}`).toISOString()
    } catch (error) {}
    return {
      invitees,
      startsAt,
      name: name.trim(),
      description: description.trim(),
    }
  }, [date, description, invitees, name, time]);

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
      <form onSubmit={onSubmit} className="space-y-4 flex flex-col">
        <input
          type="text"
          className="form-control"
          value={name}
          onInput={onInputName}
          placeholder="Give your event a name"
        />
        <EditEventDateTime {...dateTime} />
        <textarea
          className="form-control resize-none"
          value={description}
          onInput={onInputDescription}
          placeholder="Give your event a description"
        ></textarea>
        <EditEventInvitees
          invitees={invitees}
          setInvitees={setInvitees}
          options={usersList}
        />
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="form-control">
            Cancel
          </button>
          <button type="submit" className="form-control bg-slate-800 text-white dark:bg-slate-200 dark:text-black">
            Save Event
          </button>
        </div>
      </form>
    </div>
  )
}

export { EditEvent }
