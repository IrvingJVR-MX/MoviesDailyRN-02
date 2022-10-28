export type TVShow = {
    title: string;
    data: TVShowDetail[]
  }
  
 export type TVShowDetail = {
    backdrop_path: string;
    first_air_date: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}
