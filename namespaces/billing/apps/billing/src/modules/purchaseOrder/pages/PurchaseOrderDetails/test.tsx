import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { StaffPortalRelatedTasks } from '@staff-portal/billing/src/@types/types'
import { useDependency } from '@staff-portal/dependency-injector'
import { when } from 'jest-when'

import PurchaseOrderDetails from '.'
import { RELATED_TASKS } from '../../../../dependencies'

jest.mock('../../components/PurchaseOrderDetailsJobsList')
jest.mock('../../components/PurchaseOrderInvoices')
jest.mock('../../../notable/components/NotesList')
jest.mock('./components/PurchaseOrderDetailsTable')
jest.mock('../../components/PurchaseOrderDetailsPageHeader')
jest.mock('../../data')
jest.mock(
  '@staff-portal/billing/src/data/getExperiments.graphql.types',
  () => ({
    useGetExperimentsQuery: () => ({
      data: {
        experiments: { poLines: { enabled: true } }
      },
      loading: false,
      initialLoading: false,
      refetch: jest.fn()
    })
  })
)

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const MockedRelatedTasks: StaffPortalRelatedTasks = props => (
  <div data-testid='RelatedTasks'>{JSON.stringify(props)}</div>
)

const render = (
  props: Omit<ComponentProps<typeof PurchaseOrderDetails>, 'RelatedTasks'> = {
    purchaseOrderId: ''
  }
) => renderComponent(<PurchaseOrderDetails {...props} />)

when(useDependency as jest.Mock)
  .calledWith(RELATED_TASKS)
  .mockReturnValue(MockedRelatedTasks)

describe('PurchaseOrderDetails', () => {
  it('rendering page components', () => {
    const { queryByTestId } = render({
      purchaseOrderId: 'abc123'
    })

    expect(queryByTestId('PurchaseOrderInvoices')).toBeNull()
    expect(queryByTestId('PurchaseOrderDetailsJobsList')).toBeNull()
    expect(queryByTestId('PurchaseOrderDetailsTable')).toContainHTML(
      '"purchaseOrderId":"abc123"'
    )

    expect(queryByTestId('NotesList')).toContainHTML('abc123')
  })

  // TODO: remove `describe` when PO lines is released
  // (do not remove `it` block)
  describe('When PO lines experiment is enabled', () => {
    it('renders PO lines table', () => {
      const { getByTestId } = render({
        purchaseOrderId: 'abc123'
      })

      expect(getByTestId('PurchaseOrderLinesTable')).toBeInTheDocument()
    })
  })
})
