import React, { ChangeEvent } from 'react'
import {
  Container,
  Grid,
  Radio,
  Select,
  GridSize,
  TypographyOverflow
} from '@toptal/picasso'
import { toTitleCase } from '@toptal/picasso/utils'
import { Option } from '@toptal/picasso/Select'

import {
  SelectFilterConfigOptions,
  RadioFilterConfigOptions,
  useFiltersContext,
  CommonFilterConfig
} from '../Filters'
import FiltersField from '../Filters/FiltersField'
import * as S from './styles'
import { renderFilter } from '../FiltersForm/FiltersForm'
import FiltersGridItem from '../FiltersGridItem'

export type SingleChoiceType = 'radio' | 'select'

const DEFAULT_SINGLE_CHOICE_TYPE = 'radio'

const getDisplayValue = (item: Option | null) =>
  toTitleCase(item?.text ?? '') as string

export type Props = Pick<
  CommonFilterConfig,
  'name' | 'label' | 'labelWidth' | 'subFilter' | 'subCategoryName'
> & {
  type?: SingleChoiceType
  options: RadioFilterConfigOptions | SelectFilterConfigOptions
  loading?: boolean
  enableReset?: boolean
  placeholder?: string
  parentProperty?: string
  gridSizeSmall?: GridSize
  gridSizeMedium?: GridSize
  gridSizeLarge?: GridSize
}

const FiltersSingleChoice = ({
  type = DEFAULT_SINGLE_CHOICE_TYPE,
  name,
  subCategoryName,
  label,
  labelWidth,
  options,
  loading = false,
  subFilter,
  enableReset = false,
  placeholder,
  gridSizeSmall = 2,
  gridSizeMedium = 2,
  gridSizeLarge = 2
}: Props) => {
  const { getFilterValue, setFilterValue } = useFiltersContext()
  const filterValue = subCategoryName
    ? (getFilterValue(name) as Record<string, string>)?.[subCategoryName]
    : (getFilterValue(name) as string | undefined) || ''

  const handleChange = (_: React.ChangeEvent<{}>, value: string) =>
    setFilterValue(name, value)

  let control

  switch (type) {
    case 'radio':
      control = (
        <Container css={S.radioGroupContainer}>
          <Radio.Group
            name={name}
            value={filterValue}
            onChange={handleChange}
            data-testid='Filters-select-single-choice'
          >
            <Grid spacing={16}>
              {(options as RadioFilterConfigOptions).map(
                ({ label: optionLabel, value }) => (
                  <FiltersGridItem
                    css={S.gridItem}
                    key={String(value)}
                    small={gridSizeSmall}
                    medium={gridSizeMedium}
                    large={gridSizeLarge}
                  >
                    <Radio
                      label={
                        <TypographyOverflow>{optionLabel}</TypographyOverflow>
                      }
                      value={value}
                    />
                  </FiltersGridItem>
                )
              )}
            </Grid>
          </Radio.Group>
        </Container>
      )
      break

    case 'select': {
      const optionsForSelect = (options as SelectFilterConfigOptions).map(
        option => ({
          value: option.value || '',
          text: option.label
        })
      )

      const onSelectChange = (
        event: ChangeEvent<{ name?: string; value: unknown }>
      ) => {
        if (subCategoryName) {
          const prevValues = getFilterValue(name) || {}

          setFilterValue(name, {
            ...(prevValues as Record<string, string>),
            [subCategoryName]: event.target.value
          })
        } else {
          setFilterValue(name, event.target.value)
        }
      }

      control = (
        <Select
          // TODO: remove "key" when https://toptal-core.atlassian.net/browse/FX-683 is fixed, right now the value
          // prop needs to be taken into account when options are provided after the value (on next tick)
          key={optionsForSelect.length}
          data-testid='Filters-select-single-choice'
          id={name}
          options={optionsForSelect}
          value={filterValue}
          onChange={onSelectChange}
          getDisplayValue={getDisplayValue}
          renderOption={getDisplayValue}
          loading={loading}
          enableReset={enableReset}
          placeholder={placeholder}
          css={S.select}
          testIds={{
            resetButton: 'reset-adornment'
          }}
        />
      )
      break
    }
  }

  return (
    <Container>
      <FiltersField
        key={name}
        htmlFor={name}
        label={label}
        labelWidth={labelWidth}
      >
        {control}
      </FiltersField>
      {subFilter && (
        <Container padded='small' top={1} css={S.subFilters}>
          {renderFilter(subFilter)}
        </Container>
      )}
    </Container>
  )
}

export default FiltersSingleChoice
