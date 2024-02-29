# Schevent Frontend

This is a React / Next.js frontend for **Schevent**, a simple calendar event management application.

_Checkout the **Schevent** NestJS backend [here](https://github.com/jacoacoacob/schevent)._


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

## Design Choices and Areas for Improvement

**Todo**:
- Form validation with [yup](https://yup-docs.vercel.app/docs/intro) or [zod](https://zod.dev/)
- Use [@tanstack/react-query](https://tanstack.com/query/latest) to reduce network overhead and provide more extensible fetching API
- Put "Edit" and "Delete" buttons in `EventListItem` in [Menu](https://headlessui.com/react/menu)
- Leverage [Nextjs's data fetching features](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch) to fetch


