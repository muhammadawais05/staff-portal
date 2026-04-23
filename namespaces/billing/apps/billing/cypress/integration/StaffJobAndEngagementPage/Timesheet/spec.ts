import Color from 'color'
import { palette } from '@toptal/picasso/utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/billingCyclesDefault'

const SELECTOR_TIMESHEET_DAY_LIST = 'TimesheetDayList'
const SELECTOR_TIMESHEET_DAY = 'TimesheetDay'
const SELECTOR_LIST_WRAPPER = 'TimesheetList'
const SELECTOR_TIMESHEET_HEADER = 'TimesheetModalTitle-header'
const SELECTOR_TIMESHEET_LIST_ITEM = 'TimesheetListItem'
const SELECTOR_TIMESHEET_STATUS = 'TimesheetStatus'
const SELECTOR_SHOW_MORE = 'button-showmore'
const SELECTOR_TIMESHEET_ITEM_EDIT = 'edit-button'
const SELECTOR_TIMESHEET_ITEM_UNSUBMIT = 'unsubmit-button'
const GRAY = Color(palette.grey.lighter2).toString()

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )

  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffEngagementPage'
      contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    }
  })
  cy.waitForReact()
}

const showMore = () =>
  cy.get(`[data-testid="${SELECTOR_SHOW_MORE}"]`).as('showMore')

