import React from 'react';
import { EventList } from './_components/event-list';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-8">
      <div className="space-y-4">
        <section className="space-y-2">
          <h1 className="text-4xl font-bold">Schevent</h1>
          <p>
            Welcome to Schevent! Create events, invite friends, get reminders.
          </p>
        </section>
        <EventList />
      </div>
    </main>
  );
}
