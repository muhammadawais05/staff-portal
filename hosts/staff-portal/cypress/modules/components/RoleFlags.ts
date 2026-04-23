class RoleFlags {
  editFlagWithName(text: string) {
    return cy.get('div[role="button"]').contains(text)
  }

  get flagSelect() {
    return cy.getByTestId('flag-select').find('input:last')
  }

  get flagTag() {
    return cy.getByTestId('role-flag')
  }

  get commentField() {
    return cy.getByTestId('comment-field')
  }

  get addFlagButton() {
    return cy.getByTestId('add-role-flag-button')
  }

  get updateFlagButton() {
    return cy.getByTestId('update-flag-button')
  }

  get editFlagButton() {
    return cy.getByTestId('edit-role-flag-button')
  }

  get deleteFlagButton() {
    return cy.getByTestId('remove-role-flag-button')
  }
}

export default RoleFlags
