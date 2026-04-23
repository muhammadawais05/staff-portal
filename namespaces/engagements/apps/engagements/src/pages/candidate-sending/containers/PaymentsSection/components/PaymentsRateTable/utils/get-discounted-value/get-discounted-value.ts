const getDiscountedValue = (value: string) => {
  return Number(100 - Number(value) * 100).toFixed(0)
}

export default getDiscountedValue
