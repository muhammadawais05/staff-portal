import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import ExtraExpensesAddModal from './ExtraExpensesAddModal'

const engagementData = fixtures.MockEngagement
const mockResponse = {
  error: null,
  loading: false,
  data: {
    node: [engagementData]
  }
}

jest.mock('../ExtraExpensesAddForm')
jest.mock('../../../../engagement/data/getEngagement.graphql.types', () => ({
  useGetEngagementQuery: () => mockResponse
}))
jest.mock('../../data/setCreateEngagementExtraExpenses.graphql.types', () => ({
  useSetCreateEngagementExtraExpensesMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof ExtraExpensesAddModal>) =>
  renderComponent(<ExtraExpensesAddModal {...props} />)

describe('ExtraExpensesAddModal', () => {
  it('default render', () => {
    const { getByTestId } = render({
      options: {
        engagementId: engagementData.id
      } as Required<ModalData>
    })

    expect(getByTestId('ExtraExpensesAddForm')).toBeInTheDocument()
  })
})
