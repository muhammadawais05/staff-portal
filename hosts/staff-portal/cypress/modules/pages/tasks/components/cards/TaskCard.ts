import { BasePage } from '~integration/modules/pages'

class TaskCard extends BasePage {
  get() {
    return cy.getByTestId('task-cards-container')
  }

  get moreButton() {
    return this.get()
      .findByTestId('task-card-layout-more-button')
      .find('button')
  }

  get moreDropdown() {
    return cy.getByTestId('task-card-layout-more-dropdown')
  }

  get sidebarMenu() {
    return cy.getByTestId('task-card-sidebar-menu')
  }
}

export default TaskCard
