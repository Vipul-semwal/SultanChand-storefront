import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useQueryData = <TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  enabled?: Enabled,
  options?: UseQueryOptions<TData>  
) => {
  const { data, isPending, isFetched, refetch, isFetching, isError } = useQuery<TData>({
    queryKey,
    queryFn,
    ...options,
  });

  return { data, isPending, isFetched, refetch, isFetching, isError };
};
