/// <reference types="cypress" />

const successfulFlow = () => {
  cy.getByTestId('PayMultipleButton').click()

  cy.get('#comment').focus().clear()

  cy.getByTestId('submit').click()
  cy.getFieldError('comment').should('contain', 'Please complete this field.')

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('PaymentGroupMultiplePayModalForm-info').as('payInfo')
  cy.get('[data-testid="PaymentGroupSelectableListRow-checkbox"] input')
    .should('have.length', 3)
    .as('checkboxList')

  cy.get('@checkboxList').should('be.checked')
  cy.get('@payInfo').should(
    'contain',
    'Payment groups selected: 3 of 3. Total amount: $8,566.83.'
  )
  cy.get('#isEverythingSelected').click()
  cy.get('@checkboxList').should('not.be.checked')
  cy.get('@payInfo').should(
    'contain',
    'Payment groups selected: 0 of 3. Total amount: $0.00.'
  )

  cy.getByTestId('submit').click()

  // closing the 0 payment groups paid notification which will never
  // get displayed in real world scenario because the submission
  // will result in a graphQL error, which is tested in the failingFlow
  cy.closeNotifications()

  cy.get('#comment').focus().clear()
  cy.getFieldError('comment').should('contain', 'Please complete this field')

  cy.get('#isEverythingSelected').click()

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('submit').click()

  cy.get('#react_notification').should(
    'contain',
    '3 payment groups successfully paid'
  )

  cy.get('div[role=dialog]').should('have.length', 1)

  cy.closeModal()

  cy.closeNotifications()
}

const failingFlow = () => {
  cy.getByTestId('PayMultipleButton').click()
  cy.get('#isEverythingSelected').click()
  cy.get('#comment').focus().type('Sample comment')
  cy.getByTestId('submit').click()

  cy.getByTestId('FormBaseErrorContainer-error').should(
    'contain',
    'Please select at least one payment group.'
  )

  cy.closeModal()
}

const paymentMethodWarningFlow = () => {
  cy.getByTestId('PayMultipleButton').click()

  cy.getByTestId('AlertModal-text').should(
    'contain',
    'No more payment groups matching search criteria with a preferred payment method could be found. Note that external screeners must have an associated talent role with a preferred payment method.'
  )
}

const multiplePaymentGroupSubmission = () => {
  // click in the right side of the button to avoid unexpected error notification overlap
  cy.getByTestId('PayMultipleButton').click('right')
  cy.getByTestId('PaymentGroupMultiplePayModalForm-warning').should(
    'contain',
    'Only payment groups that have an outstanding status and a preferred payment method are displayed.'
  )

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('submit').click()
  cy.get('#react_notification').should(
    'contain',
    '3 payment groups successfully paid'
  )

  // check that modal still has been opened
  cy.get('div[role=dialog]').should('have.length', 1)
  // close modal
  cy.closeModal()
}

const validation = () => {
  cy.getByTestId('PayMultipleButton').click()
  cy.get('#comment').focus().clear()
  cy.getByTestId('submit').click()
  cy.getFieldError('comment').should('contain', 'Please complete this field.')

  cy.get('#comment').focus().type('Sample comment')

  cy.getByTestId('PaymentGroupMultiplePayModalForm-info').as('payInfo')
  cy.get('[data-testid="PaymentGroupSelectableListRow-checkbox"] input')
    .should('have.length', 3)
    .as('checkboxList')

  cy.get('@checkboxList').should('be.checked')
  cy.get('[name="isEverythingSelected"]').should('be.checked')

  cy.get('@payInfo').should(
    'contain',
    'Payment groups selected: 3 of 3. Total amount: $8,566.83.'
  )
  cy.get('#isEverythingSelected').click()
  cy.get('@checkboxList').should('not.be.checked')
  cy.get('@payInfo').should(
    'contain',
    'Payment groups selected: 0 of 3. Total amount: $0.00.'
  )

  cy.getByTestId('submit').click()

  cy.getByTestId('FormBaseErrorContainer-error').should(
    'contain',
    'Please select at least one payment group.'
  )

  cy.closeModal()
}

export {
  successfulFlow,
  failingFlow,
  multiplePaymentGroupSubmission,
  paymentMethodWarningFlow,
  validation
}
