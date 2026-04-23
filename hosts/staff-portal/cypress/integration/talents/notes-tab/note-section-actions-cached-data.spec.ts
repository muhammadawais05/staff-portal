import TalentNotesTab from '~integration/modules/pages/talents/talent-notes-tab'
import TalentWorkloadTab from '~integration/modules/pages/talents/workload-tab'
import {
  updateTalentNotesSectionStubs,
  updateEditAllocatedHoursStubs
} from '~integration/mocks/schema-updates/talents'
import { enabledOperationMock } from '~integration/mocks'
import { DEBOUNCED_AUTOCOMPLETE } from '~integration/utils'

describe('Talent Notes Tab > Notes Section > Note', () => {
  const notesTab = new TalentNotesTab()
  const workloadTab = new TalentWorkloadTab()

  const { notesSection } = notesTab

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it(`opens the 'Add Technical One Call Note' form,
    fills in required data, switches to the other tab,
    goes back to the notes tab & submits a form`, () => {
    cy.clock()

    updateTalentNotesSectionStubs({
      createTechnicalOneCallTalentNote: enabledOperationMock()
    })

    notesTab.visit()

    notesSection.findAction('Add Technical One Call Note').click()

    notesSection.secondAnswerField.type('a')

    notesSection.commentField.type('c')

    // wait for note data to be saved in local storage
    cy.tick(DEBOUNCED_AUTOCOMPLETE)

    updateEditAllocatedHoursStubs()

    workloadTab.visit()

    updateTalentNotesSectionStubs({
      createTechnicalOneCallTalentNote: enabledOperationMock()
    })

    notesTab.visit()

    notesSection.submitNoteButton.scrollIntoView().click()

    cy.getNotification().should('contain', 'Note has been added.')
  })
})
