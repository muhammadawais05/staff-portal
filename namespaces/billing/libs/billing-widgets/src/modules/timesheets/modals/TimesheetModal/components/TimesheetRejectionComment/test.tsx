import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetRejectionComment from '.'

const render = (props: ComponentProps<typeof TimesheetRejectionComment>) =>
  renderComponent(<TimesheetRejectionComment {...props} />)

describe('TimesheetRejectionComment', () => {
  describe('when `timesheetRejectionComment` is defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        timesheet: fixtures.MockBillingCycle
      })

      expect(queryByTestId('MultilineComment')).toContainHTML(
        'example reject commend'
      )
    })
  })

  describe('when `timesheetRejectionComment` is undefined', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        timesheet: {
          ...fixtures.MockBillingCycle,
          timesheetRejectionComment: undefined
        }
      })

      expect(queryByTestId('MultilineComment')).not.toBeInTheDocument()
    })
  })
})
