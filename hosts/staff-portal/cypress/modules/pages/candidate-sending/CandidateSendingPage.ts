import { BasePage } from '~integration/modules/pages'
import {
  PositionStep,
  SkillsStep,
  AvailabilityStep,
  DetailsStep,
  FeedbackStep,
  PitchStep
} from '~integration/modules/pages/candidate-sending/steps'

class CandidateSendingPage extends BasePage {
  positionStep = new PositionStep()
  skillsStep = new SkillsStep()
  availabilityStep = new AvailabilityStep()
  detailsStep = new DetailsStep()
  pitchStep = new PitchStep()
  feedbackStep = new FeedbackStep()

  visit(queryParams = '') {
    return cy.visit(`/engagements/new${queryParams}`)
  }

  get previousStepButton() {
    return cy.getByTestId('previous-step-button')
  }

  get nextStepButton() {
    return cy.getByTestId('next-step-button')
  }

  get sendButton() {
    return cy.getByTestId('candidate-sending-send-button')
  }
}

export default CandidateSendingPage
