import type { Discount } from "@/types/discount";
import { calculateDiscountedPrice } from "../discount-calculator";

describe("calculateDiscountedPrice()", () => {
  it("calculates the final price with discounts correctly", () => {
    const discounts: Discount[] = [
        { type: "percentage", value: 10 },
        { type: "fixed", value: 5 },
    ];
    const finalPrice = calculateDiscountedPrice(100, discounts);
    expect(finalPrice).toBe(85.00);
  });
});