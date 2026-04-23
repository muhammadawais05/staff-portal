export const convertConfigurationToFilterOptions = (
  configuration: Record<string, string>
) =>
  Object.keys(configuration).map(key => ({
    value: key,
    label: configuration[key]
  }))
