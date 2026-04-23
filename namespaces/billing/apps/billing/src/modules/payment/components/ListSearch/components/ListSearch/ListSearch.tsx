import { Filters } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import React, { FC, memo, useCallback } from 'react'
import ListSearchAutocomplete from '@staff-portal/billing/src/components/ListSearchAutocomplete'

import { usePaymentListContext } from '../../../../context/PaymentListContext'
import { useFiltersConfig } from './filtersConfig'
import { searchBarCategories } from './searchAutocompleteConfig'

const displayName = 'ListSearch'

const ListSearch: FC = memo(() => {
  const { urlValues, setUrlValues } = usePaymentListContext()
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

ListSearch.displayName = displayName

export default ListSearch
