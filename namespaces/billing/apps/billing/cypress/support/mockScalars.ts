export default {
  BigDecimal: (
    obj: { [key: string]: string | number },
    args: unknown,
    context: unknown,
    field: { [key: string]: string | number }
    // eslint-disable-next-line
  ) => {
    if (obj[field.fieldName]) {
      return obj[field.fieldName]
    }

    return 15
  },
  Date: (
    obj: { [key: string]: string | number },
    args: unknown,
    context: unknown,
    field: { [key: string]: string | number }
    // eslint-disable-next-line
  ) => {
    if (obj[field.fieldName]) {
      return obj[field.fieldName]
    }

    return new Date('2019-01-01')
  },
  ISO8601DateTime: (
    obj: { [key: string]: string | number },
    args: unknown,
    context: unknown,
    field: { [key: string]: string | number }
    // eslint-disable-next-line
  ) => {
    if (obj[field.fieldName]) {
      return obj[field.fieldName]
    }

    return new Date('2019-01-01')
  }
}
