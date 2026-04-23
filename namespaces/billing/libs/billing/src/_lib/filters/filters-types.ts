import {
  FilterConfig,
  FiltersConfig,
  SelectFilterConfigOptions
} from '@staff-portal/filters'
export { FilterConfig, FiltersConfig, SelectFilterConfigOptions }

export type DropdownOptions = SelectFilterConfigOptions

export type FilterKeyMapItem = FilterConfig | (() => FilterConfig)
export type FiltersKeyMapRow =
  | [FilterKeyMapItem, FilterKeyMapItem]
  | [FilterKeyMapItem]
export type FiltersKeyMapConfig = (FilterKeyMapItem | FiltersKeyMapRow)[]
