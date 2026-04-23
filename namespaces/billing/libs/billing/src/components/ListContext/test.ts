import { createContext } from 'react'
import noop from '@toptal/picasso/utils/noop'

import { createListContext } from '.'

jest.mock('react')

describe('ListContext', () => {
  it('works properly', () => {
    const result = {
      list: {
        data: undefined,
        loading: false,
        refetch: noop,
        initialLoading: false
      },
      totals: {
        data: undefined,
        loading: false,
        refetch: noop,
        initialLoading: false
      },
      filter: {},
      pagination: { limit: 0, offset: 0 },
      pageSize: 25,
      onPageChange: noop,
      resolving: false,
      setUrlValues: noop,
      urlValues: {}
    }

    createListContext()

    expect(createContext).toHaveBeenCalledWith(result)
  })
})
