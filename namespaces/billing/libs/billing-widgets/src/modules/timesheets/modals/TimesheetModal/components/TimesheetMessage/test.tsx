import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetMessage from '.'

const render = (props: ComponentProps<typeof TimesheetMessage>) =>
  renderComponent(<TimesheetMessage {...props} />)

describe('TimesheetMessage', () => {
  beforeEach(() => MockDate.set('2019/05/20 19:00'))

  afterEach(() => MockDate.reset())

  describe('when it is overdue', () => {
    describe('when it is blocked', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          timesheet: {
            ...fixtures.MockBillingCycle,
            timesheetOverdue: true,
            timesheetSubmissionBlocked: true,
            timesheetSubmitted: false,
            timesheetExtraHours: false
          }
        })

        expect(queryByTestId('TimesheetMessage-break_day')).toContainHTML(
          `You cannot log hours for days you're on break. If you need to update your break days, please reach out to your recruiter.`
        )
        expect(queryByTestId('TimesheetMessage')).toContainHTML(
          `This timesheet is overdue and will need to be reviewed by your recruiter and processed manually.`
        )
      })
    })

    describe('when it is not blocked', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          timesheet: {
            ...fixtures.MockBillingCycle,
            timesheetOverdue: true,
            timesheetSubmissionBlocked: false,
            timesheetSubmitted: false,
            timesheetExtraHours: false
          }
        })

        expect(queryByTestId('TimesheetMessage-break_day')).toContainHTML(
          `You cannot log hours for days you're on break. If you need to update your break days, please reach out to your recruiter.`
        )
        expect(queryByTestId('TimesheetMessage')).toContainHTML(
          `Talent has 13 days to submit this timesheet for automatic processing. After that this timesheet will need to be reviewed by a recruiter.`
        )
      })
    })

    describe('when it corresponds to Extra Hours', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          timesheet: {
            ...fixtures.MockBillingCycle,
            timesheetOverdue: true,
            timesheetSubmissionBlocked: false,
            timesheetSubmitted: false,
            timesheetExtraHours: true
          }
        })

        expect(queryByTestId('TimesheetMessage')).not.toBeInTheDocument()
      })
    })
  })

  describe('when it is submitted and it is not editable', () => {
    describe('when its not blocked', () => {
      it('default render', () => {
        const { queryByTestId } = render({
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
                callable: 'DISABLED',
                messages: []
              }
            },
            breaksPeriod: [],
            timesheetOverdue: false,
            timesheetSubmissionBlocked: false,
            timesheetSubmitted: true
          }
        })

        expect(
          queryByTestId('TimesheetMessage-break_day')
        ).not.toBeInTheDocument()
        expect(queryByTestId('TimesheetMessage')).not.toBeInTheDocument()
      })
    })

    describe('when its blocked', () => {
      describe('when `breakPeriod` is not empty', () => {
        it('default render', () => {
          const { queryByTestId } = render({
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
              breaksPeriod: ['2018-08-08'],
              timesheetOverdue: false,
              timesheetSubmissionBlocked: true,
              timesheetSubmitted: true
            }
          })

          expect(queryByTestId('TimesheetMessage-break_day')).toContainHTML(
            `You cannot log hours for days you're on break. If you need to update your break days, please reach out to your recruiter.`
          )
          expect(queryByTestId('TimesheetMessage')).not.toBeInTheDocument()
        })
      })

      describe('when `breakPeriod` is empty', () => {
        it('default render', () => {
          const { queryByTestId } = render({
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
              breaksPeriod: [],
              timesheetOverdue: false,
              timesheetSubmissionBlocked: true,
              timesheetSubmitted: true
            }
          })

          expect(
            queryByTestId('TimesheetMessage-break_day')
          ).not.toBeInTheDocument()
          expect(queryByTestId('TimesheetMessage')).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('when it is submitted and it is editable', () => {
    it('default render', () => {
      const { queryByTestId } = render({
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
          breaksPeriod: [],
          timesheetOverdue: false,
          timesheetSubmissionBlocked: false,
          timesheetSubmitted: true
        }
      })

      expect(
        queryByTestId('TimesheetMessage-break_day')
      ).not.toBeInTheDocument()
      expect(queryByTestId('TimesheetMessage')).toContainHTML(
        `You're updating submitted timesheet which will result in related Billing Cycle. All related invoices, payments, and commissions will be sent to the accounting team for review and updated accordingly.`
      )
    })
  })
})
