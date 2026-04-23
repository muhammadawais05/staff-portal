import { FormModal } from '~integration/modules/modals'

class LinkJobOpportunity extends FormModal {
  get opportunitySelect() {
    return cy
      .getByTestId('LinkJobOpportunityModal-opportunity-select')
      .find('input:last')
  }
}

export default LinkJobOpportunity
