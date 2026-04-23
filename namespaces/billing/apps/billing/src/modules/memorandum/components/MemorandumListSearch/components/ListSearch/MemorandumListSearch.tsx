import React, { FC, memo, useCallback } from 'react'
import { Filters } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import ListSearchAutocomplete from '@staff-portal/billing/src/components/ListSearchAutocomplete'

import { useFiltersConfig, searchBarCategories } from '../../utils'
import { useMemorandumListContext } from '../../../../context/MemorandumListContext'

const displayName = 'MemorandumListSearch'

const MemorandumListSearch: FC = memo(() => {
  const { urlValues, setUrlValues } = useMemorandumListContext()
  const { filtersConfig } = useFiltersConfig()
  const onChange = useCallback(
    (values: QueryParams) =>
      setUrlValues({ ...values, page: 1 }, { skipScrollToTop: true }),
    [setUrlValues]
  )

  return (
    <Filters
      values={urlValues}
      config={filtersConfig}
      onChange={onChange}
      data-testid={displayName}
    >
      {nestableControls => (
        <ListSearchAutocomplete
          nestableControls={nestableControls}
          searchBarCategories={searchBarCategories}
        />
      )}
    </Filters>
  )
})

MemorandumListSearch.displayName = 'MemorandumListSearch'

export default MemorandumListSearch
