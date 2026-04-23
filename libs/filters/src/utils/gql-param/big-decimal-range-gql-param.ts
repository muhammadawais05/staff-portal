interface BigDecimalRange {
  from?: number
  till?: number
}

export const BigDecimalRangeGqlParam = () => (value: unknown) =>
  value as BigDecimalRange
