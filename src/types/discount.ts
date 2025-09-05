type DiscountType = 'percentage' | 'fixed' | 'buy-one-get-one-free';

type DiscountValue<T extends DiscountType> = T extends 'percentage' | 'fixed'
  ? number
  : never;

export interface Discount {
  type: DiscountType;
  value: DiscountValue<DiscountType>;
}
