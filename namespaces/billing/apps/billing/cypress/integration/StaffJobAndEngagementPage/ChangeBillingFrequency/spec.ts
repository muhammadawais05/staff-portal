import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/billingCyclesDefault'

/// <reference types="cypress" />

const setUpServer = (overriddenResponses = {}) =>
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )

describe('Change Billing Frequency - Modal', () => {
  before(() => {
    const now = new Date(2020, 4, 16).getTime()

    cy.clock(now)
    setUpServer()
    cy.visit('/?modal=billing-cycle-settings&engagement_id=171608', {
      onBeforeLoad: contentWindow => {
        contentWindow.DATA_WIDGET = 'StaffJobPage'
        contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
        contentWindow.DATA_ROLE = 'staff'
        contentWindow.DATA_MODALS_ONLY = true
      }
    })
    cy.waitForReact()
  })

  describe('When modal has been opened', () => {
    describe('Check pre-filled data', () => {
      it('Header', () => {
        cy.getByTestId('BillingCycleSettingsModalForm-title').contains(
          'Update Billing Cycle Settings'
        )
      })

      it('default values', () => {
        cy.getByTestId('BillingCycleSettingsModalForm-net').contains('Net 30')
      })
    })

    describe('Check input variations', () => {
      it('whole flow', () => {
        cy.selectByValue({ field: 'billCycle-field', value: 'SEMI_MONTHLY' })

        cy.getByTestId('BillingCycleSettingsModalForm-semi-monthly').contains(
          'The talent must have Semi-Monthly Payments Agreement.'
        )

        cy.selectByValue({ field: 'billCycle-field', value: 'MONTHLY' })

        cy.selectByValue({ field: 'billCycle-field', value: 'BI_WEEKLY' })

        // this is done just to click away from the dropdown field
        cy.getByTestId('BillingCycleSettingsModalForm-title').click()

        cy.selectByValue({ field: 'billDay-field', value: 'WEDNESDAY' })

        cy.get('#currentCycleEndDate').should('value', '')
        cy.getByTestId('currentCycleEndDate').click()
        cy.get('#currentCycleEndDate').focus().clear().type('2019-08-27').blur()

        cy.selectByValue({ field: 'billDay-field', value: 'WEDNESDAY' })

        cy.getByTestId(
          'BillingCycleSettingsModalForm-auto-consolidation'
        ).contains(
          'Auto-consolidation is enabled for this engagement. Changing the Billing Cycle Settings will disable auto-consolidation and may cause billing issues. Please consult with the Finance team before performing this action.'
        )

        cy.getByTestId('submit').click()
      })
    })
  })
})
