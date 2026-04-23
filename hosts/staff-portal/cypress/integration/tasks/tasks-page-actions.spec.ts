import { Staff } from '@staff-portal/graphql/staff'

import { updateTasksPageActionsStubs } from '~integration/mocks/schema-updates/tasks'
import { TasksPage } from '~integration/modules/pages/tasks'
import { AddNewTaskModal } from '~integration/modules/pages/tasks/components'
import { daysFromNow, ENTER_KEY } from '~integration/utils'

describe('Tasks Page', () => {
  const page = new TasksPage()
  const addNewTaskModal = new AddNewTaskModal()

  describe('Actions', () => {
    describe('Add Task', () => {
      it('opens modal and submits the form', () => {
        updateTasksPageActionsStubs()

        page.visit()

        page.helpButton.click()

        page.createTaskButton.click()

        addNewTaskModal.descriptionField.type('D')
        addNewTaskModal.dueDateField
          .click()
          .type(daysFromNow(7))
          .trigger('keydown', { keyCode: ENTER_KEY })
          .blur()

        addNewTaskModal.submitButton.click()
      })
    })
  })

  describe('List', () => {
    describe('Finish Task', () => {
      it('changes task status to `finished`', () => {
        cy.clock()

        updateTasksPageActionsStubs({
          task: { status: 'pending' },
          playbookTemplate: { finishDisabled: false }
        })

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemCompleteTaskCheckbox.click()
        page.taskListSection.firstItemCompleteTaskCheckbox.should('be.checked')
        cy.tick(300)
      })
    })

    describe('Restart Task', () => {
      it('changes task status to `pending`', () => {
        updateTasksPageActionsStubs({
          task: {
            status: 'finished',
            completer: {
              id: 'VjEtU3RhZmYtODYyNjAx',
              __typename: 'Staff'
            } as unknown as Staff
          },
          playbookTemplate: { finishDisabled: true }
        })

        page.visit()

        page.helpButton.click()

        page.taskListSection.firstItemCompleteTaskCheckbox.click()
        page.taskListSection.firstItemCompleteTaskCheckbox.should(
          'not.be.checked'
        )
      })
    })
  })
})
