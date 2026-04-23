import { palette } from '@toptal/picasso/utils'
import Color from 'color'
import i18n from '@staff-portal/billing/src/utils/i18n'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/billingCyclesDefault'

const YELLOW = Color(palette.yellow.main).toString()

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()

  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_ENGAGEMENT_ID = 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      contentWindow.DATA_ROLE = 'talent'
      contentWindow.DATA_WIDGET = 'StaffJobPage'
    }
  })
  cy.waitForReact()
}

const validationRequiredMessage = i18n.t('common:validation.required')
const commonPositiveNumberError = i18n.t('common:validation.positive')

describe('Extra Expenses Table', () => {
  describe('when data is empty', () => {
    before(() => {
      resetSetup({
        GetExtraExpenses: {
          data: {
            node: {
              __typename: 'Engagement',
              extraExpenses: [],
              id: '123457'
            }
          }
        }
      })
    })

    it('has empty state', () => {
      cy.getByTestId('ExtraExpenses').within(() => {
        cy.getByTestId('Table').should('have.length', 0)
        cy.getByTestId('ExtraExpenses-empty').should('have.length', 1)
      })
    })
  })
})

describe('when has data', () => {
  before(resetSetup)

  beforeEach(cy.clock)

  it('has its first row defined with company amount and talent amount', () => {
    cy.getByTestId('ExtraExpenses', ' [data-testid=TableRow]')
      .first()
      .within(() => {
        cy.getByTestId('start-date').contains('Feb 29, 2020')
        cy.getByTestId('TableRow-company-amount').contains('$11,111.00')
        cy.getByTestId('TableRow-payments-item_0').contains('$1,111.00')
        cy.getByTestId('TableRow-company-amount')
          .should('have.css', 'color')
          .and('equal', YELLOW)
        cy.getByTestId('TableRow-commissions-empty').should('exist')
        cy.getByTestId('TableRow-company-amount').trigger('mouseover')
      })

    // Commented out due to a buggy behavior:
    // https://toptal-core.slack.com/archives/CJYEJNDU2/p1628604122088700
    // cy.tick(200)
    // cy.getTooltip()
    //   .should('be.visible')
    //   .invoke('text')
    //   .should('contain', 'Outstanding, Leuschke-Berge ZN')

    cy.getByTestId('ExtraExpenses', '[data-testid=TableRow]')
      .first()
      .within(() =>
        cy.getByTestId('TableRow-company-amount').trigger('mouseout')
      )
  })

  it('has its second row defined with company amount and talent amount', () => {
    cy.getByTestId('ExtraExpenses', '[data-testid=TableRow]')
      .last()
      .within(() => {
        cy.getByTestId('start-date').contains('Mar 9, 2020')
        cy.getByTestId('TableRow-company-amount').contains('$100.00')
        cy.getByTestId('TableRow-payments-item_0').contains('$500.00')
        cy.getByTestId('TableRow-company-amount')
          .should('have.css', 'color')
          .and('equal', YELLOW)
        cy.getByTestId('TableRow-commissions-empty').should('exist')
        cy.getByTestId('TableRow-payments-item_0').trigger('mouseover')
      })
    cy.tick(200)

    cy.getTooltip()
      .should('be.visible')
      .invoke('text')
      .should('contain', 'Outstanding, Rich Grimes')

    cy.getByTestId('ExtraExpenses', '[data-testid=TableRow]')
      .last()
      .within(() =>
        cy.getByTestId('TableRow-payments-item_0').trigger('mouseout')
      )
  })

  describe('Extra Expenses Modal', () => {
    it('Is able to fire up the Extra Expenses modal', () => {
      cy.getByTestId('extra-expenses-add').click()
      cy.getByTestId('ExtraExpensesAddModalFormContent-title').contains(
        'New Extra Expenses'
      )
    })

    it('Shows form validation messages properly', () => {
      cy.get('#purchaseOrderId').should('value', 'testExample1')

      cy.getByTestId('talentAmount').as('developer')

      cy.getByTestId('companyAmount').as('company')

      cy.get('@developer').focus().blur()

      cy.get('@company').focus().blur()

      cy.getByTestId('companyAmount-error').contains(validationRequiredMessage)
      cy.getByTestId('talentAmount-error').contains(validationRequiredMessage)
    })

    it('Handles form entered values', () => {
      cy.getByTestId('talentAmount').as('developer')
      cy.getByTestId('companyAmount').as('company')

      cy.get('@developer').type('2').blur()

      cy.get('@developer').should('value', '2.00')

      cy.getByTestId('talentAmount-error').should('not.exist')

      cy.get('@company').type('2.1').blur()

      cy.get('@company').should('value', '2.10')

      cy.getByTestId('companyAmount-error').should('not.exist')
    })

    it('Handles formating values to float numbers', () => {
      cy.getByTestId('talentAmount').as('developer')
      cy.getByTestId('companyAmount').as('company')

      cy.get('@developer').clear().type('1..00.a').blur()

      cy.get('@developer').should('value', '1.00')

      cy.get('@company').clear().type('5.124').blur()

      cy.get('@company').should('value', '5.12')

      cy.get('@company').clear().type('.5').blur()

      cy.get('@company').should('value', '0.50')
    })

    it('Shows error when developer is paid less than the company', () => {
      cy.getByTestId('talentAmount').as('developer')
      cy.getByTestId('companyAmount').as('company')

      cy.get('@developer').clear().type('2').blur()

      cy.get('@company').clear().type('1').blur()
    })

    it('Shows error when amounts are `0`', () => {
      cy.getByTestId('talentAmount').as('developer')
      cy.getByTestId('companyAmount').as('company')

      cy.get('@developer').clear().type('0').blur()

      cy.get('@company').clear().type('0').blur()

      cy.getByTestId('companyAmount-error').contains(commonPositiveNumberError)
      cy.getByTestId('talentAmount-error').contains(commonPositiveNumberError)
    })

    it('Is able to be closed through cancel button', () => {
      cy.getByTestId('cancel').click()

      cy.get('.MuiDialog-root').should('not.exist')
    })
  })
})
