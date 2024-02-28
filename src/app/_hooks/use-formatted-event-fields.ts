import React from "react";
import type { EventListData } from "../_components/event-list";

function useFormattedEventFields({ timestamp, description }: EventListData[number]) {
  return React.useMemo(() => {
    const d = new Date(timestamp);

    return {
      dateTime: `${d.toDateString()} AT ${d.toLocaleTimeString()}`,
      paragraphs: description.split("\n")
    };
  }, [description, timestamp]);
}

export { useFormattedEventFields };