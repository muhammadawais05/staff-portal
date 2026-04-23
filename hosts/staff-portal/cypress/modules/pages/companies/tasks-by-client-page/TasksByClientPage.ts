import BasePage from '../../BasePage'
import { Filters, RoleFlags, JobsList } from '~integration/modules/components'

class TasksByClientPage extends BasePage {
  filters = new Filters()
  roleFlags = new RoleFlags()
  jobList = new JobsList()

  visit() {
    cy.visit('/tasks/companies_list')
  }

  get sections() {
    return cy.getByTestId('tasks-by-clients-section')
  }

  get sectionActions() {
    return cy.getByTestId('tasks-by-clients-section-actions')
  }
}

export default TasksByClientPage
