import { encodeEntityId } from '@staff-portal/data-layer-service'

import TalentNotesTab from '~integration/modules/pages/talents/talent-notes-tab'
import { updateTalentNotesSectionActivitiesStubs } from '~integration/mocks/schema-updates/talents'
import { enabledOperationMock } from '~integration/mocks'
import talentActivitiesAndNotesMock from '~integration/mocks/talent-activities-and-notes-mock'
import { ARROW_DOWN_KEY, ENTER_KEY } from '~integration/utils'

describe('Talent Notes Tab > Notes Section > Activity', () => {
  const page = new TalentNotesTab()

  const { notesSection } = page

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('creates a New activity', () => {
    updateTalentNotesSectionActivitiesStubs({
      operations: {
        createActivity: enabledOperationMock()
      }
    })

    page.visit()

    notesSection.findAction('Add Activity').click()

    notesSection.activityModal.subtypeSelect
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    notesSection.activityModal.durationField.type('1')
    notesSection.activityModal.outcomeSelect
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    notesSection.activityModal.clickButton('Add Activity')

    cy.getNotification().should('contain', 'Activity was added successfully.')
  })

  it('edits the activity', () => {
    updateTalentNotesSectionActivitiesStubs({
      activitiesAndNotes: talentActivitiesAndNotesMock(),
      lazyOperationNode: {
        id: encodeEntityId('221', 'Activity'),
        operations: {
          updateActivity: enabledOperationMock()
        },
        __typename: 'Activity'
      }
    })

    page.visit()

    notesSection.editActivityButton.click()

    notesSection.activityModal.subtypeSelect
      .click()
      .trigger('keydown', { keyCode: ARROW_DOWN_KEY })
      .trigger('keydown', { keyCode: ENTER_KEY })
    notesSection.activityModal.durationField.clear().type('1')
    notesSection.activityModal.outcomeSelect
      .click()
      .trigger('keydown', { keyCode: ARROW_DOWN_KEY })
      .trigger('keydown', { keyCode: ENTER_KEY })

    notesSection.activityModal.clickButton('Edit Activity')

    cy.getNotification().should('contain', 'Activity was edited successfully.')
  })

  it('remove the activity', () => {
    updateTalentNotesSectionActivitiesStubs({
      activitiesAndNotes: talentActivitiesAndNotesMock(),
      lazyOperationNode: {
        id: encodeEntityId('221', 'Activity'),
        operations: {
          removeActivity: enabledOperationMock()
        },
        __typename: 'Activity'
      }
    })

    page.visit()

    notesSection.deleteActivityButton.click()
    notesSection.removeActivityPromptModal.clickButton('Delete Activity')

    cy.getNotification().should('contain', 'Activity has been deleted')
  })
})
