import { FormModal } from '~integration/modules/modals'

class ConvertToAnotherVerticalModal extends FormModal {
  get onboardingVerticalField() {
    return cy
      .getByTestId('convert-onboarding-vertical-select')
      .find('input:last')
  }

  get verticalField() {
    return cy.getByTestId('convert-to-vertical-select').find('input:last')
  }

  get specializationField() {
    return cy.getByTestId('convert-to-specialization-select').find('input:last')
  }
}

export default ConvertToAnotherVerticalModal
