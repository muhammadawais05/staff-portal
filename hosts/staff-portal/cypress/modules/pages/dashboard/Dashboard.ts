import BasePage from '../BasePage'
import { DueTasksSection } from './sections'

class Dashboard extends BasePage {
  dueTasksSection = new DueTasksSection()

  get content() {
    return cy.getByTestId('content-body')
  }

  get widgets() {
    return this.content.findByTestId('dashboard-widgets')
  }

  visit() {
    return cy.visit(`/dashboard`)
  }
}

export default Dashboard
