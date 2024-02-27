import React from "react";
import type { EventListData } from "../_components/event-list"

interface EventDetailProps {
  data: EventListData[number];
}

function EventListItem(props: EventDetailProps) {
  const { data: { _id, invitees, name, description, timestamp }} = props;

  const descriptionParagraphs = React.useMemo(() => description.split("\n"), [description]);
  
  const dateAndTime = React.useMemo(() => {
    const d = new Date(timestamp);
    return `${d.toDateString()} AT ${d.toLocaleTimeString()}`;
  }, [timestamp]);

  return (
    <li className="p-8 rounded shadow hover:shadow-xl transition-shadow border border-slate-400">
      <h1>{name}</h1>
      <div className="space-y-4">
        {descriptionParagraphs.map((paragraph, i) =>
          <p key={i}>{paragraph}</p>
        )}
      </div>
      <p>{dateAndTime}</p>
      <section>
        <h2>Guests</h2>
        <ul>
          {invitees.map((guest, i) =>
            <li key={i}>{guest}</li>
          )}
        </ul>
      </section>
    </li>
  );
}

export { EventListItem };
