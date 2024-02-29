import React from "react";
import type { EventListData } from "../_components/event-list";

function useFormattedEventFields({ startsAt, description }: EventListData[number]) {
  return React.useMemo(() => {
    const d = new Date(startsAt);

    return {
      dateTime: `${d.toDateString()} AT ${d.toLocaleTimeString()}`,
      paragraphs: description.split("\n")
    };
  }, [description, startsAt]);
}

export { useFormattedEventFields };