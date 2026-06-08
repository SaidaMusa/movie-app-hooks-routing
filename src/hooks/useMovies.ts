import {
  useQuery,
} from "@tanstack/react-query";

import {
  getMovies,
} from "../services/api";

function useMovies(
  page: number,
  search: string
) {
  const query = useQuery({
    queryKey: [
      "movies",
      page,
      search,
    ],

    queryFn: () =>
      getMovies(
        page,
        search
      ),

    staleTime: 0,

    refetchOnWindowFocus:
      false,
  });

  return {
    movies:
      query.data?.results ||
      [],

    loading:
      query.isLoading,

    error:
      query.error,

    refetch:
      query.refetch,

    isFetching:
      query.isFetching,
  };
}

export default useMovies;