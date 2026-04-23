import { FormModal } from '~integration/modules/modals'

class LinkSourcingRequestModal extends FormModal {
  get input() {
    return cy.get('[role="dialog"]').find('input:last')
  }
}

export default LinkSourcingRequestModal
