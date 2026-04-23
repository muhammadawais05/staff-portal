import { useQuery } from '@apollo/client'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import { usePaymentsChart, usePaymentsChartQuery } from './usePaymentsChart'

jest.mock(
  '@staff-portal/billing/src/_lib/context/externalIntegratorContext',
  () => ({
    useExternalIntegratorContext: jest.fn().mockImplementation(() => ({
      endpoints: {
        Kipper: 'kipper_url'
      }
    }))
  })
)

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}))

describe('PaymentListChart data', () => {
  it('#usePaymentsChartQuery', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: fixtures.MockKipperChart,
      loading: false,
      error: undefined
    })

    expect(
      usePaymentsChartQuery({
        variables: {
          url: 'test',
          path: 'test',
          kpi: '123',
          ruleId: '123'
        }
      })
    ).toEqual({
      data: fixtures.MockKipperChart,
      loading: false,
      error: undefined,
      initialLoading: false,
      refetch: undefined
    })

    expect(usePaymentsChartQuery()).toEqual({
      data: fixtures.MockKipperChart,
      loading: false,
      error: undefined,
      initialLoading: false,
      refetch: undefined
    })
  })

  describe('#usePaymentsChart', () => {
    beforeEach(() => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: {
          paymentsChart: fixtures.MockKipperChart
        },
        loading: false,
        error: undefined
      })
    })

    it('default', () => {
      expect(usePaymentsChart({ kpi: '123' })).toEqual({
        data: fixtures.MockKipperChart,
        loading: false,
        initialLoading: false,
        error: undefined
      })
    })

    it('with ruleId', () => {
      expect(usePaymentsChart({ kpi: '123', ruleId: '321' })).toEqual({
        data: fixtures.MockKipperChart,
        loading: false,
        initialLoading: false,
        error: undefined
      })
    })

    it('without kipper url', () => {
      useExternalIntegratorContext.mockImplementation(() => ({}))

      expect(usePaymentsChart({ kpi: '123', ruleId: '321' })).toEqual({
        data: null,
        loading: false,
        initialLoading: false,
        error: 'Missing Kipper URL.'
      })
    })
  })
})
