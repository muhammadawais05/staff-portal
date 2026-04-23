import React, { ChangeEvent } from 'react'
import {
  Grid,
  Checkbox,
  Container,
  ContainerProps,
  GridSize,
  TypographyOverflow,
  SkeletonLoader
} from '@toptal/picasso'

import * as S from './styles'
import { useFiltersContext } from '../Filters/FiltersContext'
import FiltersField from '../Filters/FiltersField'
import FiltersGridItem from '../FiltersGridItem'
import { CommonFilterConfig } from '../Filters'

export type Props = Pick<
  CommonFilterConfig,
  'name' | 'label' | 'labelWidth'
> & {
  alignItems?: ContainerProps['alignItems']
  gridSizeSmall?: GridSize
  gridSizeMedium?: GridSize
  gridSizeLarge?: GridSize
  options: { label: string; value: string; highlightWhenChecked?: boolean }[]
  subFilter?: Props
  loading?: boolean
}

interface GridItemData {
  filterName: string
  label: string
  value: string
  highlightWhenChecked?: boolean
}

const FiltersCheckbox = ({
  name,
  label: filterLabel,
  labelWidth: filterLabelWidth,
  alignItems = 'flex-start',
  gridSizeSmall = 2,
  gridSizeMedium = 2,
  gridSizeLarge = 2,
  options,
  subFilter,
  loading
}: Props) => {
  const {
    hasSelectedGroupFilterOption,
    setGroupFilterOptionValue,
    clearGroupFilterOptionValue,
    isDisabledByPreset
  } = useFiltersContext()

  const getChangeHandler =
    (filterName: string, value: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setGroupFilterOptionValue(filterName, value)
      } else {
        clearGroupFilterOptionValue(filterName, value)
      }
    }

  const renderGridItem = ({
    filterName,
    label,
    value,
    highlightWhenChecked
  }: GridItemData) => {
    const checked = hasSelectedGroupFilterOption(filterName, value)

    return (
      <FiltersGridItem
        key={value}
        small={gridSizeSmall}
        medium={gridSizeMedium}
        large={gridSizeLarge}
        css={[
          S.gridItem,
          checked && highlightWhenChecked && S.gridItemHighlighted
        ]}
      >
        <Checkbox
          label={
            <TypographyOverflow css={S.labelTypography}>
              {label}
            </TypographyOverflow>
          }
          value={value}
          disabled={isDisabledByPreset(filterName)}
          checked={checked}
          onChange={getChangeHandler(filterName, value)}
          data-testid='filter-checkbox'
        />
      </FiltersGridItem>
    )
  }

  return (
    <>
      <Container css={S.filtersField}>
        <FiltersField
          key={name}
          label={filterLabel}
          labelWidth={filterLabelWidth}
          alignItems={alignItems}
        >
          {loading ? (
            <SkeletonLoader.Typography />
          ) : (
            <Grid spacing={16} css={S.grid}>
              {options.map(args =>
                renderGridItem({ filterName: name, ...args })
              )}
            </Grid>
          )}
        </FiltersField>
      </Container>

      {subFilter && (
        <Container padded='small' top={1} css={S.subFilters}>
          <FiltersField
            key={subFilter.name}
            label={subFilter.label}
            alignItems={alignItems}
            paddingLeftLabel={1}
          >
            <Grid spacing={16} css={S.grid}>
              {subFilter.options.map(args =>
                renderGridItem({ filterName: subFilter.name, ...args })
              )}
            </Grid>
          </FiltersField>
        </Container>
      )}
    </>
  )
}

export default FiltersCheckbox
