/// <reference types="cypress" />

const successfulFlow = () => {
  cy.getByTestId('WriteOffModalForm-title').should(
    'contain',
    'Write off Invoice #377249'
  )

  cy.getByTestId('comment').within(() => {
    cy.get('#comment').focus().blur()
  })

  cy.getFieldError('comment').should('contain', 'Please complete this field.')

  cy.getByTestId('comment').within(() => {
    cy.get('#comment').focus().clear().type('This is an example comment').blur()
  })

  cy.getByTestId('submit').click()
  cy.get('#react_notification').should(
    'contain',
    'Invoice #377249 has been written off.'
  )
  cy.closeNotifications()
}

const failureFlow = () => {
  cy.getByTestId('comment').type('This is an example comment')
  cy.getByTestId('submit').click()

  cy.getByTestId('FormBaseErrorContainer-error').should(
    'contain',
    'Example form level error'
  )
  cy.getFieldError('comment').should('contain', 'Comment is not nice')
  cy.closeModal()
}

export { successfulFlow, failureFlow }
