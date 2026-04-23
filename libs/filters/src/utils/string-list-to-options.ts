import { SelectFilterConfigOptions } from '..'

export const stringListToOptions = (
  list?: (string | number)[] | null
): SelectFilterConfigOptions =>
  list?.map(item => ({ label: String(item), value: String(item) })) || []
