export const convertConfigurationToFilterOptions = (
  configuration: Record<string, string | { label: string; value: string }>
) =>
  Object.keys(configuration).map(key => {
    const data = configuration[key]

    if (typeof data === 'string') {
      return {
        value: key,
        label: data
      }
    }

    return data
  })
