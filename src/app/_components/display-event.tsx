import { useFormattedEventFields } from "../_hooks/use-formatted-event-fields";
import { EventListData } from "./event-list";

interface DisplayEventProps {
  data: EventListData[number];
}

function DisplayEvent({ data }: DisplayEventProps) {
  const { invitees, name } = data;
  const { dateTime, paragraphs } = useFormattedEventFields(data);

  return (
    <>
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
    </>
  );
}

export { DisplayEvent };
