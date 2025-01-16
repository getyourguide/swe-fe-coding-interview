/*
  example usage
  const prices = [19.99, 9.99, 4.99];
  const tax = 0.07;
  const total = calculateTotal(prices, tax);
  cosole.log(total); // 38.67
  */

export function calculateTotal(prices: number[], tax?: number): string {
  let total = 0;
  for (let i = 0; i < prices.length; i++) {
    total += prices[i];
  }
  total = total + total * tax!;
  return total.toFixed(2);
}
