import React, { FC, memo, useCallback } from 'react'
import { Filters } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import ListSearchAutocomplete from '@staff-portal/billing/src/components/ListSearchAutocomplete'

import { useExpectedCommissionsListContext } from '../../context/ExpectedCommissionsListContext'
import { useFiltersConfig } from './utils/filterConfig'
import { searchBarCategories } from './utils/searchAutocompleteConfig'

const displayName = 'ExpectedCommissionsListSearch'

const ExpectedCommissionsListSearch: FC = memo(() => {
  const { urlValues, setUrlValues } = useExpectedCommissionsListContext()
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

ExpectedCommissionsListSearch.displayName = 'ExpectedCommissionsListSearch'

export default ExpectedCommissionsListSearch
