import { CartItem } from "@/types/cart-item";

export function calculateCartTotal(cartItems: CartItem[], tax?: number): string {
  return "";
}

/*
  example usage
  const items = [
    {
    price: 19.99,
    name: "Product 1",
    },
    {
    price: 9.99,
    name: "Product 2",
    },
    {
    price: 9.99,
    name: "Product 2",
    },
    {
    price: 5.99,
    name: "Product 4",
    },
  ];
  const tax = 0.07;
  const total = calculateCartTotal(items, tax);
  cosole.log(total); // 36.04
  */


