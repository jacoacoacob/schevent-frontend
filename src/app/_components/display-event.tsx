import { useFormattedEventFields } from "../_hooks/use-formatted-event-fields";
import { EventListData } from "./event-list";

interface DisplayEventProps {
  data: EventListData[number];
}

function DisplayEvent({ data }: DisplayEventProps) {
  const { invitees, name } = data;
  const { dateTime, paragraphs } = useFormattedEventFields(data);

  return (
    <div className="space-y-4">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="font-bold text-xl">{name}</h1>
          <p className="font-bold text-sm text-slate-600 dark:text-slate-300">{dateTime}</p>
        </div>
        <div className="space-y-2">
          {paragraphs.map((paragraph, i) =>
            <p key={i}>{paragraph}</p>
          )}
        </div>
      </section>
      <section>
        <h2 className="font-bold">Invitees</h2>
        {invitees.length === 0 ? (
          <span>No one has been invited 😮</span>
        ) : (
          <ul>
            {invitees.map((guest, i) =>
              <li key={i}>{guest}</li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}

export { DisplayEvent };
