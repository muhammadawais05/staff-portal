import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { screen } from '@testing-library/react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetStatus from '.'

const render = (props: ComponentProps<typeof TimesheetStatus>) =>
  renderComponent(<TimesheetStatus {...props} />)

describe('TimesheetStatus', () => {
  beforeEach(() => MockDate.set('2019/05/20 19:00'))

  afterEach(() => MockDate.reset())

  describe('render variations', () => {
    it('`inline` render', () => {
      render({
        inline: true,
        timesheet: {
          ...fixtures.MockBillingCycle
        }
      })

      expect(
        screen.getByText(
          (content, element) =>
            element?.tagName.toLowerCase() === 'span' &&
            content === '(Rejected)'
        )
      ).not.toBeNull()
    })
  })

  describe('status variations', () => {
    describe('warnings', () => {
      describe('rejected', () => {
        it('not overdue', () => {
          render({
            timesheet: {
              ...fixtures.MockBillingCycle,
              timesheetRejected: true
            }
          })

          expect(
            screen.getByText(
              (content, element) =>
                element?.tagName.toLowerCase() === 'p' &&
                content === '(Rejected)'
            )
          ).not.toBeNull()
        })

        describe('overdue', () => {
          it('not blocked', () => {
            const { queryByTestId } = render({
              timesheet: {
                ...fixtures.MockBillingCycle,
                timesheetRejected: true,
                timesheetOverdue: true,
                timesheetSubmissionBlocked: true
              }
            })

            expect(queryByTestId('TimesheetStatus')).toContainHTML(
              '(Rejected. Submission overdue, no automatic processing available)'
            )
          })

          describe('blocked', () => {
            it('default render', () => {
              const { queryByTestId } = render({
                timesheet: {
                  ...fixtures.MockBillingCycle,
                  timesheetRejected: true,
                  timesheetOverdue: true,
                  timesheetSubmissionBlocked: false
                }
              })

              expect(queryByTestId('TimesheetStatus')).toContainHTML(
                '(Rejected. Submission overdue, 13 days left for submission)'
              )
            })
          })
        })
      })

      describe('overdue', () => {
        describe('no extra hours', () => {
          it('default render', () => {
            const { queryByTestId } = render({
              timesheet: {
                ...fixtures.MockBillingCycle,
                timesheetOverdue: true,
                timesheetRejected: false,
                timesheetExtraHours: false
              }
            })

            expect(queryByTestId('TimesheetStatus')).toContainHTML(
              '(Submission overdue, no automatic processing available)'
            )
          })
        })
        describe('extra hours', () => {
          it('does not render a status', () => {
            const { queryByTestId } = render({
              timesheet: {
                ...fixtures.MockBillingCycle,
                timesheetOverdue: true,
                timesheetRejected: false,
                timesheetExtraHours: true
              }
            })

            expect(queryByTestId('TimesheetStatus')).not.toBeInTheDocument()
          })
        })
      })
    })

    describe('notifications', () => {
      describe('unsubmitted', () => {
        it('default render', () => {
          const { queryByTestId } = render({
            timesheet: {
              ...fixtures.MockBillingCycle,
              timesheetOverdue: false,
              timesheetRejected: false,
              timesheetSubmitted: false
            }
          })

          expect(queryByTestId('TimesheetStatus')).toContainHTML(
            '(Not submitted)'
          )
        })
      })

      describe('waiting for approval', () => {
        it('default render', () => {
          const { queryByTestId } = render({
            timesheet: {
              ...fixtures.MockBillingCycle,
              timesheetOverdue: false,
              timesheetRejected: false,
              timesheetSubmitted: true
            }
          })

          expect(queryByTestId('TimesheetStatus')).not.toBeInTheDocument()
        })
      })
    })

    describe('success', () => {
      describe('approved', () => {
        it('default render', () => {
          const { queryByTestId } = render({
            timesheet: {
              ...fixtures.MockBillingCycle,
              timesheetApproved: true,
              timesheetOverdue: false,
              timesheetRejected: false,
              timesheetSubmitted: true
            }
          })

          expect(queryByTestId('TimesheetStatus')).toContainHTML('(Approved)')
        })
      })

      describe('waitApproval', () => {
        it('default render', () => {
          const { queryByTestId } = render({
            timesheet: {
              ...fixtures.MockBillingCycle,
              timesheetApproved: false,
              timesheetOverdue: false,
              timesheetRejected: false,
              timesheetRequiresApproval: true,
              timesheetSubmitted: true
            }
          })

          expect(queryByTestId('TimesheetStatus')).toContainHTML(
            '(Awaiting approval)'
          )
        })
      })

      describe('empty', () => {
        it('default render', () => {
          const { queryByTestId } = render({
            timesheet: {
              ...fixtures.MockBillingCycle,
              timesheetApproved: false,
              timesheetOverdue: false,
              timesheetRejected: false,
              timesheetRequiresApproval: false,
              timesheetSubmitted: true
            }
          })

          expect(queryByTestId('TimesheetStatus')).not.toBeInTheDocument()
        })
      })
    })
  })
})
