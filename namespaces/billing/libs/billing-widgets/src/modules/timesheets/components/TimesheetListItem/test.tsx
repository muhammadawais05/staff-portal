import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetListItem from '.'

const render = (props: ComponentProps<typeof TimesheetListItem>) =>
  renderComponent(
    <table>
      <tbody>
        <TimesheetListItem {...props} />
      </tbody>
    </table>
  )

describe('TimesheetListItem', () => {
  describe('when no edit or unsubmit is allowed', () => {
    it('render properly', () => {
      const { container } = render({
        timesheet: fixtures.MockBillingCycle
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when update is allowed', () => {
    it('render properly', () => {
      const { container } = render({
        operations: {
          __typename: 'BillingCycleOperations',
          timesheetApprove: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          timesheetReject: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          timesheetSubmit: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          timesheetUnsubmit: {
            __typename: 'Operation',
            callable: 'DISABLED',
            messages: []
          },
          timesheetUpdate: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          }
        },
        timesheet: fixtures.MockBillingCycle
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when unsubmit is allowed', () => {
    it('render properly', () => {
      const { container } = render({
        timesheet: {
          ...fixtures.MockBillingCycle,
          operations: {
            __typename: 'BillingCycleOperations',
            timesheetApprove: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetReject: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetSubmit: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetUnsubmit: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            },
            timesheetUpdate: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            }
          }
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `!timesheetRecords.length`', () => {
    it('render properly', () => {
      const { container } = render({
        timesheet: {
          ...fixtures.MockBillingCycle,
          operations: {
            __typename: 'BillingCycleOperations',
            timesheetApprove: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetReject: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetSubmit: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetUnsubmit: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetUpdate: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          },
          timesheetRecords: []
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `timesheetRecords.length`', () => {
    it('render properly', () => {
      const { container } = render({
        timesheet: {
          ...fixtures.MockBillingCycle,
          operations: {
            __typename: 'BillingCycleOperations',
            timesheetApprove: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetReject: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetSubmit: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetUnsubmit: {
              __typename: 'Operation',
              callable: 'DISABLED',
              messages: []
            },
            timesheetUpdate: {
              __typename: 'Operation',
              callable: 'ENABLED',
              messages: []
            }
          }
        }
      })

      expect(container).toMatchSnapshot()
    })
  })
})
