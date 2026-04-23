import { Filters } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import React, { FC, memo, useCallback } from 'react'
import ListSearchAutocomplete from '@staff-portal/billing/src/components/ListSearchAutocomplete'

import { searchBarCategories } from './searchAutocompleteConfig'
import { useFiltersConfig } from './filters-config'
import { useInvoiceListContext } from '../../../contexts/invoiceListContext'

const displayName = 'InvoiceListSearch'

const InvoiceListSearch: FC = memo(() => {
  const { urlValues, setUrlValues } = useInvoiceListContext()
  const onChange = useCallback(
    (values: QueryParams) =>
      setUrlValues({ ...values, page: 1 }, { skipScrollToTop: true }),
    [setUrlValues]
  )

  const { filtersConfig } = useFiltersConfig()

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

InvoiceListSearch.displayName = displayName

export default InvoiceListSearch
