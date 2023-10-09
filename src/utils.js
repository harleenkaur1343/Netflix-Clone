export function getImageUrl(movie, isLarge) {
  const setpath = isLarge ? movie.poster_path : movie.backdrop_path;
  const paths = "https://image.tmdb.org/t/p/w500" + setpath;
  return paths;
}
