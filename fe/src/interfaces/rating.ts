export interface RatingInterface {
  rating: number;
  review?: string;
}

export interface RatingWithUserDetailsInterface extends RatingInterface {
  user_id: string;
}
