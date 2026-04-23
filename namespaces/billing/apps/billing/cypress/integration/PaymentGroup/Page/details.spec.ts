import fixtures from '@staff-portal/billing/src/_fixtures'

import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/paymentGroupDetailsDefault'

/// <reference types="cypress" />

const PAYMENT_GROUP_PAGE_ITEMS = 25
const totalCount = PAYMENT_GROUP_PAGE_ITEMS * 2 + 3

const multipleByTotalCount = <T>(payments: T[]): T[] => {
  let result = payments

  if (!result || result.length === 0) {
    throw new Error('payments are required to properly test pagination')
  }

  while (result.length < totalCount) {
    result = result.concat(result)
  }

  return result
}

const getMultipliedList = ({
  pagination
}: Record<string, Record<string, number>> = {}) => {
  const start = pagination?.offset || 0
  const end = pagination?.offset + pagination?.limit

  return {
    ...fixtures.MockPaymentGroupDetails,
    payments: {
      ...fixtures.MockPaymentGroupDetails.payments,
      totalCount,
      groups: [
        {
          ...fixtures.MockPaymentGroupDetails.payments.groups[0],
          payments: multipleByTotalCount(
            fixtures.MockPaymentGroupDetails.payments.groups[0].payments
          ).slice(start, end)
        }
      ]
    }
  }
}

const resetSetup = ({ overriddenResponses = {}, baseUrl = '/' } = {}) => {
  cy.server()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cy.mockGraphQL((operationName: string, variables?: Record<string, any>) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses: {
        ...overriddenResponses,
        GetPaymentGroupDetailsPayments: {
          data: {
            node: getMultipliedList(variables)
          }
        }
      }
    })
  )

  cy.clock()

  cy.visit(baseUrl, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffPaymentGroupDetailsPage'
      contentWindow.DATA_PAYMENT_GROUP_ID = Number(
        fixtures.MockPaymentGroup.number
      )

      cy.stub(contentWindow, 'open')
    }
  })
  cy.waitForReact()
}

describe('Payment Group Details Page', () => {
  describe('when Removing Payment', () => {
    before(() => resetSetup({}))

    describe('when withheld is active', () => {
      it('displays Confirmation with a warning text', () => {
        cy.getByTestId('PaymentGroupPaymentsActions-remove-payment')
          .first()
          .click()

        cy.getByTestId('handleOnRemovePaymentFromPaymentGroup-withheld').should(
          'contain.text',
          "The user's payments are withheld, so as soon as you remove this payment from the group it will become withheld as well, and you won't be able to add it back to this group."
        )

        cy.getByTestId('Confirmation-cancel').click()
      })
    })

    describe('when withheld is inactive', () => {
      it('displays Confirmation', () => {
        cy.getByTestId('PaymentGroupPaymentsActions-remove-payment')
          .eq(1)
          .click({ force: true })

        cy.getByTestId('Confirmation-description')
          .should(
            'not.contain.text',
            "The user's payments are withheld, so as soon as you remove this payment from the group it will become withheld as well, and you won't be able to add it back to this group."
          )
          .should(
            'contain.text',
            'Are you sure you want to remove the payment from the group?'
          )
      })
    })
  })

  describe('when Pay operation is disabled', () => {
    before(() =>
      resetSetup({
        baseUrl:
          '/?modal=payment-group-pay&node_id=186344&node_type=paymentGroup',
        overriddenResponses: {
          GetPaymentGroupPayModal: {
            data: {
              node: {
                ...defaultResponses.GetPaymentGroupPayModal.data.node,
                operations: {
                  ...defaultResponses.GetPaymentGroupPayModal.data.node
                    .operations,
                  payPaymentGroup: {
                    callable: 'DISABLED',
                    messages: ['Reason why Pay operation is disabled.'],
                    __typename: 'Operation'
                  },
                  __typename: 'PaymentGroupOperations'
                }
              }
            }
          }
        }
      })
    )

    it('displays an alert on Pay modal open', () => {
      cy.getByTestId('ModalsState-paymentGroupPay').within(() => {
        cy.getByTestId('AlertModal-title').should(
          'contain.text',
          'Pay Payment Group #186344'
        )
        cy.getByTestId('AlertModal-text').should(
          'contain.text',
          'Reason why Pay operation is disabled.'
        )
        cy.contains('OK').click()
      })
    })
  })

  describe('displaying pagination', () => {
    beforeEach(() => resetSetup({}))

    const pagesExpected = Math.ceil(totalCount / PAYMENT_GROUP_PAGE_ITEMS)

    describe('when navigating to a different page', () => {
      it('displays the right amount of pages', () => {
        cy.getByTestId('PaymentGroupPaymentsTable-Pagination').within(() => {
          cy.get('button').should('contain.text', `${pagesExpected}`)
        })
      })

      it('navigates between pages', () => {
        cy.getByTestId('PaymentGroupPaymentsTable-Pagination').within(() => {
          cy.get('button')
            .eq(0)
            .should('be.disabled')
            .should('contain.text', 'Prev')
          cy.react('Button').contains(`${pagesExpected}`).click()
          cy.waitForReact()
          cy.get('button')
            .eq(0)
            .should('not.be.disabled')
            .should('contain.text', 'Prev')
        })
      })
    })
  })
})
