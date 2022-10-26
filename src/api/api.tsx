import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getUpcomingMoviesUrl,
  getMovieDetailUrl,
  getMovieCreditUrl,
  getMovieImageUrl,
  getMovieRecommendationsUrl,
  getSearchMovieUrl,
  getPopularTVShowUrl,
  getTopRatedTVShowUrl,
  getOnTheAirTVShowUrl,
  getSearchTvUrl,
  getTvShowDetailUrl,
  getTvShowCreditUrl,
  getTvShowImageUrl,
  getTvShowRecommendationsUrl,
  getMovieVideoUrl,
  getTvShowVideoUrl,
  getMustWatchMoviesUrl,
  getMustWatchTVShowUrl,
} from "./url";

export const request = async (url) => {
  return fetch(url)
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

export const requestMovieScreen = (callback) => {
  return Promise.all([
    request(getPopularMoviesUrl(1)),
    request(getTopRatedMoviesUrl(1)),
    request(getMustWatchMoviesUrl(1)),
    request(getUpcomingMoviesUrl(1)),
  ])
    .then((values) => callback(values))
};

export const requestMovieDetailScreen = (id, callback) => {
  return Promise.all([
    request(getMovieDetailUrl(id)),
    request(getMovieCreditUrl(id)),
    request(getMovieImageUrl(id)),
    request(getMovieVideoUrl(id)),
    request(getMovieRecommendationsUrl(id)),
  ])
    .then((values) => callback(values))
    .catch((error) => console.log(error));
};
