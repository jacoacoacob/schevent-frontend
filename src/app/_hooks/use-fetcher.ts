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

  const doFetch = React.useCallback(async () => {
    try {
      setIsBusy(true);

      const { data, error: queryError } = await query();
      
      if (queryError) {
        setError(() =>
          typeof queryError === "string" ? queryError : queryError.message
        );
      } else if (data) {
        setData(data);
      }
      
    } catch (err) {
      setError(() => err instanceof Error ? err.message : err as string);
    } finally {
      setIsBusy(false);
    }
  }, [query]);

  return { data, error, isBusy, doFetch };
}


export { useFetcher };
export type { Fetcher };
