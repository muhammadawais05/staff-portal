/* global cy */
import { BasePage } from '~integration/modules/pages'
import {
  EditTrialLengthModal,
  CandidateIntroDraftsSection,
  CommitmentChangeRequestSection,
  JobAvailabilityRequestsSection,
  HiredTalentSection,
  JobApplicantsSection,
  JobCandidates,
  ContactInformationSection,
  NotesSection
} from './sections'
import SourcingRequestTab from './sourcing-request-tab/SourcingRequestTab'

class JobPage extends BasePage {
  editTrialLengthModal = new EditTrialLengthModal()
  jobAvailabilityRequestsSection = new JobAvailabilityRequestsSection()
  sourcingRequestTab = new SourcingRequestTab()
  candidateIntroDraftsSection = new CandidateIntroDraftsSection()
  commitmentChangeRequestSection = new CommitmentChangeRequestSection()
  jobApplicantsSection = new JobApplicantsSection()
  hiredTalentSection = new HiredTalentSection()
  jobCandidates = new JobCandidates()
  contactInformationSection = new ContactInformationSection()
  notesSection = new NotesSection()

  get opportunityLink() {
    return cy.getByTestId('job-information-opportunity-link')
  }

  get actions() {
    return cy.getByTestId('job-actions')
  }

  moreButton() {
    return cy.getByTestId('more-button').eq(0)
  }

  visit() {
    cy.visit('/jobs/123')
  }

  visitSourcingRequestTab() {
    cy.visit('/jobs/123#sourcing_request')
  }

  getField(fieldName: string) {
    return cy
      .getByTestId(`item-field: ${fieldName}`)
      .findByTestId('item-field-value')
  }

  get approveLink() {
    return cy.getByTestId('approve-link')
  }
}

export default JobPage
