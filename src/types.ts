export type Cell = number | undefined;

export interface RouteType {
  id: number;
  imgMedium: string;
  imgSmall: string;
  imgSmallMed: string;
  imgSqSmall: string;
  latitude: number;
  longitude: number;
  location: string[];
  name: string;
  pitches: unknown;
  rating: string;
  starVotes: number;
  stars: number;
  type: string;
  url: string;
}

export interface YoutubeVideoType {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
  };
}
