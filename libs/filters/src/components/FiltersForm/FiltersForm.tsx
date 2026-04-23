import React from 'react'
import { Grid } from '@toptal/picasso'

import { FiltersConfig, FilterConfig } from '../Filters'
import FiltersAutocomplete from '../FiltersAutocomplete'
import FiltersCheckbox from '../FiltersCheckbox'
import FiltersSingleChoice from '../FiltersSingleChoice'
import FiltersDateRange from '../FiltersDateRange'
import FiltersAmountRange from '../FiltersAmountRange'
import FiltersSliderRange from '../FiltersSliderRange'
import FiltersPreset from '../FiltersPreset'
import FiltersTagSelector from '../FiltersTagSelector'
import FiltersTypeSelector from '../FiltersTypeSelector'
import FiltersCity from '../FiltersCity'
import * as S from './styles'
import { FilterConfigType } from '../../types'

const ONE_COLUMN = 1
const TWO_COLUMNS = 2

interface Props {
  config: FiltersConfig
}

type FilterRendererOptions = { totalColumns: number }

// eslint-disable-next-line complexity
export const renderFilter = (
  filterConfig: FilterConfig,
  options?: FilterRendererOptions
) => {
  switch (filterConfig.type) {
    case FilterConfigType.AUTOCOMPLETE: {
      return (
        <FiltersAutocomplete
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          useGetOptions={filterConfig.useGetOptions}
          useGetFilterLabel={filterConfig.useGetFilterLabel}
          getKey={filterConfig.getKey}
          getId={filterConfig.getId}
          getLabel={filterConfig.getLabel}
        />
      )
    }
    case FilterConfigType.CHECKBOX: {
      return (
        <FiltersCheckbox
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          alignItems={filterConfig.alignItems}
          gridSizeSmall={filterConfig.gridSizeSmall || filterConfig.gridSize}
          gridSizeMedium={filterConfig.gridSizeMedium || filterConfig.gridSize}
          gridSizeLarge={filterConfig.gridSizeLarge || filterConfig.gridSize}
          options={filterConfig.options}
          loading={filterConfig.loading}
          subFilter={filterConfig.subFilter}
        />
      )
    }
    case FilterConfigType.RADIO: {
      return (
        <FiltersSingleChoice
          type='radio'
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          options={filterConfig.options}
          subFilter={filterConfig.subFilter}
          gridSizeSmall={filterConfig.gridSizeSmall || filterConfig.gridSize}
          gridSizeMedium={filterConfig.gridSizeMedium || filterConfig.gridSize}
          gridSizeLarge={filterConfig.gridSizeLarge || filterConfig.gridSize}
        />
      )
    }
    case FilterConfigType.SELECT: {
      return (
        <FiltersSingleChoice
          type='select'
          key={filterConfig.name}
          name={filterConfig.name}
          subCategoryName={filterConfig.subCategoryName}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          options={filterConfig.options}
          loading={filterConfig.loading}
          enableReset={filterConfig.enableReset}
          placeholder={filterConfig.placeholder}
        />
      )
    }
    case FilterConfigType.DATE_RANGE: {
      return (
        <FiltersDateRange
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          totalColumns={options?.totalColumns || ONE_COLUMN}
          maxDate={filterConfig.options?.maxDate}
        />
      )
    }
    case FilterConfigType.AMOUNT_RANGE: {
      return (
        <FiltersAmountRange
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          min={filterConfig.options?.min}
          max={filterConfig.options?.max}
        />
      )
    }
    case FilterConfigType.SLIDER_RANGE: {
      return (
        <FiltersSliderRange
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          options={filterConfig.options}
          render={filterConfig.render}
        />
      )
    }
    case FilterConfigType.PRESET: {
      return (
        <FiltersPreset
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          options={filterConfig.options}
        />
      )
    }
    case FilterConfigType.TAG_SELECTOR: {
      return (
        <FiltersTagSelector
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          loading={filterConfig.loading}
          placeholder={filterConfig.placeholder}
          options={filterConfig.options}
        />
      )
    }
    case FilterConfigType.TYPE_SELECTOR: {
      return (
        <FiltersTypeSelector
          key={filterConfig.name}
          name={filterConfig.name}
          subCategoryName={filterConfig.subCategoryName}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          loading={filterConfig.loading}
          placeholder={filterConfig.placeholder}
          searchPlaceholder={filterConfig.searchPlaceholder}
          options={filterConfig.options}
        />
      )
    }
    case FilterConfigType.CITY: {
      return (
        <FiltersCity
          key={filterConfig.name}
          name={filterConfig.name}
          label={filterConfig.label}
          labelWidth={filterConfig.labelWidth}
          placeholder={filterConfig.placeholder}
          width={filterConfig.width}
          noOptionsText={filterConfig.noOptionsText}
        />
      )
    }
    case FilterConfigType.HIDDEN: {
      return null
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const exhaustivenssCheck: never = filterConfig
    }
  }
}

const FiltersForm = ({ config }: Props) => {
  const rows = config.map(filterConfig => {
    if (Array.isArray(filterConfig)) {
      const key = filterConfig.map(({ name }) => name).join('-')

      return (
        <Grid.Item small={12} key={key}>
          <Grid spacing={16}>
            {filterConfig.map(filterRowConfig => (
              <Grid.Item key={filterRowConfig.name} small={6}>
                {renderFilter(filterRowConfig, { totalColumns: TWO_COLUMNS })}
              </Grid.Item>
            ))}
          </Grid>
        </Grid.Item>
      )
    }

    if (filterConfig.type === FilterConfigType.HIDDEN) {
      return null
    }

    return (
      <Grid.Item key={filterConfig.name} small={12}>
        {renderFilter(filterConfig)}
      </Grid.Item>
    )
  })

  return (
    <Grid css={S.filtersGrid} spacing={0} data-testid='filters-form'>
      {rows}
    </Grid>
  )
}

export default FiltersForm
