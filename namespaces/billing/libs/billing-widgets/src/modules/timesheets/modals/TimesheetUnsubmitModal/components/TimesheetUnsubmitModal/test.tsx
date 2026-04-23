import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetUnsubmitModal from '.'
import { useGetBillingCycleQuery } from '../../../../data/getBillingCycle.graphql.types'

jest.mock('../TimesheetUnsubmitModalForm')

jest.mock('../../../../data/getBillingCycle.graphql.types')
jest.mock('../../data/setTimesheetUnsubmit.graphql.types', () => ({
  useSetTimesheetUnsubmitMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof TimesheetUnsubmitModal>) =>
  renderComponent(<TimesheetUnsubmitModal {...props} />)

describe('TimesheetUnsubmitModal', () => {
  it('default render', () => {
    useGetBillingCycleQuery.mockReturnValue({
      error: null,
      loading: false,
      data: {
        billingCycle: fixtures.MockBillingCycle
      }
    })

    const { getByTestId, queryByTestId } = render({
      options: { billingCycleId: fixtures.MockBillingCycle.id }
    })

    expect(getByTestId('TimesheetUnsubmitModalForm')).toBeInTheDocument()

    expect(queryByTestId('TimesheetUnsubmitModalForm')).toContainHTML(
      '"id":"VjEtQmlsbGluZ0N5Y2xlLTMzMzY3Ng"'
    )
  })
})
