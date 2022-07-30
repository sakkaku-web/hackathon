export interface ShautMessageRequest {
  text: string;
  userId: string;
  radius: number;
}

export interface Coordinate {
  long: number;
  lat: number;
}

export interface ShautMessage {
  text: string;
  user: string;
  coordinate: Coordinate;
  time: string;
}

export interface ShautUser {
  id: string;
  name: string;
  coordinate: Coordinate;
}
