import { renderHook } from '@testing-library/react-hooks'
import React, { ComponentProps, ReactNode, useContext } from 'react'
import noop from '@toptal/picasso/utils/noop'
import { MemorandumsFilter } from '@staff-portal/graphql/staff'
import { ListContextType } from '@staff-portal/billing/src/components/ListContext'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  MemorandumListContext,
  MemorandumListQueryParams,
  useMemorandumListContext
} from '.'
import { GetMemorandumsListQuery } from '../../data'

const renderProps = {
  value: {
    list: {
      data: undefined,
      loading: false,
      refetch: noop,
      initialLoading: false
    },
    filter: {},
    pagination: { limit: 0, offset: 0 },
    pageSize: 25,
    onPageChange: jest.fn(),
    resolving: false,
    setUrlValues: jest.fn(),
    urlValues: {}
  }
}

const render = (
  children: ReactNode,
  props: ComponentProps<typeof MemorandumListContext.Provider>
) =>
  renderComponent(
    <MemorandumListContext.Provider {...props}>
      {children}
    </MemorandumListContext.Provider>
  )

describe('MemorandumListContext.Provider', () => {
  it('#useMemorandumListContext', () => {
    const { result } = renderHook(() => useMemorandumListContext())

    expect(result.current).toEqual({
      ...renderProps.value,
      totals: {
        data: undefined,
        initialLoading: false,
        loading: false,
        refetch: noop
      },
      onPageChange: noop,
      setUrlValues: noop
    })
  })

  it('callback is called after listening to an event', () => {
    let context: Partial<
      ListContextType<
        Exclude<GetMemorandumsListQuery['memorandums'], null | undefined>,
        MemorandumsFilter,
        MemorandumListQueryParams
      >
    > &
      Pick<
        ListContextType<
          Exclude<GetMemorandumsListQuery['memorandums'], null | undefined>,
          MemorandumsFilter,
          MemorandumListQueryParams
        >,
        'setUrlValues' | 'urlValues'
      > = {
      setUrlValues: jest.fn(),
      urlValues: {}
    }

    const Consumer = () => {
      context = useContext(MemorandumListContext)

      context.setUrlValues({})

      return null
    }

    render(<Consumer />, renderProps)

    const { setUrlValues } = context

    setUrlValues({})

    expect(context).toStrictEqual(renderProps.value)
    expect(renderProps.value.setUrlValues).toHaveBeenCalled()
  })
})
