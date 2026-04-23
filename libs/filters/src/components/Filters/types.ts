import { ReactNode } from 'react'
import { Props as FormTagSelectorProps } from '@toptal/picasso-forms/TagSelector/TagSelector'
import { Item as AutocompleteItem } from '@toptal/picasso/Autocomplete/types'
import { FlattenSimpleInterpolation } from 'styled-components'
import { GridSize, ContainerProps } from '@toptal/picasso'

import { FilterConfigType } from '../../types'
import { FiltersTypeSelectorProps } from '../FiltersTypeSelector'
import { FiltersCityProps } from '../FiltersCity'

export type RadioFilterConfigOption = { label: string; value?: string }
export type SelectFilterConfigOption = { label: string; value?: string | null }
export type CheckboxFilterConfigOption = { label: string; value: string }
export type TypeSelectFilterConfigOption = { label: string; value?: string }
export type PresetFilterConfigOption = {
  label: string
  key: string
  values: {
    filter: string
    value: string | string[]
  }[]
}

export type RadioFilterConfigOptions = RadioFilterConfigOption[]
export type SelectFilterConfigOptions = SelectFilterConfigOption[]
export type CheckboxFilterConfigOptions = CheckboxFilterConfigOption[]
export type PresetFilterConfigOptions = PresetFilterConfigOption[]

export interface CommonFilterConfig {
  name: string
  label: string
  labelWidth?: number
  subFilter?: FilterConfig
  hidden?: boolean
  subCategoryName?: string
  render?: (filterElement: ReactNode) => ReactNode
}

export interface AutocompleteFilterConfig {
  type: FilterConfigType.AUTOCOMPLETE
  placeholder?: string
  noOptionsText?: string
  useGetOptions: () => {
    getOptions: ({ term }: { term: string }) => void
    options: AutocompleteItem[] | null | undefined
    loading: boolean
  }
  useGetFilterLabel: (filterValue: string | undefined) => {
    label: string | undefined
    loading: boolean
  }
  getKey?: (item: AutocompleteItem) => string | undefined
  getId?: (item: AutocompleteItem) => string | undefined
  getLabel?: (item: AutocompleteItem) => string
  renderOption?: (item: AutocompleteItem) => ReactNode
}

export interface CheckboxFilterConfig {
  type: FilterConfigType.CHECKBOX
  alignItems?: ContainerProps['alignItems']
  gridSize?: GridSize
  gridSizeSmall?: GridSize
  gridSizeMedium?: GridSize
  gridSizeLarge?: GridSize
  options: CheckboxFilterConfigOptions
  subFilter?: CommonFilterConfig & CheckboxFilterConfig
  loading?: boolean
}

export interface RadioFilterConfig {
  type: FilterConfigType.RADIO
  options: RadioFilterConfigOptions
  loading?: boolean
  subFilter?: FilterConfig
  gridSize?: GridSize
  gridSizeSmall?: GridSize
  gridSizeMedium?: GridSize
  gridSizeLarge?: GridSize
}

export interface SelectFilterConfig {
  type: FilterConfigType.SELECT
  options: SelectFilterConfigOptions
  parentProperty?: string
  loading?: boolean
  enableReset?: boolean
  placeholder?: string
}

export interface PresetFilterConfig {
  type: FilterConfigType.PRESET
  options: PresetFilterConfigOptions
}

export interface DateRangeFilterConfig {
  type: FilterConfigType.DATE_RANGE
  options?: { maxDate?: Date }
}

export interface AmountRangeFilterConfig {
  type: FilterConfigType.AMOUNT_RANGE
  options?: { min?: string; max?: string; maxLength?: number }
}

export interface SliderRangeFilterConfig {
  type: FilterConfigType.SLIDER_RANGE
  options: {
    min: number
    max: number
    minLabel: string
    maxLabel: string
    step?: number
    tooltipFormat?: string | ((value: number, index: number) => React.ReactNode)
    displayRender?: (value: number) => React.ReactNode
    fromPropertyName?: string
    tillPropertyName?: string
    minLabelStyles?: FlattenSimpleInterpolation
    maxLabelStyles?: FlattenSimpleInterpolation
  }
}

export interface TagSelectorFilterConfig
  extends Pick<
    FormTagSelectorProps,
    'loading' | 'width' | 'placeholder' | 'options'
  > {
  type: FilterConfigType.TAG_SELECTOR
}

export interface TypeSelectorFilterConfig extends FiltersTypeSelectorProps {
  type: FilterConfigType.TYPE_SELECTOR
}

export interface CityFilterConfig extends FiltersCityProps {
  type: FilterConfigType.CITY
}

export interface HiddenFilterValueObject {
  displayValue: string
  value: string
}

export interface HiddenFilterConfig {
  type: FilterConfigType.HIDDEN
}

export type FilterConfig = CommonFilterConfig &
  (
    | AmountRangeFilterConfig
    | AutocompleteFilterConfig
    | CheckboxFilterConfig
    | CityFilterConfig
    | DateRangeFilterConfig
    | HiddenFilterConfig
    | PresetFilterConfig
    | RadioFilterConfig
    | SelectFilterConfig
    | SliderRangeFilterConfig
    | TagSelectorFilterConfig
    | TypeSelectorFilterConfig
  )

export type FiltersRowConfig = [FilterConfig, FilterConfig] | [FilterConfig]

export type FiltersConfig = (FilterConfig | FiltersRowConfig)[]

export type FiltersContainerConfig = Partial<{
  padded: ContainerProps['padded']
  top: ContainerProps['top']
  bottom: ContainerProps['bottom']
}>
