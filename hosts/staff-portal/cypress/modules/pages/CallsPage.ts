import BasePage from './BasePage'
import { EditableField } from '~integration/modules/components'

class CallsPage extends BasePage {
  editableField = new EditableField()

  visit(path?: string) {
    if (path) {
      cy.visit('/calls' + path)
    } else {
      cy.visit('/calls')
    }
  }

  editPurpose() {
    this.editableField.toggleEditMode('purpose')
  }

  editCounterParty() {
    this.editableField.toggleEditMode('fullName')
  }

  setCounterParty(value: string) {
    cy.getByTestId('users-autocomplete').type(value)
    cy.getByTestId('go-to-user-label').contains(value).click()
  }

  setPurpose(text: string) {
    cy.selectMenuOptionByText({
      field: 'select-purpose',
      text
    })
    if (text === 'Other') {
      cy.getByTestId('text-input-purpose').find('input').type('other purpose')
      cy.getByTestId('button-input-purpose').click()
    }
  }

  dismissCall() {
    cy.getByTestId('call-actions-dropdown').click()
    cy.getByTestId('call-menu-item').contains('Dismiss Call').click()
  }

  undismissCall() {
    cy.getByTestId('call-actions-dropdown').click()
    cy.getByTestId('call-menu-item').contains('Undismiss Call').click()
  }

  confirmDismissCall() {
    cy.getByTestId('dismiss-button').click()
  }

  getRow(rowNo: number) {
    return cy.getByTestId('table-row').eq(rowNo)
  }

  getCounterPartyAtRow(rowNo: number) {
    return this.getRow(rowNo).find('td[data-testid="table-row-user"]')
  }

  getPurposeAtRow(rowNo: number) {
    return this.getRow(rowNo).find('td[data-testid="table-row-purpose"]')
  }

  listenToVoicemail() {
    cy.getByTestId('call-actions-dropdown').click()
    cy.getByTestId('call-menu-item').contains('Listen Voicemail').click()
  }

  getPageTitle() {
    return cy.get('h2')
  }
}

export default CallsPage
