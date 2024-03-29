import React from "react";
import { ChangeEventHandler, FormEventHandler } from "react";

const TIMES = Array.from(Array(60 * 24 / 5)).map((_, i) => {
  const _hour = Math.floor(i / 12);
  const _minute = `${(i * 5) % 60}`;

  const ampm = _hour > 11 ? "PM" : "AM";

  const hour = `${_hour}`.padStart(2, "0");
  const minute = `${_minute}`.padStart(2, "0");
  const value = `${hour}:${minute}:00`;

  return {
    hour: Math.floor(_hour % 12) === 0
      ? 12
      : Math.floor(_hour % 12),
    minute,
    ampm,
    value,
  };
});

interface EditEventDateTimeProps {
  date: string;
  onDateChange: FormEventHandler<HTMLInputElement>;
  time: string;
  onTimeChange: ChangeEventHandler<HTMLSelectElement>;
}

function EditEventDateTime(props: EditEventDateTimeProps) {
  const { date, time, onDateChange, onTimeChange } = props;

  return (
    <div className="flex space-x-2">
      <input className="form-control" type="date" value={date} onChange={onDateChange} />
      <select className="form-control" name="time" onChange={onTimeChange} defaultValue={time}>
        {TIMES.map((item, index) =>
          <option key={index} value={item.value}>
            {item.hour}:{item.minute} {item.ampm}
          </option>
        )}
      </select>
    </div>
  )
}

export { EditEventDateTime };
export type { EditEventDateTimeProps };
