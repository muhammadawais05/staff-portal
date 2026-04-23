import React, { memo } from 'react'
import { Container, Button, Filter16, Tooltip } from '@toptal/picasso'

import FiltersSort from '../FiltersSort'
import FiltersPageSize from '../FiltersPageSize'
import * as S from './styles'
import { SortOption } from '../../types'

interface Props {
  sortOptions?: SortOption[]
  limitOptions?: number[]
  setHasFilterExpanded: (value: boolean) => void
  hasFiltersExpanded: boolean
  filtersSize?: 'small' | 'medium'
}

const FiltersHeader = ({
  sortOptions,
  limitOptions,
  hasFiltersExpanded,
  setHasFilterExpanded,
  filtersSize = 'medium'
}: Props) => (
  <Container flex justifyContent='flex-end' data-testid='filters-header'>
    {!!sortOptions?.length && (
      <Container right='small'>
        <FiltersSort options={sortOptions} filtersSize={filtersSize} />
      </Container>
    )}

    {!!limitOptions?.length && (
      <Container right='small'>
        <FiltersPageSize options={limitOptions} filtersSize={filtersSize} />
      </Container>
    )}

    <Tooltip content='Filter'>
      <Button.Circular
        onClick={() => setHasFilterExpanded(!hasFiltersExpanded)}
        aria-label='Filter'
        active={hasFiltersExpanded}
        variant='flat'
        icon={<Filter16 />}
        css={filtersSize === 'medium' ? S.mediumFilterButton : undefined}
        data-testid='toggle-filters-form'
      />
    </Tooltip>
  </Container>
)

export default memo(FiltersHeader)
