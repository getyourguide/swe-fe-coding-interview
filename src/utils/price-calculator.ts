import { getTax } from '@/utils/tax';
import type { CartItem } from '@/types/cart-item';

/*
  Example usage 1,
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
  const total = calculateCartTotal(items);
  cosole.log(total); // { status: "success", total: "38.49" }


  --------------------------------------------
  Example usage 2,
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
      priceBeforeTax: 9.99,
      name: "Product 2",
    },
    {
      priceBeforeTax: 5.99,
      name: "Product 4",
    },
  ];
  const total = calculateCartTotal(items);
  cosole.log(total); // { status: "error", message: "Cart has duplicate items" }
  */

type CartTotalResult =
  | { status: 'success'; total: string }
  | { status: 'error'; message: string };

export function calculateCartTotal(cartItems: CartItem[]): CartTotalResult {
  const tax = getTax();
  return {
    status: 'success',
    total: '0.00',
  };
}
