import type { Discount } from "../types/discount";

/*
    Example usage 1
    calculate final price by applying all discounts on the price
    const price = 100;
    
    const discounts = [
        { type: "percentage", value: 10 },
        { type: "fixed", value: 5 },
    ];

    calculateDiscountedPrice(price, discounts); // 85.00

 */
export function calculateDiscountedPrice(
  price: number,
  discounts: Discount[]
): number {
  return 0;
}
