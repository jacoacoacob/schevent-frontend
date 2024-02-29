

# Schevent Frontend


## Running Locally

**Requirments**
- Node.js

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

## Design Choices and Areas for Improvement

**Todo**:
- Form validation with [yup](https://yup-docs.vercel.app/docs/intro) or [zod](https://zod.dev/)
- Use [@tanstack/react-query](https://tanstack.com/query/latest) to reduce network overhead and provide more extensible fetching API
- Put "Edit" and "Delete" buttons in `EventListItem` in [Menu](https://headlessui.com/react/menu)
- Leverage [Nextjs's data fetching features](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch) to fetch


