import type { CartItem } from "@/types/cart-item";

export function calculateCartTotal(cartItems: CartItem[], governmentTax?: number): string {
  return "";
}

/*
  Example usage
  const items = [
    {
    priceBeforeTax: 19.99,
    name: "Product 1",
    },
    {
    priceBeforeTax: 9.99,
    name: "Product 2",
    },
    {
    priceBeforeTax: 5.99,
    name: "Product 4",
    },
  ];
  const tax = 0.07;
  const total = calculateCartTotal(items, tax);
  cosole.log(total); // 36.18
  */


