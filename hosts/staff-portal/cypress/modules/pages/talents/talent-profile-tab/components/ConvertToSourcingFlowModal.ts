import { FormModal } from '~integration/modules/modals'

class ConvertToSourcingFlowModal extends FormModal {
  get countryField() {
    return cy.getByTestId('convert-to-sourcing-flow-country').find('input:last')
  }

  get citizenshipField() {
    return cy
      .getByTestId('convert-to-sourcing-flow-citizenship')
      .find('input:last')
  }

  get cityField() {
    return cy.getByTestId('convert-to-sourcing-flow-city')
  }

  get applicantSkillsField() {
    return cy.getByTestId('talent-applicant-skills-selector-input')
  }

  get englishProficiencyField() {
    return cy
      .getByTestId('convert-to-sourcing-flow-answer-container')
      .find('input:last')
  }
}

export default ConvertToSourcingFlowModal
