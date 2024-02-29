import React from "react";
import { Combobox } from "@headlessui/react";

interface EditEventInviteesProps {
  invitees: string[];
  setInvitees: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
}

/**
 * A utility for conditionally applying classNames
 */
function cn(...classNames: (string | boolean)[]) {
  return classNames.filter(Boolean).join(" ");
}

function EditEventInvitees({ invitees, setInvitees, options }: EditEventInviteesProps) {
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    setQuery("");
  }, [invitees]);

  const filteredOptions = React.useMemo(
    () => {
      const _query = query.trim().toLowerCase();
      if (_query.length === 0) {
        return options.slice(0, 10).filter((item) => !invitees.includes(item));
      }
      return options
        .filter(
          (item) => item.toLowerCase().includes(_query) && !invitees.includes(item)
        )
        .slice(0, 10);
    },
    [invitees, options, query]
  );

  const removeInvitee = React.useCallback((invitee: string) => {
    setInvitees((invitees) => invitees.filter((x) => x !== invitee));
  }, [setInvitees]);

  return (
    <Combobox
      multiple
      as="div"
      className="flex flex-col space-y-2"
      value={invitees}
      onChange={(invitees) => setInvitees(invitees)}
    >
      <Combobox.Label className="font-bold">
        Invitees
      </Combobox.Label>
      {invitees.length > 0 && (
        <ul className="space-x-2 flex flex-wrap">
          {invitees.map((invitee, i) =>
            <li key={i} className="p-1 border rounded bg-slate-100 dark:bg-slate-700 inline-flex items-center">
              {invitee} <button className="px-2" onClick={() => removeInvitee(invitee)}>x</button>
            </li>
          )}
        </ul>
      )}
      <Combobox.Input
        onChange={(ev) => setQuery(ev.target.value)}
        value={query}
        className="form-control"
        placeholder="Search for people to invite"
      />
      <div className="relative flex">
        <Combobox.Options className="absolute top-0 form-control flex flex-col">
          {filteredOptions.map((item, i) =>
            <Combobox.Option key={i} value={item}>
              {({ active }) =>
                <div className={cn(active && "bg-slate-300")}>
                  {item}
                </div>
              }
            </Combobox.Option>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}

export { EditEventInvitees };
