import TalentPerformanceTab from '~integration/modules/pages/talents/talent-performance-tab'
import { updatePerformanceCoachingActionsStubs } from '~integration/mocks/schema-updates/talents'
import { FormModal } from '~integration/modules/modals'

describe('Talent Performance Tab > Coaching Section actions', () => {
  const page = new TalentPerformanceTab()
  const { coachingSection: section } = page

  const modal = new FormModal()

  it('opens the forms for the coaching actions', () => {
    updatePerformanceCoachingActionsStubs()

    page.visit()

    // Add Note
    section.addNoteButton.click()
    section.addNoteButton.should('be.disabled')
    section.addCoachingNoteButton.should('be.disabled')
    section.cancelNoteCreationButton.click()

    // Add Coaching Note
    section.addCoachingNoteButton.click()
    section.addCoachingNoteButton.should('be.disabled')
    section.addNoteButton.should('be.disabled')
    section.cancelNoteCreationButton.click()

    // Add Task
    section.addTaskButton.click()
    modal.close()
  })
})
