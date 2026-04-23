import { FormModal } from '~integration/modules/modals'

export default class CreateSoftSkillRatingModal extends FormModal {
  get ratingStar() {
    return cy.getByTestId('rating-icon: RATING_4')
  }
}
