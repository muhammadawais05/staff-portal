import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetModal from '.'
import { useGetBillingCycleQuery } from '../../../../data/getBillingCycle.graphql.types'

jest.mock('../TimesheetModalView')
jest.mock('../TimesheetModalForm')

jest.mock('../../../../data/getBillingCycle.graphql.types')
jest.mock('../../data/setTimesheetUpdate.graphql.types', () => ({
  useSetTimesheetUpdateMutation: () => [jest.fn()]
}))
jest.mock('../../data/setTimesheetSubmit.graphql.types', () => ({
  useSetTimesheetSubmitMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof TimesheetModal>) =>
  renderComponent(<TimesheetModal {...props} />)

describe('TimesheetModal', () => {
  describe('edit mode', () => {
    it('default render', () => {
      useGetBillingCycleQuery.mockReturnValue({
        error: null,
        loading: false,
        data: {
          billingCycle: fixtures.MockBillingCycle
        }
      })

      const { getByTestId } = render({
        options: { billingCycleId: fixtures.MockBillingCycle.id }
      })

      expect(getByTestId('TimesheetModalForm')).toBeInTheDocument()
    })
  })

  describe('view mode', () => {
    it('default render', () => {
      useGetBillingCycleQuery.mockReturnValue({
        error: null,
        loading: false,
        data: {
          billingCycle: {
            ...fixtures.MockBillingCycle,
            operations: {
              timesheetUpdate: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: []
              }
            }
          }
        }
      })

      const { getByTestId } = render({
        options: { billingCycleId: fixtures.MockBillingCycle.id }
      })

      expect(getByTestId('TimesheetModalView')).toBeInTheDocument()
    })
  })
})
