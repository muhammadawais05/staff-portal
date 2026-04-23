import noop from '@toptal/picasso/utils/noop'
import { renderHook } from '@testing-library/react-hooks'

import { usePurchaseOrdersListContext } from '.'

const defaultProps = {
  filter: {},
  list: {
    data: undefined,
    initialLoading: false,
    loading: false,
    refetch: noop
  },
  onPageChange: noop,
  pageSize: 25,
  pagination: {
    limit: 0,
    offset: 0
  },
  resolving: false,
  setUrlValues: noop,
  totals: {
    data: undefined,
    initialLoading: false,
    loading: false,
    refetch: noop
  },
  urlValues: {}
}

describe('#usePurchaseOrdersListContext', () => {
  it('returns context data of purchase orders list', () => {
    const { result } = renderHook(() => usePurchaseOrdersListContext())

    expect(result.current).toEqual(defaultProps)
  })
})
