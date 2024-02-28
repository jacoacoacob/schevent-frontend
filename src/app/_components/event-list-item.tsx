import React from "react";
import { client } from "../../api-client";
import type { EventListData } from "../_components/event-list"
import { useFetcher } from "../_hooks/use-fetcher";
import type { Fetcher } from "../_hooks/use-fetcher";
import { useFormattedEventFields } from "../_hooks/use-formatted-event-fields";

interface EventDetailProps {
  data: EventListData[number];
  refetchEventList: Fetcher<EventListData>["doFetch"];
}


function EventListItem(props: EventDetailProps) {
  const { refetchEventList, data } = props;

  const { _id, invitees, name } = data;

  const { dateTime, paragraphs } = useFormattedEventFields(data);

  const removeEvent = useFetcher(
    () => client.DELETE("/events/{id}", { params: { path: { id: _id }}}),
    {
      postSuccess: refetchEventList
    }
  );

  return (
    <li className="p-8 rounded shadow border border-slate-400">
      <section>
        <h1>{name}</h1>
        <div className="space-y-4">
          {paragraphs.map((paragraph, i) =>
            <p key={i}>{paragraph}</p>
          )}
        </div>
        <p>{dateTime}</p>
      </section>
      <section>
        <h2>Guests</h2>
        <ul>
          {invitees.map((guest, i) =>
            <li key={i}>{guest}</li>
          )}
        </ul>
      </section>
      <section className="p-4 border-t">
        <button className="rounded border border-slate-400 px-2 py-1" onClick={removeEvent.doFetch}>delete</button>
      </section>
    </li>
  );
}

export { EventListItem };
