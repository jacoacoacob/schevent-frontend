import React, { ChangeEventHandler, FormEventHandler } from "react";

interface UseDateTimePickerOptions {
  date?: string;
  time?: string;
}

function useDateTimePicker(options?: UseDateTimePickerOptions) {
  const [date, setDate] = React.useState(options?.date ?? "");
  const [time, setTime] = React.useState(options?.time ?? "");

  const onDateChange: FormEventHandler<HTMLInputElement> = (ev) => {
    setDate((ev.target as HTMLInputElement).value);
  };

  const onTimeChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setTime((ev.target as HTMLSelectElement).value);
  };

  return {
    date,
    time,
    onDateChange,
    onTimeChange,
  };
}

export { useDateTimePicker };