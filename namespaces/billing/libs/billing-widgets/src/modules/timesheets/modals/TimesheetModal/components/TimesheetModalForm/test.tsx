import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetModalForm from '.'

jest.mock('../TimesheetSummary')
jest.mock('../TimesheetDayList')

const mockInitialValues = {
  billingCycleId: fixtures.MockBillingCycle.id,
  comment: 'example timesheet comment',
  timesheetRecords: fixtures.MockTimesheetEditFormInput,
  action: ''
}

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TimesheetModalForm>
) =>
  renderComponent(
    <TimesheetModalForm {...props}>{children}</TimesheetModalForm>
  )

jest.mock('../TimesheetDayList')

const mockModalState = () => ({
  modal: {
    options: { variant: 'normal' },
    props: {
      pending: {
        canMoveNext: true,
        canMovePrev: true,
        handleNavigateTo: jest.fn()
      }
    }
  }
})

jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    dispatch: jest.fn(),
    state: mockModalState()
  })
}))

describe('TimesheetModalForm', () => {
  describe('Update ability allowed', () => {
    it('renders the save button', () => {
      const { getByTestId } = render(null, {
        initialValues: mockInitialValues,
        handleOnSubmit: jest.fn(),
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

      expect(getByTestId('save')).toBeInTheDocument()
    })
  })

  describe('Submit ability allowed', () => {
    it('renders the submit button', () => {
      const { getByTestId } = render(null, {
        initialValues: mockInitialValues,
        handleOnSubmit: jest.fn(),
        timesheet: {
          ...fixtures.MockBillingCycle,
          timesheetSubmitted: false,
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
              callable: 'ENABLED',
              messages: []
            },
            timesheetUnsubmit: {
              __typename: 'Operation',
              callable: 'DISABLED',
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

      expect(getByTestId('submit')).toBeInTheDocument()
    })
  })
})
