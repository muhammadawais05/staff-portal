/// <reference types="cypress" />

class EditableCountry {
  getCountryInput() {
    return cy.getByTestId(`EditableCountry-input-country`)
  }

  getCityInput() {
    return cy.getByTestId(`EditableCountry-input-city-input`)
  }

  selectCountry(value: string) {
    cy.selectMenuOptionByText({
      field: `EditableCountry-input-country`,
      text: value
    })
  }
}

export default EditableCountry
