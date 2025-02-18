import type { Discount } from "./discount";

export type ActivitiesType = "new" | "hot" | "offers";
export interface Activity {
  id: number;
  title: string;
  image: string;
  price: 59;
  currency: "$" | "€";
  rating: number;
  specialOffer: boolean;
  supplierId: number;
  discounts?: Discount[];
}
