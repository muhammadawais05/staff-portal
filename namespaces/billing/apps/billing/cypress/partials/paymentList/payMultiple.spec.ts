/// <reference types="cypress" />

const successfulFlow = () => {
  cy.getByTestId('PayMultipleButton').click()

  cy.get('#comment').focus().clear()

  cy.getByTestId('submit').click()
  cy.getFieldError('comment').should('contain', 'Please complete this field.')

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('PaymentMultiplePayModalForm-info').as('payInfo')
  cy.get('[data-testid="PaymentSelectableListRow-checkbox"] input')
    .should('have.length', 4)
    .as('checkboxList')

  cy.get('@checkboxList').should('be.checked')
  cy.get('@payInfo').should(
    'contain',
    'Payments selected: 4 of 4. Total amount: $6,960.00.'
  )
  cy.get('#isEverythingSelected').click()
  cy.get('@checkboxList').should('not.be.checked')
  cy.get('@payInfo').should(
    'contain',
    'Payments selected: 0 of 4. Total amount: $0.00.'
  )

  cy.getByTestId('submit').click()

  cy.closeNotifications()
  cy.get('#comment').focus().clear()
  cy.getFieldError('comment').should('contain', 'Please complete this field')

  cy.get('#isEverythingSelected').click()

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('submit').click()

  cy.get('#react_notification').should(
    'contain',
    '4 payments successfully paid'
  )

  cy.get('div[role=dialog]').should('have.length', 1)

  // cy.closeNotifications()
  cy.closeModal()
}

const failingFlow = () => {
  cy.getByTestId('PayMultipleButton').click()
  cy.get('#comment').focus().type('Sample comment')
  cy.getByTestId('submit').click()

  cy.getByTestId('FormBaseErrorContainer-error').should(
    'contain',
    'Please select at least one payment.'
  )
  cy.closeModal()
}

const multiplePaymentSubmission = () => {
  cy.getByTestId('PayMultipleButton').click()
  cy.getByTestId('PaymentMultiplePayModalForm-warning').should(
    'contain',
    'Only payments that have a preferred payment method and are not part of a payment group are displayed.'
  )

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('submit').click()
  cy.get('#react_notification').should(
    'contain',
    '4 payments successfully paid'
  )

  // check that modal still has been opened
  cy.get('div[role=dialog]').should('have.length', 1)
  // close modal
  cy.closeModal()
}

const paymentMethodWarningFlow = () => {
  cy.getByTestId('PayMultipleButton').click()

  cy.getByTestId('AlertModal-text').should(
    'contain',
    'No more payments matching search criteria with a preferred payment method could be found. Note that external screeners must have an associated talent role with a preferred payment method.'
  )
}

const validation = () => {
  cy.getByTestId('PayMultipleButton').click()
  cy.get('#comment').focus().clear()
  cy.getByTestId('submit').click()
  cy.getFieldError('comment').should('contain', 'Please complete this field.')

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('PaymentMultiplePayModalForm-info').as('payInfo')
  cy.get('[data-testid="PaymentSelectableListRow-checkbox"] input')
    .should('have.length', 4)
    .as('checkboxList')

  cy.get('@checkboxList').should('be.checked')
  cy.get('[name="isEverythingSelected"]').should('be.checked')

  cy.get('@payInfo').should(
    'contain',
    'Payments selected: 4 of 4. Total amount: $6,960.00.'
  )
  cy.get('#isEverythingSelected').click()
  cy.get('@checkboxList').should('not.be.checked')
  cy.get('@payInfo').should(
    'contain',
    'Payments selected: 0 of 4. Total amount: $0.00.'
  )

  cy.getByTestId('submit').click()

  cy.getByTestId('FormBaseErrorContainer-error').should(
    'contain',
    'Please select at least one payment.'
  )
}

export {
  successfulFlow,
  failingFlow,
  multiplePaymentSubmission,
  paymentMethodWarningFlow,
  validation
}
