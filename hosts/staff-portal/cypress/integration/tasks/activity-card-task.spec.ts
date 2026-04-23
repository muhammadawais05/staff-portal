import { updateActivityCardTaskStubs } from '~integration/mocks/schema-updates/tasks'
import { BasicModal } from '~integration/modules/modals'
import { TasksPage } from '~integration/modules/pages/tasks'

describe('Tasks Page -> Activity Card Task -> Actions', () => {
  const page = new TasksPage()
  const basicModal = new BasicModal()

  describe('Activity Card Task', () => {
    describe('Edit Activity', () => {
      it('opens Edit Activity modal', () => {
        updateActivityCardTaskStubs()
        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemExpandableButton.click()

        page.activityTaskCard.sidebarMenu.contains('Activity').click()
        page.activityTaskCard.editActivityButton.click()
        basicModal.close()
      })
    })
  })
})
