import React from 'react';
import { EventList } from './_components/event-list';
import { EventsProvider } from './_components/events-provider';
import { CreateEvent } from './_components/create-event';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-8 px-2">
      <div className="space-y-4 max-w-xl">
        <section className="space-y-2">
          <h1 className="text-4xl font-bold">Schevent</h1>
          <p>
            Welcome to Schevent! Create events, invite friends, get reminders.
          </p>
        </section>
        <EventsProvider>
          <div className="space-y-12">
            <CreateEvent />
            <EventList />
          </div>
        </EventsProvider>
      </div>
    </main>
  );
}
