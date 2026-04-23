/* global cy */
import { BasePage } from '~integration/modules/pages'
import {
  ActivityTaskCard,
  CompanyTaskCard,
  DetailsTaskCard,
  JobTaskCard,
  ScheduleNextCheckModal
} from './components'
import { TaskListSection } from './sections'

class TasksPage extends BasePage {
  taskListSection = new TaskListSection()
  activityTaskCard = new ActivityTaskCard()
  companyTaskCard = new CompanyTaskCard()
  detailsTaskCard = new DetailsTaskCard()
  jobTaskCard = new JobTaskCard()
  scheduleNextCheckModal = new ScheduleNextCheckModal()

  get createTaskButton() {
    return cy.getByTestId('add-new-task-button')
  }

  get helpButton() {
    return cy.getByTestId('help-button')
  }

  visit() {
    cy.visit('/tasks')
  }
}

export default TasksPage
