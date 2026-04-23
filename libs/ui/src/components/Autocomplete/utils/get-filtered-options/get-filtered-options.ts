const getFilteredOptions = <TOption extends Record<string, unknown>>(
  options: TOption[],
  filterFunction?: (option: TOption) => string | null | undefined
) => {
  if (!filterFunction) {
    return options
  }

  return options.filter((option: TOption) => {
    const result = filterFunction(option)

    return result !== null && result !== undefined
  })
}

export default getFilteredOptions
