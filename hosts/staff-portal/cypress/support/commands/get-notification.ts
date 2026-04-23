/// <reference types="cypress" />

export const getNotification = () => {
  return cy.get('.MuiSnackbarContent-message')
}
