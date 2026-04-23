import { daysFromNow, ENTER_KEY } from '~integration/utils'
import { updateDetailsCardTaskStubs } from '~integration/mocks/schema-updates/tasks'
import { TasksPage } from '~integration/modules/pages/tasks'
import { FormModal } from '~integration/modules/modals'

describe('Tasks Page -> Details Card Task -> Actions', () => {
  const formModal = new FormModal()
  const page = new TasksPage()

  describe('Schedule Next Check', () => {
    it('opens & submits Schedule Next Check modal', () => {
      updateDetailsCardTaskStubs()
      page.visit()

      page.helpButton.click()

      page.taskListSection.firstItemExpandableButton.click()

      page.detailsTaskCard.scheduleTaskNextCheckButton.click()
      page.scheduleNextCheckModal.setDropdown('action', 'Schedule the call')
      page.scheduleNextCheckModal.actionDate
        .find('input')
        .clear()
        .type(daysFromNow(7))
        .trigger('keydown', { keyCode: ENTER_KEY })
      page.scheduleNextCheckModal.submitButton.click()
    })
  })

  describe('Dispute Task', () => {
    it('opens & submits Dispute Task modal', () => {
      updateDetailsCardTaskStubs()
      page.visit()

      page.helpButton.click()

      page.taskListSection.firstItemExpandableButton.click()

      page.detailsTaskCard.disputeTaskButton.click()
      formModal.setTextArea('comment', 'comment')
      formModal.submit()
    })
  })

  describe('Delete Task', () => {
    it('opens & submits Delete Task modal', () => {
      updateDetailsCardTaskStubs()
      page.visit()

      page.helpButton.click()

      page.taskListSection.firstItemExpandableButton.click()

      page.detailsTaskCard.cancelTaskButton.click()
      page.detailsTaskCard.cancelTaskSubmitButton.click()
    })
  })

  describe('Cancel Dispute', () => {
    it('opens & submits Cancel Dispute modal', () => {
      updateDetailsCardTaskStubs()
      page.visit()

      page.helpButton.click()

      page.taskListSection.firstItemExpandableButton.click()

      page.detailsTaskCard.cancelDisputeButton.click()
      formModal.setTextArea('value', 'comment')
      formModal.submit()
    })
  })

  describe('Add Task Comment', () => {
    it('submits task comment', () => {
      updateDetailsCardTaskStubs()
      page.visit()

      page.helpButton.click()

      page.taskListSection.firstItemExpandableButton.click()

      page.detailsTaskCard.taskCommentInput.type('comment')
      page.detailsTaskCard.taskCommentSubmitButton.click()
    })
  })
})
