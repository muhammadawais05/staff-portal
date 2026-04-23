import { BasePage } from '~integration/modules/pages'
import {
  BreaksSection,
  StatusSection,
  CompanySection,
  TalentSection,
  FeedbacksSection,
  InterviewsSection
} from './sections'

class Engagement extends BasePage {
  breaksSection = new BreaksSection()
  feedbacksSection = new FeedbacksSection()
  statusSection = new StatusSection()
  companySection = new CompanySection()
  talentSection = new TalentSection()
  interviewsSection = new InterviewsSection()

  get postponeExpirationButton() {
    return cy.getByTestId('postpone-expiration-button')
  }

  get restoreExpiredInterviewButton() {
    return cy.getByTestId('RestoreExpiredEngagement-button')
  }

  get restoreRejectedInterviewButton() {
    return cy.getByTestId('RestoreRejectedEngagement-button')
  }

  get restoreCancelledInterviewButton() {
    return cy.getByTestId('RestoreCancelledEngagement-button')
  }

  moreButton() {
    return cy.getByTestId('more-button')
  }

  visit() {
    return cy.visit(`/engagements/123`)
  }

  getPageContent() {
    return cy.getByTestId('EngagementPage-content')
  }

  getSectionByIndex(index: number) {
    return this.getPageContent().find('> div').eq(index)
  }
}

export default Engagement
