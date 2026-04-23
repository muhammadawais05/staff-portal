import React, { FC, memo, useCallback } from 'react'
import { Filters } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import ListSearchAutocomplete from '@staff-portal/billing/src/components/ListSearchAutocomplete'

import { searchBarCategories } from '../../utils'
import { usePurchaseOrdersListContext } from '../../../../context/PurchaseOrdersListContext'

const displayName = 'PurchaseOrderListSearch'

const PurchaseOrderListSearch: FC = memo(() => {
  const { urlValues, setUrlValues } = usePurchaseOrdersListContext()
  const onChange = useCallback(
    (values: QueryParams) =>
      setUrlValues({ ...values, page: 1 }, { skipScrollToTop: true }),
    [setUrlValues]
  )

  return (
    <Filters values={urlValues} onChange={onChange} data-testid={displayName}>
      {() => (
        <ListSearchAutocomplete searchBarCategories={searchBarCategories} />
      )}
    </Filters>
  )
})

PurchaseOrderListSearch.displayName = 'PurchaseOrderListSearch'

export default PurchaseOrderListSearch
