// eslint-disable-next-line max-statements
export const successfulFlow = () => {
  cy.getByTestId('MemorandumListHeader-add-button').click()

  cy.getByTestId('ModalFormReceiver').as('ModalFormReceiver')

  cy.log(
    '**Test that "affects commissions" checkbox is not unchecked after typing in receiver field**'
  )

  cy.getByTestId('memo-affects-commissions').should('exist')

  cy.getByTestId('memo-affects-commissions')
    .find('input')
    .first()
    .should('be.checked')

  cy.get('@ModalFormReceiver')
    .click()
    .type('test')
    .within(() => {
      cy.get('input[type="text"]').blur()
    })

  cy.getByTestId('memo-affects-commissions')
    .find('input')
    .first()
    .should('be.checked')

  cy.log('**Test receiver correct fill and warnings toggle**')

  cy.get('@ModalFormReceiver').click().type('Top{enter}')

  cy.getByTestId('ModalFormCommissionsWarning').should('not.exist')

  cy.getByTestId('memo-affects-commissions').find('input').first().click()

  cy.getByTestId('ModalFormCommissionsWarning').should('exist')

  cy.get('@ModalFormReceiver').within(() => {
    cy.get('input[type="text"]').click().clear().blur()
  })

  cy.getByTestId('memo-affects-commissions').should('exist')

  cy.log('**Test submission flow for Add Memo modal**')

  // fill fields
  cy.getByTestId('memo-balanceType').contains('Debit').click()

  cy.getByTestId('memo-amount').within(() => {
    cy.get('input')
      .focus()
      .type('100.50.0')
      .blur()
      .should('have.value', '100.50')
  })

  cy.getByTestId('memo-comment').type('Some comment')

  cy.getByTestId('notify-receiver-checkbox').click()

  // test receiver input submission error
  cy.get('@ModalFormReceiver')
    .click()
    .type('P')
    .tick(501)
    .get('@ModalFormReceiver')
    .type('{enter}')
    .type('aa')
    .tick(501)

  cy.getByTestId('submit').click()

  cy.getFieldError('receiverId__fake').should(
    'contain',
    'Please provide existing talent or company as the receiver'
  )

  cy.get('@ModalFormReceiver').click().type('{end}{backspace}{backspace}')

  cy.getByTestId('submit').click()

  cy.getFieldError('receiverId__fake').should(
    'contain',
    'Please provide existing talent or company as the receiver'
  )

  cy.get('@ModalFormReceiver').click().type('{enter}')

  cy.getFieldError('receiverId__fake').should('not.exist')

  // submit form
  cy.getByTestId('submit').click()

  cy.getNotification().should(
    'contain',
    `The Memorandum was successfully added to user's account.`
  )
}
