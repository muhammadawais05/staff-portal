import React, { useMemo } from 'react'
import { Container, Select, Tooltip } from '@toptal/picasso'

import { useFiltersContext } from '../Filters'
import * as S from './styles'

export interface Props {
  options: number[]
  filtersSize: 'small' | 'medium'
}

const LIMIT_KEY = 'limit'

const FiltersPageSize = ({ options, filtersSize }: Props) => {
  const { getFilterValue, setFilterValue } = useFiltersContext()
  const pageSize = getFilterValue<number>(LIMIT_KEY)

  const limitOptions = useMemo(
    () =>
      options.map(value => ({
        value,
        text: value.toString()
      })),
    [options]
  )

  return (
    <Tooltip content='Results per page'>
      <Container>
        <Select
          size={filtersSize}
          css={S.pageSizeSelect}
          options={limitOptions}
          menuWidth='3.8 rem'
          value={pageSize}
          onChange={({ target: { value } }) => setFilterValue(LIMIT_KEY, value)}
        />
      </Container>
    </Tooltip>
  )
}

export default FiltersPageSize
