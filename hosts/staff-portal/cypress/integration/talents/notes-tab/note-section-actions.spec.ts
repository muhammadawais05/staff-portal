import TalentNotesTab from '~integration/modules/pages/talents/talent-notes-tab'
import { BasicModal } from '~integration/modules/modals'
import { updateTalentNotesSectionStubs } from '~integration/mocks/schema-updates/talents'
import { enabledOperationMock } from '~integration/mocks'

describe('Talent Notes Tab > Notes Section > Note', () => {
  const page = new TalentNotesTab()

  const { notesSection } = page
  const modal = new BasicModal()

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('opens the `Add Activity` modal', () => {
    updateTalentNotesSectionStubs({
      createActivity: enabledOperationMock()
    })

    page.visit()

    notesSection.findAction('Add Activity').click()

    modal.clickButton('Cancel')
  })

  it('opens the `Add Note` form', () => {
    updateTalentNotesSectionStubs({
      createGeneralInformationTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Note').click()

    notesSection.submitNoteButton.click()
  })

  it('opens the `Add Suspicious Activity Note` form', () => {
    updateTalentNotesSectionStubs({
      addTalentSuspiciousActivityReportNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Suspicious Activity Report').click()

    notesSection.submitNoteButton.click()
  })

  it('opens the `Add Feedback Call Note` form', () => {
    updateTalentNotesSectionStubs({
      createFeedbackCallTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Feedback Call Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  it('opens the `Add Online Test Note` form', () => {
    updateTalentNotesSectionStubs({
      createOnlineTestTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Online Test Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  it('opens the `Add Technical One Call Note` form', () => {
    updateTalentNotesSectionStubs({
      createTechnicalOneCallTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Technical One Call Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  it('opens the `Add Technical Two Call Note` form', () => {
    updateTalentNotesSectionStubs({
      createTechnicalTwoCallTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Technical Two Call Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  it('opens the `Add English Call Note` form', () => {
    updateTalentNotesSectionStubs({
      createEnglishCallTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add English Call Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  it('opens the `Add Prescreening Note` form', () => {
    updateTalentNotesSectionStubs({
      createPrescreeningTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Prescreening Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  it('opens the `Add Sourcing Call Note` form', () => {
    updateTalentNotesSectionStubs({
      createSourcingCallTalentNote: enabledOperationMock()
    })

    cy.reload()

    notesSection.findAction('Add Sourcing Call Note').click()

    notesSection.submitNoteButton.scrollIntoView().click()
  })

  describe('when there is no `pristine` condition for usePersistentForm', () => {
    it('keeps the value if the value added within the debounce time is the same as the value removed', () => {
      updateTalentNotesSectionStubs({
        createFeedbackCallTalentNote: enabledOperationMock()
      })

      page.visit()

      notesSection.findAction('Add Feedback Call Note').click()

      notesSection.commentField.type('a', { delay: 500 }).clear().type('a')
      notesSection.commentField.should('have.text', 'a')
    })
  })
})
