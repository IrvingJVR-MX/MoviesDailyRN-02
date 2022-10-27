export type MovieDetail = {
    id: number;
    video: boolean;
    backdrop_path: String;
    original_title: String;
    overview: String;
    popularity: String;
    poster_path: String;
    release_date: String;
    vote_average: String;
    vote_count: number;
    title: string;
  }
  
 export type Movie = {
    tile: string;
    data: MovieDetail[]
  }


  

export type MovieRecommendationDetail = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieRecommendation = {
  page: number;
  results: MovieRecommendationDetail[];
  total_pages: number;
  total_results: number;
}
