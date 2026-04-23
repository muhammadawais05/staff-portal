import React, { memo, useMemo } from 'react'
import { Container } from '@toptal/picasso'

import { FilterConfig, FiltersConfig, FiltersContainerConfig } from '../Filters'
import FiltersSelection from '../FiltersSelection'
import FiltersForm from '../FiltersForm'
import * as S from './styles'

interface Props {
  config: FiltersConfig
  containerConfig?: FiltersContainerConfig
  hasFiltersExpanded: boolean
}

const FiltersContent = ({
  config,
  containerConfig = {},
  hasFiltersExpanded
}: Props) => {
  const filtersList = useMemo(() => {
    return config.flat().reduce((result, item) => {
      result.push(item)

      if (item.subFilter) {
        result.push(item.subFilter)
      }

      return result
    }, [] as FilterConfig[])
  }, [config])

  return (
    <Container>
      {hasFiltersExpanded ? (
        <Container
          top='medium'
          padded='medium'
          css={S.filtersFormWrapper}
          data-testid='filters-content-form'
          {...containerConfig}
        >
          <FiltersForm config={config} />
        </Container>
      ) : (
        <Container top='xsmall' data-testid='filters-content-selection'>
          <FiltersSelection config={filtersList} />
        </Container>
      )}
    </Container>
  )
}

export default memo(FiltersContent)
