import React, { SetStateAction } from "react";
import type { EventListData } from "../_components/event-list";
import { useDateTimePickerProps } from "./use-date-time-picker-props";

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

  const onInputName = handleInput(setName);
  const onInputDescription = handleInput(setDescription);

  const d = initialValues.timestamp ? new Date(initialValues.timestamp) : new Date();

  const dateAndTime = useDateTimePickerProps({
    date: d.toDateString(),
    time: d.toTimeString(),
  });

  function reset() {
    setName(initialValues.name ?? "");
    setDescription(initialValues.description ?? "");
  }

  return {
    name,
    description,
    onInputName,
    onInputDescription,
    dateAndTime,
    reset,
  }
}

export { useEditEvent };
