import { ContactType } from '@staff-portal/graphql/staff'

import { contactMock } from '~integration/mocks'
import { updateCompanyCardTaskStubs } from '~integration/mocks/schema-updates/tasks'
import { BasicModal } from '~integration/modules/modals'
import { TasksPage } from '~integration/modules/pages/tasks'

describe('Tasks Page -> Company Card Task -> Actions', () => {
  const page = new TasksPage()
  const basicModal = new BasicModal()

  describe('Company Card Task', () => {
    describe('Timeline', () => {
      it('opens Timeline modal', () => {
        updateCompanyCardTaskStubs()
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.timelineButton.click()
        basicModal.close()
      })
    })

    describe('Add Activity', () => {
      it('opens Add Activity modal', () => {
        updateCompanyCardTaskStubs()
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.addActivityButton.click()
        basicModal.close()
      })
    })

    describe('Show Email', () => {
      it('opens Send Email modal', () => {
        updateCompanyCardTaskStubs()
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.sendEmailButton.click()
        basicModal.close()
      })
    })

    describe('Contact', () => {
      it('opens Contact Client modal', () => {
        updateCompanyCardTaskStubs({ companyContacts: [contactMock()] })

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.contactButton.click()
        basicModal.close()
      })
    })

    describe('Application Info', () => {
      it('opens Application Info modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.applicationInfoLink.click()
        basicModal.close()
      })
    })

    describe('Phone', () => {
      it('starts call', () => {
        updateCompanyCardTaskStubs({ companyContacts: [contactMock()] })

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.phoneButton.click()
        cy.url().should('be.equal', Cypress.config().baseUrl + '/tasks#911')
      })
    })

    describe('Skype', () => {
      it('starts call', () => {
        updateCompanyCardTaskStubs({
          companyContacts: [contactMock({ type: ContactType.SKYPE })]
        })

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.skypeButton.should(
          'have.attr',
          'href',
          'skype:+48784945133'
        )
      })
    })

    describe('More Dropdown -> Resume Company', () => {
      it('opens Resume Company modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Resume Company').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Pause Company', () => {
      it('opens Pause Company modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Pause Company').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Repause Company', () => {
      it('opens Repause Company modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Repause Company').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Mark as Bad Lead', () => {
      it('opens Mark as Bad Lead modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Mark as Bad Lead').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Invite to Login', () => {
      it('opens Invite to Login modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Invite to Login').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Black Flag', () => {
      it('opens Black Flag modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Black Flag').click()
        basicModal.clickButton('Cancel')
      })
    })

    describe('More Dropdown -> Delete Application', () => {
      it('opens Delete Application modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Delete Application').click()
        basicModal.close()
      })
    })

    describe('More Dropdown -> Q&A', () => {
      it('opens Question and Answers modal', () => {
        updateCompanyCardTaskStubs()

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.companyTaskCard.moreButton.click()
        page.companyTaskCard.moreDropdown.contains('Q&A').click()
        basicModal.close()
      })
    })
  })
})
