import { calculateCartTotal } from "../price-calculator";
// import { getTax } from "../utils/tax";

describe("calculateCartTotal()", () => {
  it("calculates the total of a number of cart items", () => {
    const total = calculateCartTotal([]);
    expect(total).toEqual({ status: "success", total: "0.00" });
  });
});

