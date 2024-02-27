import React from "react";

type QueryFn<Data> = (...args: any) => Promise<{
  data?: Data;
  error?: string | { statusCode: number; message: string };
}>;

interface Fetcher<Data> {
  data: Data;
  error: string;
  isBusy: boolean;
  doFetch: () => Promise<void>;
}

interface UseFetcherOptions<Data> {
  immediate?: boolean;
  initialData?: Data;
}

function useFetcher<Data>(
  query: QueryFn<Data>,
  options: UseFetcherOptions<Data> = {
    immediate: false,
    initialData: undefined
  }
): Fetcher<Data> {
  const { immediate, initialData } = options;

  const [data, setData] = React.useState<Data>(initialData as Data);
  const [error, setError] = React.useState("");
  const [isBusy, setIsBusy] = React.useState(false);

  React.useEffect(() => {
    if (immediate) {
      (async () => {
        await doFetch();
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function doFetch() {
    try {
      setIsBusy(true);

      const { data, error } = await query();
      
      if (data) {
        setData(data);
      }
      
      if (error) {
        setError(typeof error === "string" ? error : error.message);
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsBusy(false);
    }
  }

  return { data, error, isBusy, doFetch };
}


export { useFetcher };
export type { Fetcher };
