import { SelectFilterConfigOptions } from '@staff-portal/filters'

export const SelectFilterOptionGqlParam =
  (options: SelectFilterConfigOptions) => (value: unknown) =>
    options.find(({ label }) => value === label)?.value as string
