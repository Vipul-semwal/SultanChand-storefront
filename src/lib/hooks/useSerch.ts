import { sdk } from "@lib/config";
import { useQueryData } from "@lib/hooks/useQueryData";

type Author = {
  id: string;
  name: string;
  description: string;
  image: string;
  subText: string;
};

type AuthorsResponse = {
  author: Author[];
  count: number;
  limit: number;
  offset: number;
};

 const useSerch = (name: string, query: string, limit = 10, offset = 0) => {
  const {isFetching,data,isError}=  useQueryData<AuthorsResponse>(
    ["authors", name, query, limit, offset],
    () =>
      sdk.client.fetch(`/store/authors`, {
        query: { name, query, limit, offset },
      }),
    true,
    {
      queryKey: [`author`, name, query, limit, offset],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
    return {isFetching,data,isError}
};

export default useSerch;