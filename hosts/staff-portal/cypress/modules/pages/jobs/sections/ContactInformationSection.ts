class ContactInformationSection {
  get phoneNumberLink() {
    return cy.getByTestId('contacts-section-phone-number')
  }

  get addJobContactButton() {
    return cy.getByTestId('EditContacts-add-btn')
  }

  get contactRemoveButton() {
    return cy.getByTestId('ContactItem-remove-btn')
  }

  get contactActionButton() {
    return cy.getByTestId('contact-item-action-button')
  }

  get contactDetailsPhoneNumberLink() {
    return cy.getByTestId('contact-details-phone-number')
  }
}

export default ContactInformationSection
