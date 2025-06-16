import { useState, useCallback, useEffect } from "react";

export function usePaginatedData<T>(
  fetcher: (page: number) => Promise<T[]>,
  deps: T[] = [],
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await fetcher(page);
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newData]);
        setPage((p) => p + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, fetcher]);

  // При изменении зависимостей — сбрасываем всё и грузим заново
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);

    // Немедленная загрузка первой страницы
    loadMore();
  }, deps);

  return { data, loading, hasMore, loadMore, setData };
}
