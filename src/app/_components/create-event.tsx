"use client";

import React from "react";
import { EditEvent } from "./edit-event";
import { useEventsList } from "./events-provider";

function CreateEvent() {
  const [isFormShowing, setIsFormShowing] = React.useState(false);

  const eventsList = useEventsList();

  const onSuccess = React.useCallback(async () => {
    setIsFormShowing(false);
    eventsList.doFetch();
  }, [eventsList]);

  return (
    <div>
      <button
        className="px-2 py-1 border border-slate-400 rounded"
        onClick={() => setIsFormShowing(!isFormShowing)}
      >
        {isFormShowing ? "Cancel" : "+ Create Event"}
      </button>
      {isFormShowing && <EditEvent action="create" onSuccess={onSuccess} />}
    </div>
  )
}

export { CreateEvent };
