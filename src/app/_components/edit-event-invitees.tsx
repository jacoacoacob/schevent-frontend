import React from "react";
import { Combobox } from "@headlessui/react";

interface EventFormInviteeSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

function EventFormInviteeSelect({ value, onChange, options }: EventFormInviteeSelectProps) {
  const [query, setQuery] = React.useState("");

  const filteredOptions = React.useMemo(
    () => {
      const _query = query.trim().toLowerCase();
      if (_query.length === 0) {
        return options;
      }
      return options.filter(
        (item) => item.toLowerCase().includes(_query)
      );
    },
    [options, query]
  );

  const _onChange = React.useCallback((value: string[]) => {
    setQuery("");
    onChange(value);
  }, [onChange]);

  return (
    <Combobox value={value} onChange={_onChange} multiple>
      {value.length > 0 && (
        <ul>
          {value.map((item, i) =>
            <li key={i}>{item}</li>
          )}
        </ul>
      )}
      <Combobox.Input onChange={(ev) => setQuery(ev.target.value)} />
      <Combobox.Options>
        {filteredOptions.map((item, i) =>
          <Combobox.Option key={i} value={item}>
            {({ selected}) => selected ? (
              <span className="font-bold">{item}</span>
            ) : (
              <span>{item}</span>
            )}
          </Combobox.Option>
        )}
      </Combobox.Options>
    </Combobox>
  )
}

export { EventFormInviteeSelect };
