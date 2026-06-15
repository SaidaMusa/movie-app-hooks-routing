import { FixedSizeGrid as Grid } from "react-window";
import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";

type Props = {
  movies: Movie[];
};

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: {
    movies: Movie[];
    columnCount: number;
  };
};

function Cell({ columnIndex, rowIndex, style, data }: CellProps) {
  const { movies, columnCount } = data;

  const index = rowIndex * columnCount + columnIndex;
  const movie = movies[index];

  if (!movie) return null;

  return (
    <div
      style={{
        ...style,
        padding: 10,
        boxSizing: "border-box",
      }}
    >
      <MovieCard movie={movie} />
    </div>
  );
}

export default function MovieList({ movies }: Props) {
  const columnCount = 5;

  return (
    <div className="gridWrapper">
      <Grid
        columnCount={columnCount}
        columnWidth={220}
        height={700}
        rowCount={Math.ceil(movies.length / columnCount)}
        rowHeight={260}
        width={1100}
        itemData={{ movies, columnCount }}
      style={{
    overflow: "hidden",
  }}
      >
        {Cell}
      </Grid>
    </div>
  );
}