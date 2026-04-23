import defaultResponses from '../../../support/defaultResponse/basicBillingInfoDefault'
import setupServer from '../../../support/commands/setupServer'

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
      contentWindow.DATA_WIDGET = 'StaffBasicBillingInfoWidget'
    }
  })
  cy.waitForReact()
}

describe('Basic Billing Info', () => {
  before(() => {
    resetSetup()
  })

  describe('UnappliedCashEntriesModal', () => {
    it('displays modal and entries', () => {
      cy.clock()

      cy.getByTestId('unapplied-cash-entries-button').click()
      cy.getByTestId('subtitle').should(
        'have.text',
        'Below is the list of recorded unapplied cash for Ward-Greenholt YE.'
      )

      cy.getByTestId('date-received-header').should(
        'have.text',
        'Date Received'
      )
      cy.getByTestId('original-amount-header').should(
        'have.text',
        'Original Amount'
      )
      cy.getByTestId('balance-header').should('have.text', 'Balance')

      cy.getByTestId('date-received').first().should('have.text', 'Apr 1, 2022')
      cy.getByTestId('date-received').eq(1).should('have.text', 'Apr 2, 2022')
      cy.getByTestId('date-received').last().should('have.text', 'Apr 3, 2022')

      cy.getByTestId('original-amount').first().should('have.text', '$1,000.00')
      cy.getByTestId('original-amount').eq(1).should('have.text', '$2,000.00')
      cy.getByTestId('original-amount').last().should('have.text', '$3,000.00')

      cy.getByTestId('balance').first().should('have.text', '$1,000.00')
      cy.getByTestId('balance').eq(1).should('have.text', '$2,000.00')
      cy.getByTestId('balance').last().should('have.text', '$3,000.00')

      cy.closeModal()
    })
  })

  it('Refund Credit Balance Modal', () => {
    cy.clock()

    cy.getByTestId(
      'BasicBillingInfoContent-clientRefundCreditBalance-button'
    ).click()

    cy.getByTestId('RefundClientCreditBalanceForm-amount').within(() => {
      cy.get('input').should('have.value', '500.00').clear().blur()

      cy.getFieldError('amount').should(
        'contain.text',
        'Please complete this field.'
      )

      cy.get('input').clear().type('0').blur()

      cy.getFieldError('amount').should(
        'contain.text',
        'Must be greater than 0'
      )

      cy.get('input').clear().type('501').blur()

      cy.getFieldError('amount').should(
        'contain.text',
        'The value cannot be greater than $500.00'
      )

      cy.get('input').clear().type('500').blur()

      cy.getFieldError('amount').should('not.exist')
    })

    cy.getByTestId('submit').click()

    cy.getFieldError('comment').should(
      'contain.text',
      'Please complete this field.'
    )

    cy.getByTestId('RefundClientCreditBalanceForm-comment').type('comment')

    cy.getByTestId('submit').click()

    cy.get('#react_notification').should(
      'contain',
      'Credit balance was successfully refunded.'
    )
    cy.closeNotifications()
  })

  describe('Negative action cases', () => {
    it('Refund Credit Balance Modal', () => {
      cy.clock()
      resetSetup({
        SetRefundClientCreditBalance: {
          data: {
            refundClientCreditBalance: {
              __typename: 'RefundClientCreditBalancePayload',
              errors: [
                {
                  __typename: 'UserError',
                  code: 'base',
                  key: 'base',
                  message: 'Example form level error'
                },
                {
                  __typename: 'UserError',
                  code: 'comment',
                  key: 'comment',
                  message: 'Comment is not nice'
                }
              ],
              client: null,
              success: false,
              notice: ''
            }
          }
        }
      })

      cy.getByTestId(
        'BasicBillingInfoContent-clientRefundCreditBalance-button'
      ).click()

      cy.getByTestId('RefundClientCreditBalanceForm-comment').type('comment')
      cy.getByTestId('submit').click()

      cy.getByTestId('FormBaseErrorContainer-error').should(
        'contain',
        'Example form level error'
      )
      cy.getFieldError('comment').should('contain', 'Comment is not nice')
      cy.closeModal()
    })
  })
})
