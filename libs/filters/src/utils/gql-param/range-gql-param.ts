interface Range {
  from?: number
  to?: number
}

export const RangeGqlParam = () => (value: unknown) => {
  const { from, to } = value as Range

  return {
    ...((from || from === 0) && {
      from
    }),
    ...((to || to === 0) && {
      to
    })
  } as Range
}
