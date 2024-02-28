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
    await removeEvent.doFetch();
    if (!removeEvent.error) {
      await refetchEventList();
    }
  }, [refetchEventList, removeEvent]);

  const onEditSuccess = React.useCallback(async () => {
    await refetchEventList();
    setIsEditing(false);
  }, [refetchEventList]);

  return (
    <li className="p-8 rounded shadow border border-slate-400">
      {isEditing ? (
        <EditEvent data={data} onSuccess={onEditSuccess} action="update" />)
      : (
        <>
          <DisplayEvent data={data} />
          <section className="p-4 border-t">
            <button
              className="rounded border border-slate-400 px-2 py-1"
              onClick={onRemoveEvent}
            >
              delete
            </button>
            <button
              className="rounded border border-slate-400 px-2 py-1"
              onClick={() => setIsEditing(!isEditing)}
            >
              edit
            </button>
          </section>
        </>
      )}
    </li>
  );
}

export { EventListItem };
