import {LatLngTuple} from "leaflet";

export interface IOffer {
  id: number;
  type: `apartment` | `room` | `house` | `hotel`;
  city: ICity;
  title: string;
  picture: string;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  coordinates: LatLngTuple;
  details: IDetails;
}

export interface IDetails {
  description: string;
  bedroomsCount: number;
  pictures: string[];
  maxGuests: number;
  insideItems: string[];
  host: IUser;
}

export interface IUser {
  id: number;
  avatar: string;
  name: string;
  isPro: boolean;
}

type Email = {
  email: string;
}

export type IUserWithEmail = IUser & Email;

export interface ICity {
  name: string;
  coordinates: LatLngTuple;
  zoom: number;
}

export interface IReview {
  id: number;
  comment: string;
  dateTime: Date;
  rating: number;
  user: IUser;
}

export enum RatingStarsCount {
  FIVE = `perfect`,
  FOUR = `good`,
  THREE = `not bad`,
  TWO = `badly`,
  ONE = `terribly`,
}