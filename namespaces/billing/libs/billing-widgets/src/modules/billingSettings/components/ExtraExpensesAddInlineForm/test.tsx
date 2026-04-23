import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ExtraExpensesAddInlineForm from './ExtraExpensesAddInlineForm'

const engagementData = fixtures.MockEngagement
const mockResponse = {
  error: null,
  loading: false,
  data: {
    node: [engagementData]
  }
}

jest.mock('../../../engagement/data/getEngagement.graphql.types', () => ({
  useGetEngagementQuery: () => mockResponse
}))
jest.mock(
  '../../../extraExpenses/modals/data/setCreateEngagementExtraExpenses.graphql.types',
  () => ({
    useSetCreateEngagementExtraExpensesMutation: () => [jest.fn()]
  })
)
jest.mock(
  '../../../extraExpenses/modals/components/ExtraExpensesAddForm/ExtraExpensesAddForm'
)

const render = (props: ComponentProps<typeof ExtraExpensesAddInlineForm>) =>
  renderComponent(<ExtraExpensesAddInlineForm {...props} />)

describe('ExtraExpensesAddInlineForm', () => {
  const onCloseForm = jest.fn()

  it('default render', () => {
    const { getByTestId } = render({
      isOpenInlineForm: true,
      onCloseForm,
      engagementId: engagementData.id
    })

    expect(getByTestId('InlineSectionForm')).toBeInTheDocument()
  })
  it('should call onCloseForm', () => {
    const { getByTestId } = render({
      isOpenInlineForm: true,
      onCloseForm,
      engagementId: engagementData.id
    })

    getByTestId('cancel').click()

    expect(onCloseForm).toHaveBeenCalled()
  })
})
