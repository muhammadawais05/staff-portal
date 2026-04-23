export const formatMissingFields = (emptyFields: string[]) =>
  emptyFields.reduce(
    (formattedString, field, index) =>
      `${formattedString} ${
        index === emptyFields.length - 1 ? 'and' : ''
      } ${field}
    ${
      index !== emptyFields.length - 2 && index !== emptyFields.length - 1
        ? ','
        : ''
    }`,
    ''
  )
