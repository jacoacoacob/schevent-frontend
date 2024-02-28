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

function useEditEvent(initialValues: Partial<EventListData[number]> = {}) {
  const [name, setName] = React.useState(initialValues.name ?? "");
  const [description, setDescription] = React.useState(initialValues.description ?? "");
  const [invitees, setInvitees] = React.useState<string[]>(initialValues.invitees ?? []);

  const onInputName = handleInput(setName);
  const onInputDescription = handleInput(setDescription);

  const d = initialValues.timestamp ? new Date(initialValues.timestamp) : new Date();

  const dateAndTime = useEditDateTime({
    date: d.toDateString(),
    time: d.toTimeString(),
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
    dateAndTime,
    reset,
  }
}

export { useEditEvent };
