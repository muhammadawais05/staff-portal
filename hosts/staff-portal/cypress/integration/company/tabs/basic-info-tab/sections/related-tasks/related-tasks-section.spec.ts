import { updateClientRelatedTasks } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { BasicModal } from '~integration/modules/modals'

describe('Company Profile -> Basic Info tab -> Related Tasks section', () => {
  const companyProfilePage = new CompanyProfilePage()
  const tasksModal = new BasicModal()

  const {
    basicInfoTab,
    basicInfoTab: { relatedTasksSection }
  } = companyProfilePage

  it('shows and hides completed tasks', () => {
    const { activeTask, completedTask } = updateClientRelatedTasks()

    basicInfoTab.visitTab()

    relatedTasksSection.tableRow.its('length').should('eq', 1)
    relatedTasksSection.tableRow
      .contains(activeTask.description)
      .should('be.visible')

    relatedTasksSection.completedTasksVisibilityButton.click()
    relatedTasksSection.tableRow.its('length').should('eq', 2)
    relatedTasksSection.tableRow
      .contains(activeTask.description)
      .should('be.visible')
    relatedTasksSection.tableRow
      .contains(completedTask.description)
      .should('be.visible')

    relatedTasksSection.completedTasksVisibilityButton.click()
    relatedTasksSection.tableRow.its('length').should('eq', 1)
    relatedTasksSection.tableRow
      .contains(activeTask.description)
      .should('be.visible')
  })

  it('opens "Add New Task" modal', () => {
    relatedTasksSection.addNewTaskButton.click()
    tasksModal.close()
  })

  it('expands row and shows task card once clicked on expand row button', () => {
    updateClientRelatedTasks()
    basicInfoTab.visitTab()

    relatedTasksSection.expandRowButton.click()
    relatedTasksSection.expandedTaskCard.should('be.visible')
  })
})
