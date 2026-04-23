import React, { ComponentProps } from 'react'
import { noop } from '@toptal/picasso/utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import ExtraExpenses from '.'
import { useGetExtraExpensesQuery } from '../../data/getExtraExpenses.graphql.types'

jest.mock('../Table')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../../data/getExtraExpenses.graphql.types')

const mockedUseGetExtraExpensesQuery = useGetExtraExpensesQuery as jest.Mock

const render = (props: ComponentProps<typeof ExtraExpenses>) =>
  renderComponent(<ExtraExpenses {...props} />)

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

      expect(getByTestId('ExtraExpenses-title')).toContainHTML('Extra Expenses')
      expect(getByTestId('extra-expenses-add')).toContainHTML(
        'Add Extra Expense'
      )
      expect(getByTestId('Table')).toBeInTheDocument()
      expect(getByTestId('Table-data')).toContainHTML(
        '"gid":"gid://platform/Payment/954921"'
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

      expect(getByTestId('ExtraExpenses-title')).toContainHTML('Extra Expenses')
      expect(queryByTestId('extra-expenses-add')).not.toBeInTheDocument()
      expect(getByTestId('ExtraExpenses-empty')).toContainHTML(
        'No related extra expenses'
      )
    })
  })
})
