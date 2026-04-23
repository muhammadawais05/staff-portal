/// <reference types="cypress" />

import { BasicModal } from '../modals'

abstract class BasePage {
  get moreDropdown() {
    return cy.getByTestId('MoreButton-dropdown')
  }

  get modal() {
    return new BasicModal()
  }

  get title() {
    return cy.getByTestId('content-title')
  }

  stubOpenNewTab(stubName: string) {
    return cy.window().then(win => {
      return cy.stub(win, 'open').as(stubName)
    })
  }

  getNotification(message: string) {
    return cy.getNotification().contains(message)
  }
}

export default BasePage