describe('Widget - Staff - Jobs and Engagement Page', () => {
  describe('Timesheets empty state', () => {
    before(() =>
      resetSetup({
        GetBillingCyclesWithTimesheets: {
          data: {
            billingCyclesWithTimesheets: []
          }
        }
      })
    )

    it('has empty state', () => {
      cy.get(`[data-testid="TimesheetList"]`).should('have.length', 0)
    })
  })

  describe('Timesheet with data', () => {
    before(resetSetup)

    describe('List `show more` functionality', () => {
      it('has `3` elements', () => {
        cy.get(`[data-testid="${SELECTOR_TIMESHEET_LIST_ITEM}"]`).should(
          'have.length',
          3
        )
        showMore().click()

        cy.get(`[data-testid="${SELECTOR_TIMESHEET_LIST_ITEM}"]`).should(
          'have.length',
          4
        )
      })
    })

    describe('Modals', () => {
      before(() => {
        cy.getByTestId(SELECTOR_TIMESHEET_LIST_ITEM).eq(0).as('items')

        cy.getByTestId(SELECTOR_LIST_WRAPPER)
          .eq(0)
          .within(() => {
            cy.getByTestId(SELECTOR_TIMESHEET_LIST_ITEM)
              .eq(0)
              .within(() => {
                cy.getByTestId(SELECTOR_TIMESHEET_ITEM_EDIT).click()
              })
          })
      })

      it('Header', () => {
        cy.getByTestId(SELECTOR_TIMESHEET_HEADER).should(
          'contain',
          'Timesheet (Apr 22, 2019 - May 5, 2019)'
        )

        cy.getByTestId(SELECTOR_TIMESHEET_STATUS).should(
          'contain',
          '(Not submitted)'
        )
      })

      it('Warning', () => {
        cy.getByTestId(SELECTOR_TIMESHEET_HEADER).should(
          'contain',
          'Timesheet (Apr 22, 2019 - May 5, 2019)'
        )

        cy.getByTestId(SELECTOR_TIMESHEET_STATUS).should(
          'contain',
          '(Not submitted)'
        )
      })

      it('Timesheet Note', () => {
        cy.getByTestId('timesheetComment').should(
          'contain',
          'Example empty timesheet'
        )
      })

      it('Day Work Notes', () => {
        cy.getByTestId(SELECTOR_TIMESHEET_DAY_LIST).within(() => {
          cy.getByTestId(SELECTOR_TIMESHEET_DAY)
            .eq(3)
            .within(() => {
              cy.getByTestId('day_worknote').should('contain', 'Sample note 2')
            })
        })
      })

      it('Input variations', () => {
        cy.getByTestId(SELECTOR_TIMESHEET_DAY_LIST).within(() => {
          cy.getByTestId(SELECTOR_TIMESHEET_DAY).eq(2).as('disabled')
          cy.get('@disabled').should('have.css', 'background-color', GRAY)

          cy.get('@disabled').within(() => {
            cy.getByTestId('hours').should('be.disabled')
            cy.getByTestId('minutes').should('be.disabled')
          })

          cy.getByTestId(SELECTOR_TIMESHEET_DAY)
            .first()
            .within(() => {
              cy.getByTestId('hours').as('hours')
              cy.getByTestId('minutes').as('minutes')

              // Assert for value restore
              cy.get('@hours').should('value', '03')
              cy.get('@minutes').should('value', '00')

              cy.get('@hours').clear().type('25').blur()

              cy.getByTestId('error')
                .eq(0)
                .contains(
                  i18n.t('common:validation.lessOrEqual', {
                    unit: 'Hours',
                    value: 24
                  }) as string
                )

              cy.get('@hours').clear().type('-5').blur()

              cy.get('@hours').should('value', '05')

              cy.get('@hours').clear().type('24').blur()

              cy.get('@minutes').focus().type('1').blur()

              cy.getByTestId('error')
                .eq(0)
                .contains(
                  i18n.t('common:validation.equal', {
                    unit: 'Minutes',
                    value: 0
                  }) as string
                )

              cy.get('@hours').focus().clear().type('0').blur()

              cy.get('@minutes').focus().clear().type('60').blur()

              cy.getByTestId('error')
                .eq(0)
                .contains(
                  i18n.t('common:validation.lessOrEqual', {
                    unit: 'Minutes',
                    value: 59
                  }) as string
                )

              cy.get('@minutes').focus().clear().type('10').blur()

              cy.getByTestId('error')
                .eq(0)
                .contains(
                  i18n.t('common:validation.greatOrEqual', {
                    unit: 'Minutes',
                    value: 15
                  }) as string
                )

              cy.get('@minutes').focus().clear().type('25').blur()
            })

          cy.getByTestId(SELECTOR_TIMESHEET_DAY)
            .eq(1)
            .within(() => {
              cy.getByTestId('hours').as('hours')
              cy.getByTestId('minutes').as('minutes')

              // Assert for value restore
              cy.get('@hours').should('value', '02')
              cy.get('@minutes').should('value', '00')

              cy.get('@hours').focus().clear().type('20').blur()

              cy.get('@minutes').focus().clear().type('55').blur()
            })
        })

        cy.getByTestId('totalHours').should('contain', '23 hrs 20 mins')

        cy.getByTestId('submit').click()

        cy.getByTestId('Confirmation').within(() => {
          cy.getByTestId('Confirmation-description').should(
            'contain',
            'Are you sure you want to submit this timesheet?'
          )

          cy.getByTestId('Confirmation-notice').should(
            'contain',
            'Warning! Once submitted, timesheet will be presented to company and will be no longer available for editing. You can go back and save it as a draft to submit it later.'
          )

          cy.getByTestId('Confirmation-action').click()
        })

        cy.get('#react_notification').should(
          'contain',
          'Timesheet has been saved'
        )
      })
    })

    describe('Unsubmit data', () => {
      before(() => {
        resetSetup({
          GetBillingCycle: {
            data: {
              billingCycle: fixtures.MockBillingCyclesWithTimesheet[2]
            }
          }
        })
        cy.waitForReact()
        cy.getByTestId(SELECTOR_LIST_WRAPPER)
          .eq(0)
          .within(() => {
            cy.getByTestId(SELECTOR_TIMESHEET_LIST_ITEM)
              .eq(2)
              .within(() => {
                cy.getByTestId(SELECTOR_TIMESHEET_ITEM_UNSUBMIT).click()
              })
          })
      })

      it('Full flow', () => {
        cy.getByTestId('TimesheetModalTitle-header').should(
          'contain.text',
          'Unsubmit timesheet (May 20, 2019 - May 27, 2019)'
        )

        cy.getByTestId('comment').type('example description of unsubmit')

        cy.getByTestId('submit').click()

        cy.get('#react_notification').should(
          'contain',
          'Timesheet has been unsubmitted'
        )
      })
    })
  })
})
