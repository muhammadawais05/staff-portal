import { encodeEntityId } from '@staff-portal/data-layer-service'

import { CandidateSendingPage } from '~integration/modules/pages'
import {
  updateCandidateSendingPagePositionStepStubs,
  updateCandidateSendingPageSkillsStepStubs,
  updateCandidateSendingPageAvailabilityStepStubs,
  updateCandidateSendingPageDetailsStepStubs,
  updateCandidateSendingPageFeedbackStepStubs,
  updateCandidateSendingPageNextStepStubs,
  updateCandidateSendingPagePitchStepStubs
} from '~integration/mocks/schema-updates/candidate-sending'
import { ENTER_KEY } from '~integration/utils'

describe('Candidate Sending page', () => {
  const availabilityRequestId = encodeEntityId('123', 'AvailabilityRequest')
  const jobApplicationId = encodeEntityId('123', 'JobApplication')

  const page = new CandidateSendingPage()

  const {
    positionStep,
    skillsStep,
    availabilityStep,
    detailsStep,
    pitchStep,
    feedbackStep
  } = page

  it('renders candidate sending page flow for POSITION step', () => {
    updateCandidateSendingPagePositionStepStubs()

    page.visit()

    cy.contains('Follow these steps to send talent to position')
    cy.contains("Talent's Position")

    positionStep.autocomplete.selectAutocompleteValue({
      inputTestId: 'company-autocomplete-field-input',
      menuItemTestId: 'company-autocomplete-field-menu-item',
      value: 'Rowe-Frami XH'
    })

    positionStep.clientAvailabilityRequestsSelectFieldInput
      .focus()
      .click()
      // TODO: remove { force: true } in scope of
      // https://toptal-core.atlassian.net/browse/SPB-2967
      .trigger('keydown', { keyCode: ENTER_KEY, force: true })

    positionStep.autocomplete.selectAutocompleteValue({
      inputTestId: 'talent-autocomplete-field-input',
      menuItemTestId: 'talent-autocomplete-field-menu-item',
      value: 'Timofei Kachalov'
    })
  })

  it('renders candidate sending page flow for SKILLS step', () => {
    updateCandidateSendingPageSkillsStepStubs()

    page.nextStepButton.click()

    cy.contains('This client requires an expert in JavaScript')
    cy.contains("Talent's Position")

    skillsStep.lowerConfidenceRadioButton.click()
    skillsStep.commentField.type('a')
  })

  it('goes back to the previous step', () => {
    updateCandidateSendingPageAvailabilityStepStubs()

    page.nextStepButton.click()

    updateCandidateSendingPageSkillsStepStubs()

    page.previousStepButton.click()

    skillsStep.lowerConfidenceRadioButton.click()
    skillsStep.commentField.type('a')
  })

  it('renders candidate sending page flow for AVAILABILITY step', () => {
    updateCandidateSendingPageAvailabilityStepStubs()

    page.nextStepButton.click()

    availabilityStep.trialLength
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    availabilityStep.talentAvailabilityCheckbox.click()
    availabilityStep.talentCommitmentCheckbox.click()
  })

  it('renders candidate sending page flow for DETAILS step', () => {
    updateCandidateSendingPageDetailsStepStubs()

    page.nextStepButton.click()

    detailsStep.paymentsSection.should('exist')
  })

  it('renders candidate sending page flow for PITCH step', () => {
    updateCandidateSendingPagePitchStepStubs()

    page.nextStepButton.click()

    pitchStep.pitchCandidateSection.should('exist')
  })

  it('renders candidate sending page flow for FEEDBACK step', () => {
    updateCandidateSendingPageFeedbackStepStubs({
      availabilityRequestId,
      jobApplicationId
    })

    page.sendButton.click()

    cy.contains('Your feedback will be shared directly with talent.')

    feedbackStep
      .getFeedbackCellFieldInput(
        `rejected-application-feedback-cell-feedback-${availabilityRequestId}`
      )
      .type('a')
  })

  it('renders candidate sending page flow for NEXT step', () => {
    updateCandidateSendingPageNextStepStubs()

    feedbackStep.submitButton.click()

    cy.contains("Congratulations — you've just sent a developer to a job!")
  })
})
