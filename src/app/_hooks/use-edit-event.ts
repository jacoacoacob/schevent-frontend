import React, { SetStateAction } from "react";
import type { EventListData } from "../_components/event-list";
import { useEditDateTime } from "./use-edit-date-time";

function handleInput<Value>(
  setter: React.Dispatch<React.SetStateAction<Value>>
): React.FormEventHandler<HTMLElement> {
  return (ev) => {
    setter((ev.target as any).value as SetStateAction<Value>);
  }
}

function datePart(part: number) {
  return `${part}`.padStart(2, "0");
}

function useEditEvent(initialValues: Partial<EventListData[number]> = {}) {
  const [name, setName] = React.useState(initialValues.name ?? "");
  const [description, setDescription] = React.useState(initialValues.description ?? "");
  const [invitees, setInvitees] = React.useState<string[]>(initialValues.invitees ?? []);

  const onInputName = handleInput(setName);
  const onInputDescription = handleInput(setDescription);

  const d = initialValues.timestamp ? new Date(initialValues.timestamp) : new Date();

  const _year = d.getFullYear();
  const _month = datePart(d.getMonth() + 1);
  const _date = datePart(d.getDate());
  const _hour = datePart(d.getHours());
  const _minutes = datePart(d.getMinutes());

  const dateTime = useEditDateTime({
    date: `${_year}-${_month}-${_date}`,
    time: `${_hour}:${_minutes}`,
  });

  function reset() {
    setName(initialValues.name ?? "");
    setDescription(initialValues.description ?? "");
    setInvitees(initialValues.invitees ?? []);
  }

  return {
    name,
    description,
    invitees,
    onInputName,
    onInputDescription,
    setInvitees,
    dateTime,
    reset,
  }
}

export { useEditEvent };
