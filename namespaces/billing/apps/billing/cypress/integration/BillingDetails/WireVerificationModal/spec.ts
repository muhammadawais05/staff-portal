import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import defaultResponses from '../../../support/defaultResponse/billingDetailsDefault'
import setupServer from '../../../support/commands/setupServer'

const resetSetup = (overriddenResponses = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses: {
        ...defaultResponses,
        SetUnverifyWireBillingOption: {
          data: {
            unverifyWireBillingOption: {
              success: true,
              errors: [],
              __typename: 'UnverifyWireBillingOptionPayload'
            }
          }
        },
        SetVerifyWireBillingOption: {
          data: {
            verifyWireBillingOption: {
              success: true,
              errors: [],
              __typename: 'VerifyWireBillingOptionPayload'
            }
          }
        }
      },
      overriddenResponses
    })
  )
  cy.visit('/', {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffBillingDetailsWidget'
    }
  })
  cy.waitForReact()
}

describe('when wire billing option is pending verification', () => {
  before(() => {
    resetSetup()
  })

  it('button to unverify the billing option is available', () => {
    cy.getByTestId('BillingOption-wire-unverify').should('exist')
  })

  it('button opens up the modal to unverify the billing option', () => {
    cy.getByTestId('BillingOption-wire-unverify').click()

    cy.getByTestId('ModalsState-billingOptionWireVerification').should('exist')
  })

  it('displays an error if field is empty', () => {
    cy.getByTestId('submit').click()

    cy.getFieldError('comment').should('contain', 'Please complete this field.')
  })

  it('displays a success notification', () => {
    cy.getByTestId('WireVerificationModalForm-comment')
      .find('textarea')
      .first()
      .type('A comment')

    cy.getByTestId('submit').click()

    cy.getNotification().should(
      'contain',
      'The Billing Option was successfully unverified.'
    )
  })
})

describe('when wire billing option is verified', () => {
  before(() => {
    resetSetup({
      GetClientBillingDetails: {
        data: {
          node: {
            ...defaultResponses.GetClientBillingDetails.data.node,
            billingOptions: {
              __typename: 'BillingOptionInterfaceConnection',
              nodes: [
                {
                  ...defaultResponses.GetClientBillingDetails.data.node
                    .billingOptions?.nodes[1],
                  operations: {
                    ...defaultResponses.GetClientBillingDetails.data.node
                      .billingOptions?.nodes[1].operations,
                    verifyWireBillingOption: {
                      callable: OperationCallableTypes.ENABLED,
                      messages: [],
                      __typename: 'Operation'
                    },
                    unverifyWireBillingOption: {
                      callable: OperationCallableTypes.HIDDEN,
                      messages: [],
                      __typename: 'Operation'
                    },
                    __typename: 'WireBillingOptionOperations'
                  },
                  __typename: 'WireBillingOption'
                }
              ],
              totalCount: 1
            }
          },
          viewer: {
            permits: { canManageBillingOptions: true }
          }
        }
      }
    })
  })

  it('button to verify the billing option is available', () => {
    cy.getByTestId('BillingOption-wire-verify').should('exist')
  })

  it('button opens up the modal to verify the billing option', () => {
    cy.getByTestId('BillingOption-wire-verify').click()

    cy.getByTestId('ModalsState-billingOptionWireVerification').should('exist')
  })

  it('displays an error if field is empty', () => {
    cy.getByTestId('submit').click()

    cy.getFieldError('comment').should('contain', 'Please complete this field.')
  })

  it('displays a success notification', () => {
    cy.getByTestId('WireVerificationModalForm-comment')
      .find('textarea')
      .first()
      .type('A comment')

    cy.getByTestId('submit').click()

    cy.getNotification().should(
      'contain',
      'The Billing Option was successfully verified.'
    )
  })
})
