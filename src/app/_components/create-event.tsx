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
    <div className="space-y-2">
      {!isFormShowing && (
        <button
          className="form-control bg-slate-800 text-white dark:bg-slate-200 dark:text-black"
          onClick={() => setIsFormShowing(!isFormShowing)}
        >
          + Create Event
        </button>
      )}
      {isFormShowing && <EditEvent onCancel={() => setIsFormShowing(false)} action="create" onSuccess={onSuccess} />}
    </div>
  )
}

export { CreateEvent };
