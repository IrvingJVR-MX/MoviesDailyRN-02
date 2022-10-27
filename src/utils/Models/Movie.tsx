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