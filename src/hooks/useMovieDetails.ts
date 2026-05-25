import {
  useQuery,
} from "@tanstack/react-query";

import {
  getMovieDetails,
} from "../services/api";

function useMovieDetails(
  id: string | undefined
) {
  const query = useQuery({
    queryKey: [
      "movie",
      id,
    ],

    queryFn: () =>
      getMovieDetails(
        id as string
      ),

    enabled: Boolean(id),
  });

  return {
    movie:
      query.data || null,

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

export default useMovieDetails;