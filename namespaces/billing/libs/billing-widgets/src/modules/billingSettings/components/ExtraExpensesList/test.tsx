import React, { ComponentProps } from 'react'
import { noop } from '@toptal/picasso/utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import ExtraExpensesList from '.'
import { useGetExtraExpensesQuery } from '../../../extraExpenses/data/getExtraExpenses.graphql.types'

const engagementData = fixtures.MockEngagement
const mockResponse = {
  error: null,
  loading: false,
  data: {
    node: [engagementData]
  }
}

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../../../extraExpenses/data/getExtraExpenses.graphql.types')
jest.mock('../ExtraExpensesAddInlineForm')
jest.mock('../../../engagement/data/getEngagement.graphql.types', () => ({
  useGetEngagementQuery: () => mockResponse
}))
jest.mock(
  '../../../extraExpenses/modals/data/setCreateEngagementExtraExpenses.graphql.types',
  () => ({
    useSetCreateEngagementExtraExpensesMutation: () => [jest.fn()]
  })
)

const mockedUseGetExtraExpensesQuery = useGetExtraExpensesQuery as jest.Mock

const render = (props: ComponentProps<typeof ExtraExpensesList>) =>
  renderComponent(<ExtraExpensesList {...props} />)

const { displayName } = ExtraExpensesList

describe('ExtraExpenses', () => {
  describe('when data is received', () => {
    it('renders components properly', () => {
      mockedUseGetExtraExpensesQuery.mockReturnValue({
        data: {
          node: { extraExpenses: fixtures.MockExtraExpenses }
        },
        loading: false,
        initialLoading: false,
        refetch: noop
      })

      const { getByTestId } = render({
        engagementId: fixtures.MockEngagement.id
      })

      expect(useRefetch).toHaveBeenCalledWith(
        { metaData: 'extraExpenses:create' },
        noop
      )

      expect(getByTestId(`${displayName}-title`)).toContainHTML(
        'Extra Expenses'
      )
      expect(getByTestId('Table')).toContainHTML(
        fixtures.MockExtraExpenses.nodes[0].payments.nodes[0].subjectObject
          .fullName
      )
    })
  })

  describe('when data is null', () => {
    it('renders components properly', () => {
      mockedUseGetExtraExpensesQuery.mockReturnValue({
        data: null,
        loading: false,
        initialLoading: false,
        refetch: noop
      })

      const { getByTestId, queryByTestId } = render({
        engagementId: fixtures.MockEngagement.id
      })

      expect(useRefetch).toHaveBeenCalledWith(
        { metaData: 'extraExpenses:create' },
        noop
      )

      expect(getByTestId(`${displayName}-title`)).toContainHTML(
        'Extra Expenses'
      )
      expect(queryByTestId('extra-expenses-add')).not.toBeInTheDocument()
      expect(getByTestId(`${displayName}-empty`)).toContainHTML(
        'No related extra expenses'
      )
    })
  })
})
