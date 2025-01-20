import { calculateCartTotal } from "../price-calculator";

describe("calculateCartTotal()", () => {
  it("calculates the total of a number of cart items", () => {
    const total = calculateCartTotal([], 0.07);
    expect(total).toEqual({ status: "success", value: "0.00" });
  });
});