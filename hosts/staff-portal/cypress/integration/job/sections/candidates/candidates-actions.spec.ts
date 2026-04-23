import { JobPage } from '~integration/modules/pages/jobs'
import {
  updateCandidateActionStubs,
  updateCandidateEmailActionsStubs
} from '~integration/mocks/schema-updates/job'
import { FormModal } from '~integration/modules/modals'

describe('Candidates Section', () => {
  describe('Actions', () => {
    beforeEach(() => {
      updateCandidateActionStubs()
      page.visit()
      jobCandidates.firstCandidateCardMoreButton.click()
    })

    const page = new JobPage()
    const cancelInterviewModal = new FormModal()
    const scheduleInterviewModal = new FormModal()
    const { jobCandidates } = page

    describe('Accept Candidate', () => {
      it('opens Accept Developer and Schedule Start Date modal', () => {
        page.moreDropdown.contains('Accept Candidate').click()
        cy.getByTestId('day-button-15').click()
        page.modal.clickButton('Schedule Job Start')

        cy.getNotification().should(
          'have.text',
          'The Job was successfully started.'
        )
      })
    })

    describe('Change Commitment', () => {
      it('opens Change Commitment modal', () => {
        page.moreDropdown.contains('Change Commitment').click()
        page.modal.clickButton('Change Commitment')

        cy.getNotification().should(
          'have.text',
          'The Commitment was successfully changed.'
        )
      })
    })

    describe('Cancel Interview', () => {
      it('opens Cancel Interview modal', () => {
        page.moreDropdown.contains('Cancel Interview').click()
        cancelInterviewModal.setDropdown('reasonId', 'Client')
        cancelInterviewModal.setTextArea('comment', 'comment')
        page.modal.clickButton('Cancel')
        cy.get('#comment').should('not.exist')
      })
    })

    describe('Reject Candidate', () => {
      it('opens Reject Candidate modal', () => {
        page.moreDropdown.contains('Reject Candidate').click()
        cancelInterviewModal.setDropdown('reasonId', 'Client')
        cancelInterviewModal.setTextArea('comment', 'comment')
        page.modal.clickButton('Cancel')
        cy.get('#comment').should('not.exist')
      })
    })

    describe('Schedule Interview', () => {
      it('opens Schedule Top Scheduler Interview modal', () => {
        page.moreDropdown.contains('Schedule Interview').click()
        scheduleInterviewModal.setDropdown('date', '2021-11-30')
        cy.get('#time').click()
        cy.get('li').contains('04:30').click()
        scheduleInterviewModal.setDropdown('communication', 'Phone')
        cy.getByTestId('FormInterviewContactsSelect').click()
        cy.get('li').contains('Moore').click()

        page.modal.clickButton('Schedule Interview')

        cy.getNotification().should(
          'have.text',
          'The Interview was successfully scheduled.'
        )
      })
    })
  })

  describe('Email Actions', () => {
    const page = new JobPage()
    const newEmailModal = new FormModal()
    const { jobCandidates } = page

    describe('Email Company', () => {
      it('opens New Email modal', () => {
        updateCandidateEmailActionsStubs('Client')
        page.visit()
        jobCandidates.firstCandidateCardMoreButton.click()
        page.moreDropdown.contains('Email Company').click()
        newEmailModal.setDropdown('template', 'Template 2')
        page.modal.clickButton('Send Email')

        cy.getNotification().should(
          'have.text',
          'The email was successfully sent.'
        )
      })
    })

    describe('Email Talent', () => {
      it('opens New Email modal', () => {
        updateCandidateEmailActionsStubs('Talent')
        page.visit()
        jobCandidates.firstCandidateCardMoreButton.click()
        page.moreDropdown.contains('Email Talent').click()
        newEmailModal.setDropdown('template', 'Template 1')
        page.modal.clickButton('Send Email')

        cy.getNotification().should(
          'have.text',
          'The email was successfully sent.'
        )
      })
    })
  })
})
