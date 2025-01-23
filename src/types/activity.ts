import type { Discount } from "./discount";


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
