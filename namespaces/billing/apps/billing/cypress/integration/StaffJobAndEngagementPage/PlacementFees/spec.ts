import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { common } from '../../../support/i18n/common'
import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/billingCyclesDefault'

/// <reference types="cypress" />

const YELLOW = Color(palette.yellow.main).toString()
const RED = Color(palette.red.main).toString()

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
      contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      contentWindow.DATA_ROLE = 'talent'
      contentWindow.DATA_WIDGET = 'StaffJobPage'
    }
  })
  cy.waitForReact()
}

describe('PlacementFees empty state', () => {
  describe('PlacementFees - Table', () => {
    describe('when data is empty', () => {
      before(() => {
        resetSetup({
          GetPlacementFees: {
            data: {
              node: {
                __typename: 'Engagement',
                placementFees: [],
                id: '123457'
              }
            }
          }
        })
      })

      it('has empty state', () => {
        cy.getByTestId('PlacementFees').within(() => {
          cy.getByTestId(`Table`).should('have.length', 0)
          cy.getByTestId(`PlacementFees-empty`).should('have.length', 1)
        })
      })
    })
  })
})

describe('PlacementeFees with data', () => {
  beforeEach(cy.clock)

  before(resetSetup)

  describe('main functionality', () => {
    it('first row', () => {
      cy.getByTestId('PlacementFees').within(() => {
        cy.getByTestId('TableRow')
          .first()
          .within(() => {
            cy.getByTestId('due-date').contains('Jan 30, 2020')
            cy.getByTestId('TableRow-invoice-amount').contains('$45,820.00')
            cy.getByTestId('TableRow-invoice-amount')
              .should('have.css', 'color')
              .and('equal', RED)
            cy.getByTestId('TableRow-invoice-amount').trigger('mouseover')
            cy.getByTestId('TableRow-commissions').should('contain', '$300.00')
            cy.getByTestId('description').contains(
              "1/2 of placement fee for Cesar O'Keefe for [Enterprise] Full-stack Phoenix/Elixir developer."
            )
          })
      })

      cy.tick(200)

      cy.getTooltip()
        .should('be.visible')
        .should('contain', 'Overdue, Feeney, Weimann and Fadel')

      cy.getByTestId('PlacementFees').within(() => {
        cy.getByTestId('TableRow')
          .first()
          .within(() => {
            cy.getByTestId('TableRow-invoice-amount').trigger('mouseout')

            cy.getByTestId('TableRow-commissions-commission-amount').trigger(
              'mouseover'
            )
          })
      })

      cy.tick(200)

      cy.getTooltip()
        .should('be.visible')
        .should('contain', 'Overdue, Bruno Carvalho')
    })

    it('second row', () => {
      cy.getByTestId('PlacementFees').within(() => {
        cy.getByTestId('TableRow')
          .last()
          .within(() => {
            cy.getByTestId('due-date').contains('Feb 29, 2020')
            cy.getByTestId('TableRow-invoice-amount').contains('$95,125.00')
            cy.getByTestId('TableRow-invoice-amount')
              .should('have.css', 'color')
              .and('equal', YELLOW)
            cy.getByTestId('TableRow-invoice-amount').trigger('mouseover')
            cy.getByTestId('TableRow-commissions').contains('—')
            cy.getByTestId('description').contains(
              "1/2 of placement fee for Cesar O'Keefe for [Enterprise] Full-stack Phoenix/Elixir developer."
            )
          })
      })

      cy.tick(200)

      cy.getTooltip()
        .should('be.visible')
        .invoke('text')
        .should('contain', 'Outstanding, Feeney, Weimann and Fadel')

      cy.getByTestId('PlacementFees').within(() => {
        cy.getByTestId('TableRow')
          .last()
          .within(() => {
            cy.getByTestId('TableRow-invoice-amount').trigger('mouseout')
          })
      })
    })
  })

  describe('PlacementFees - Add Modal', () => {
    describe('when submission is successful', () => {
      before(() => cy.getByTestId('placement-fees-add').click())

      beforeEach(() => {
        cy.getByTestId('AddModalForm').within(() => {
          cy.getByTestId('continue').as('continueBtn')
          cy.getByTestId('installments[0].amount').as('firstAmountField')
          cy.getByTestId('installments[0].dueDate').as('firstDueDateField')
          cy.getByTestId('addInstallment').as('addInstallmentBtn')
          cy.getByTestId('deleteInstallmentBtn').as('deleteInstallmentBtns')
        })
      })

      it('verify the behaviour', () => {
        cy.get('#purchaseOrderId').should('value', 'testExample1')

        cy.get('@continueBtn').click()
        cy.getByTestId('installments[0].amount-error').contains(
          i18n.t('common:validation.required') as string
        )
        cy.getByTestId('installments[0].dueDate-error').should('not.exist')
      })

      it('handles interactions correctly', () => {
        // test behavior after typing in an amount
        cy.get('@firstAmountField').type('5')
        cy.getByTestId('installments[0].amount-error').should('not.exist')
        cy.contains(`${i18n.t('placementFees:AddModal.summary')} $5.00.`)
        cy.get('@firstAmountField').blur().should('value', '5.00')

        // test Continue and Back buttons
        cy.get('@continueBtn').click()
        cy.contains(i18n.t('common:actions.back') as string).click()

        // test adding installments
        cy.get('@deleteInstallmentBtns').should('be.disabled')
        cy.get('@addInstallmentBtn').click()
        cy.getByTestId('AddModalForm').within(() => {
          cy.get('@deleteInstallmentBtns')
            .should('have.length', 2)
            .and('be.enabled')
        })
        cy.contains(`${i18n.t('placementFees:AddModal.summary')} $10.00.`)

        // test adding maximum number of installments
        cy.get('@addInstallmentBtn')
          .click()
          .click()
          .click()
          .click()
          .should('be.disabled')

        cy.getByTestId('AddModalForm').within(() => {
          cy.get('[data-testid^="installments["]')
            .get('[data-testid$="].amount"]')
            .should('have.length', 6)
            .and('value', '5.00')
          cy.get('[data-testid^="installments["]')
            .get('[data-testid$="].dueDate"]')
            .should('have.length', 6)
        })
        cy.contains(`${i18n.t('placementFees:AddModal.summary')} $30.00.`)

        // test removing installments
        cy.get('@deleteInstallmentBtns').first().click()
        cy.get('@addInstallmentBtn').should('be.enabled')
        cy.get('@deleteInstallmentBtns').last().click()
        cy.get('@deleteInstallmentBtns').last().click()
        cy.get('@deleteInstallmentBtns').last().click()

        cy.getByTestId('AddModalForm').within(() => {
          cy.get('[data-testid^="installments["]')
            .get('[data-testid$="].amount"]')
            .should('have.length', 2)
            .and('value', '5.00')
          cy.get('[data-testid^="installments["]')
            .get('[data-testid$="].dueDate"]')
            .should('have.length', 2)
        })
        cy.contains(`${i18n.t('placementFees:AddModal.summary')} $10.00.`)
      })

      it('handles datepicker properly', () => {
        cy.get('@firstDueDateField').clear().blur()

        cy.getByTestId('installments[0].dueDate-error').should(
          'contain',
          common.validation.required
        )

        cy.get('@firstDueDateField')
          .focus()
          .type('2020-02-15')
          .blur()
          .and('value', '2020-02-15')
      })

      it('amount validator function', () => {
        cy.get('@firstAmountField').focus().clear().blur()

        cy.getByTestId('installments[0].amount-error').should(
          'contain',
          common.validation.required
        )

        cy.get('@firstAmountField')
          .focus()
          .type('-15')
          .blur()
          .and('value', '15.00')
      })

      it('confirm rendered properly', () => {
        cy.get('@firstAmountField').focus().type('5')

        cy.get('@addInstallmentBtn').click()

        cy.getByTestId('installments[1].amount').focus().clear().type('15')

        cy.getByTestId('installments[1].amount').focus().clear().type('15')

        cy.get('@continueBtn').click()

        cy.getByTestId('AddModalFormConfirm-subtitle').contains(
          'Please review and confirm the payment plan for $35.01 below:'
        )

        cy.getByTestId('submit').click()
        cy.get('#react_notification').should(
          'contain',
          'The Placement Fee was successfully created.'
        )
      })
    })

    describe('when submission has failed', () => {
      before(() => {
        resetSetup({
          SetCreateEngagementPlacementFee: {
            data: {
              createEngagementPlacementFee: {
                __typename: 'CreateEngagementPlacementFeePayload',
                placementFees: null,
                errors: [
                  {
                    __typename: 'UserError',
                    code: 'exampleCode',
                    key: 'base',
                    message: ['Example form level error']
                  }
                ],
                notice: '',
                success: false
              }
            }
          }
        })

        cy.getByTestId('placement-fees-add').click()

        cy.getByTestId('AddModalForm').within(() => {
          cy.getByTestId('continue').as('continueBtn')
          cy.getByTestId('installments[0].amount').as('firstAmountField')
          cy.getByTestId('installments[0].dueDate').as('firstDueDateField')
          cy.getByTestId('addInstallment').as('addInstallmentBtn')
          cy.getByTestId('deleteInstallmentBtn').as('deleteInstallmentBtns')
        })
      })

      it('verify the behaviour', () => {
        cy.get('@firstAmountField').focus().type('5')

        cy.get('@addInstallmentBtn').click()

        cy.getByTestId('installments[1].amount').focus().clear().type('15')

        cy.getByTestId('installments[1].amount').focus().clear().type('15')

        cy.get('@continueBtn').click()
        cy.getByTestId('submit').click()
        cy.getByTestId('FormBaseErrorContainer-error').should(
          'contain',
          'Example form level error'
        )
        cy.getByTestId('purchaseOrderId-field').should('be.visible')
        cy.getByTestId('continue').click()
        cy.getByTestId('AddModalFormConfirm-subtitle').should('be.visible')
      })
    })
  })
})
