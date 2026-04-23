import BasePage from './BasePage'

class AddVertical extends BasePage {
  visit() {
    return cy.visit('/vertical_settings/create')
  }

  getFormInputByName(name: 'talentType' | 'publicPagesPath') {
    return cy.getByTestId(`AddVerticalForm-${name}`)
  }

  getFormSubmitButton() {
    return cy.getByTestId('AddVerticalForm-submit-button')
  }
}

export default AddVertical
