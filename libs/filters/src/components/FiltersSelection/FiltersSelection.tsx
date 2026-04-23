import React, { FC } from 'react'
import { Tag } from '@toptal/picasso'

import { FilterConfig, useFiltersContext } from '../Filters'
import AutocompleteLabelContent from './components/AutocompleteLabelContent'
import PresetLabelContent from './components/PresetLabelContent'
import TagSelectorOrCheckBoxLabelContent from './components/TagSelectorOrCheckBoxLabelContent'
import SelectOrRadioLabelContent from './components/SelectOrRadioLabelContent'
import AmountOrDateRangeLabelContent from './components/AmountOrDateRangeLabelContent'
import SliderRangeLabelContent from './components/SliderRangeLabelContent'
import HiddenLabelContent from './components/HiddenLabelContent'
import CityLabelContent from './components/CityLabelContent'
import TypeSelectorLabelContent from './components/TypeSelectorLabelContent'
import { FilterConfigType } from '../../types'

export interface Props {
  config: FilterConfig[]
}

const FilterLabelComponentMap: Record<
  FilterConfigType,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  FC<{ filterConfig: any }>
> = {
  [FilterConfigType.AUTOCOMPLETE]: AutocompleteLabelContent,
  [FilterConfigType.PRESET]: PresetLabelContent,
  [FilterConfigType.TAG_SELECTOR]: TagSelectorOrCheckBoxLabelContent,
  [FilterConfigType.CHECKBOX]: TagSelectorOrCheckBoxLabelContent,
  [FilterConfigType.RADIO]: SelectOrRadioLabelContent,
  [FilterConfigType.SELECT]: SelectOrRadioLabelContent,
  [FilterConfigType.AMOUNT_RANGE]: AmountOrDateRangeLabelContent,
  [FilterConfigType.DATE_RANGE]: AmountOrDateRangeLabelContent,
  [FilterConfigType.SLIDER_RANGE]: SliderRangeLabelContent,
  [FilterConfigType.HIDDEN]: HiddenLabelContent,
  [FilterConfigType.TYPE_SELECTOR]: TypeSelectorLabelContent,
  [FilterConfigType.CITY]: CityLabelContent
}

const FiltersSelection = ({ config }: Props) => {
  const { hasSelectedFilterValue } = useFiltersContext()
  const content = config
    .filter(
      ({ name, subCategoryName }) =>
        hasSelectedFilterValue(name) ||
        (subCategoryName && hasSelectedFilterValue(subCategoryName))
    )
    .map(filterConfig => {
      const { name, type } = filterConfig

      const FilterLabel = FilterLabelComponentMap[type]

      return <FilterLabel key={name} filterConfig={filterConfig} />
    })

  return (
    <div data-testid='filters-selection'>
      {content.length ? <Tag.Group>{content}</Tag.Group> : null}
    </div>
  )
}

export default FiltersSelection
