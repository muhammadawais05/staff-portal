import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import mockFixtures from '@staff-portal/billing/src/_fixtures'

import { useGetBillingCyclesQuery } from '../../data'
import BillingCycles from '.'

jest.mock('../BillingCycleTable')

jest.mock('../../data', () => ({
  useGetBillingCyclesQuery: jest.fn()
}))

const mockedUseGetBillingCyclesQuery = useGetBillingCyclesQuery as jest.Mock

const mockData = (data?: unknown) => ({
  data: {
    engagementDocuments:
      mockFixtures.MockBillingCyclesTable.engagementDocuments,
    node: mockFixtures.MockBillingCyclesTable.node
  },
  loading: false,
  initialLoading: false,
  refetch: jest.fn(),
  ...data
})

const render = () => renderComponent(<BillingCycles engagementId='id' />)

describe('<BillingCycles />', () => {
  it('default render', () => {
    mockedUseGetBillingCyclesQuery.mockReturnValue(mockData())

    const { queryByTestId } = render()

    expect(queryByTestId('billing-cycles')).toBeInTheDocument()
  })

  describe('when both billingCycles and engagementDocuments have data', () => {
    it('BillingCycleTable renders', () => {
      mockedUseGetBillingCyclesQuery.mockReturnValue(mockData())

      const { queryByTestId } = render()

      const BillingCycleTable = queryByTestId('BillingCycleTable')

      expect(BillingCycleTable).not.toBeNull()
    })
  })

  describe('when billingCycles has data and engagementDocuments is empty', () => {
    it('BillingCycleTable renders', () => {
      mockedUseGetBillingCyclesQuery.mockReturnValueOnce({
        data: {
          engagementDocuments: {
            commissions: [],
            invoices: [],
            payments: []
          },
          node: mockFixtures.MockBillingCyclesTable.node
        }
      })

      const { queryByTestId } = render()

      const BillingCycleTable = queryByTestId('BillingCycleTable')

      expect(BillingCycleTable).not.toBeNull()
    })
  })

  describe('when node(Engagement) is empty', () => {
    it('BillingCycleTable does not render', () => {
      mockedUseGetBillingCyclesQuery.mockReturnValueOnce({
        data: {
          engagementDocuments: null,
          node: null
        }
      })

      const { queryByTestId } = render()

      const BillingCycleTable = queryByTestId('BillingCycleTable')

      expect(BillingCycleTable).toBeNull()
    })
  })

  describe('when node(Engagement) is present but billingCycles is empty', () => {
    it('An empty indicator renders', () => {
      mockedUseGetBillingCyclesQuery.mockReturnValueOnce({
        data: {
          engagementDocuments: null,
          node: { billingCycles: { nodes: [] } }
        }
      })

      const { queryByTestId } = render()

      const BillingCycleTableEmpty = queryByTestId('BillingCycleTableEmpty')

      expect(BillingCycleTableEmpty).not.toBeNull()
    })
  })
})

describe('when billingCycles does not exist', () => {
  it('BillingCycleTable does not render', () => {
    mockedUseGetBillingCyclesQuery.mockReturnValueOnce({
      data: {
        engagementDocuments:
          mockFixtures.MockBillingCyclesTable.engagementDocuments,
        node: null
      }
    })

    const { queryByTestId } = render()

    const BillingCycleTable = queryByTestId('BillingCycleTable')

    expect(BillingCycleTable).toBeNull()
  })
})

describe('when engagementDocuments does not exist', () => {
  it('BillingCycleTable renders', () => {
    mockedUseGetBillingCyclesQuery.mockReturnValueOnce({
      data: {
        engagementDocuments: null,
        node: mockFixtures.MockBillingCyclesTable.node
      }
    })

    const { queryByTestId } = render()

    const BillingCycleTable = queryByTestId('BillingCycleTable')

    expect(BillingCycleTable).not.toBeNull()
  })
})

describe('when both do not exist', () => {
  it('BillingCycleTable does not render', () => {
    mockedUseGetBillingCyclesQuery.mockReturnValueOnce({
      data: {
        engagementDocuments: null,
        node: null
      }
    })

    const { queryByTestId } = render()

    const BillingCycleTable = queryByTestId('BillingCycleTable')

    expect(BillingCycleTable).toBeNull()
  })
})
