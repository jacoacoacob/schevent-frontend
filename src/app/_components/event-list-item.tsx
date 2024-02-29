import React from "react";
import { client } from "../../api-client";
import type { EventListData } from "../_components/event-list"
import { useFetcher } from "../_hooks/use-fetcher";
import { EditEvent } from "./edit-event";
import { useEventsList } from "./events-provider";
import { DisplayEvent } from "./display-event";

interface EventListItemProps {
  data: EventListData[number];
}

function EventListItem(props: EventListItemProps) {
  const { data } = props

  const [isEditing, setIsEditing] = React.useState(false);

  const { doFetch: refetchEventList } = useEventsList();

  const removeEvent = useFetcher(() =>
    client.DELETE("/events/{id}", { params: { path: { id: data._id }}}),
  );

  const onRemoveEvent = React.useCallback(async () => {
    if (confirm("Are sure you want to delete this event?")) {
      await removeEvent.doFetch();
      if (!removeEvent.error.current) {
        await refetchEventList();
      }
    }
  }, [refetchEventList, removeEvent]);

  const onEditSuccess = React.useCallback(async () => {
    await refetchEventList();
    setIsEditing(false);
  }, [refetchEventList]);

  return (
    <li className="p-8 rounded shadow border border-slate-400 space-y-2 bg-slate-50 dark:bg-slate-900">
      {isEditing ? (
        <EditEvent onCancel={() => setIsEditing(false)} data={data} onSuccess={onEditSuccess} action="update" />)
      : (
        <>
          <DisplayEvent data={data} />
          <section className="pt-4 border-t flex justify-end space-x-4">
            <button
              className="form-control text-red-500"
              onClick={onRemoveEvent}
            >
              Delete
            </button>
            <button
              className="form-control  bg-slate-800 text-white dark:bg-slate-200 dark:text-black w-20"
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </button>
          </section>
        </>
      )}
    </li>
  );
}

export { EventListItem };
