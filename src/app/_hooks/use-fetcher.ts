import React from "react";

type QueryFn<Data> = (...args: any) => Promise<{
  data?: Data;
  error?: string | { statusCode: number; message: string };
}>;

interface Fetcher<Data> {
  data: Data;
  error: React.RefObject<string>;
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
  }
): Fetcher<Data> {
  const { immediate, initialData } = options;

  const [data, setData] = React.useState<Data>(initialData as Data);
  const [isBusy, setIsBusy] = React.useState(false);
  const error = React.useRef("");

  React.useEffect(() => {
    if (immediate) {
      (async () => {
        await doFetch();
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doFetch = React.useCallback(async () => {
    try {
      error.current = "";
      setIsBusy(true);

      const { data: queryData, error: queryError } = await query();
      
      if (queryError) {
        error.current = typeof queryError === "string" ? queryError : queryError.message;
      } else if (queryData) {
        setData(queryData);
      }
      
    } catch (err) {
      error.current = err instanceof Error ? err.message : err as string;
    } finally {
      setIsBusy(false);
    }
  }, [query]);

  return { data, isBusy, doFetch, error };
}


export { useFetcher };
export type { Fetcher };
