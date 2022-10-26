export type ScreenNav = {
    SignUp: undefined;
    LogIn: undefined;
    HomeScreen: undefined;
    ProfileScreen: undefined;
    MovieScreen: undefined;
    TvShowScreen: undefined;
    MovieDetailScreen:undefined;
}

export type userState = {
    id: string;
    email: string;
  }

  export type TVShow = {
    tile: string;
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