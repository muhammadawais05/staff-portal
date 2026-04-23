import { FormModal } from '~integration/modules/modals'

class RepauseCompanyModal extends FormModal {
  get dueDateField() {
    return cy.getByTestId(`RepauseCompanyModal-due-date`).find('input')
  }

  get detailsField() {
    return cy.getByTestId(`RepauseCompanyModal-details`)
  }
}

export default RepauseCompanyModal
