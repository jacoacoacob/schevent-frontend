# Schevent Frontend

This is a React / Next.js frontend for **Schevent**, a simple calendar event management system.

_Checkout the **Schevent** NestJS backend [here](https://github.com/jacoacoacob/schevent)._

This app consists of a single page where a user can:
- Create a new event with information including: event name, start date/time, description, and invitees.
- See a list of all events sorted by start date/time where events happening sooner appear at the top.
- Update event details
- Delete events


## Design Choices

For time's sake, and because the state management requirements were relatively simple, I used React's Context provider + hooks state management pattern to expose an Events List [Fetcher](./src/app/_hooks/use-fetcher.ts) through my [`useEventsList` hook](./src/app/_components/events-provider.tsx) . This was quicker and more light-weight to setup but lacks the auditability of something like Redux (or a Redux-like system implemented with React's `useReducer` hook).

I used [openapi-typescript](https://openapi-ts.pages.dev/introduction) and [openapi-fetch](https://openapi-ts.pages.dev/openapi-fetch/) to generate typescript interfaces from the swagger-enabled NestJS API and create a fetch client with typed request / response values. GraphQL is definitely the other obvious choice for schema driven full stack development but I was more comfortable with Swagger and REST conventions and went with them for the sake of time.

I used TailwindCSS for styling because it's nice (if you install the [recommended extendsions](./.vscode/extensions.json)) and I like it 🙂

I created a custom [date/time picker component](./src/app/_components/edit-event-date-time.tsx) that only allows users choose from a list 5-minute incremented times to set the event start time. _This allows the notification system on the backend to only query the database once every 5 minutes instead of polling more often or implementing a more stateful dynamic cron-job creation system._

I made an effort to put as much business logic in custom [hooks](./src/app/_hooks/) so as to keep component rendering logic cleaner.


## Running Locally

**Requirments**
- [Node.js 18.17](https://nodejs.org/en) or later (strongly consider using [`nvm`](https://github.com/nvm-sh/nvm) to manage Node versions)

From the project root:

1. Install dependencies
  ```sh
  npm i
  ```

2. Start the development server
  ```sh
  npm run dev
  ```

3. Open a browser and navigate to the URL indicated in the console

4. Ensure Openapi generated types are up to date. Assuming you are [running the backend locally](https://github.com/jacoacoacob/schevent#running-locally), run the following command
  ```sh
  npx openapi-typescript http://localhost:8080/swagger-json -o src/api-types.ts
  ```

## Areas for Improvement

With more time, I would:

### Add form validation
[yup](https://yup-docs.vercel.app/docs/intro) or [zod](https://zod.dev/) would be good for this

### Improve data fetching
I like my little `useFetcher` utility hook but it has no concept of caching and is limited in its feature set. It was fast to write since I've written similar hooks before but using [@tanstack/react-query](https://tanstack.com/query/latest) would increase performance and scalability.

### Add hierarchy to information presentation
Currently, all event details and controls to edit and delete each event are displayed in each event list item. I'd like to put the "edit" and "delete" buttons in a menu and only show details like event description, and invitees in a dedicated event details page (or maybe an accordian-like component...)

### Server side / static generation time data fetching
Currently, all data fetching happens client side. Next.js offers a powerful set of [server-side data fetching features](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch).
