import { renderHook } from '@testing-library/react-hooks'
import React, { ComponentProps, ReactNode, useContext } from 'react'
import noop from '@toptal/picasso/utils/noop'
import { PaymentsFilter } from '@staff-portal/graphql/staff'
import { ListContextType } from '@staff-portal/billing/src/components/ListContext'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  PaymentGroupListContext,
  PaymentGroupListQueryParams,
  usePaymentGroupListContext
} from '.'
import { GetPaymentsListQuery } from '../../../payment/data/getPaymentsList.graphql.types'

const renderProps = {
  value: {
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
    onPageChange: jest.fn(),
    resolving: false,
    setUrlValues: jest.fn(),
    urlValues: {}
  }
}

const render = (
  children: ReactNode,
  props: ComponentProps<typeof PaymentGroupListContext.Provider>
) =>
  renderComponent(
    <PaymentGroupListContext.Provider {...props}>
      {children}
    </PaymentGroupListContext.Provider>
  )

describe('PaymentListContext.Provider', () => {
  it('#usePaymentListContext', () => {
    const { result } = renderHook(() => usePaymentGroupListContext())

    expect(result.current).toEqual({
      ...renderProps.value,
      onPageChange: noop,
      setUrlValues: noop
    })
  })

  it('callback is called after listening to an event', () => {
    let context: Partial<
      ListContextType<
        Exclude<GetPaymentsListQuery['payments'], null | undefined>,
        PaymentsFilter,
        PaymentGroupListQueryParams
      >
    > &
      Pick<
        ListContextType<
          Exclude<GetPaymentsListQuery['payments'], null | undefined>,
          PaymentsFilter,
          PaymentGroupListQueryParams
        >,
        'setUrlValues' | 'urlValues'
      > = {
      setUrlValues: jest.fn(),
      urlValues: {}
    }

    const Consumer = () => {
      context = useContext(PaymentGroupListContext)

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
