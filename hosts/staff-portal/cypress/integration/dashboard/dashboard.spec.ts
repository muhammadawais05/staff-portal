import { updateDashboardPageStubs } from '~integration/mocks/schema-updates/dashboard'
import { Dashboard } from '~integration/modules/pages/dashboard'
import { AddNewTaskModal } from '~integration/modules/pages/tasks/components'

const SECTIONS = [
  'dashboard-billing-stats-widget',
  'dashboard-billing-overview',
  'company-verification-rate-chart',
  'due-tasks',
  'referring-steps',
  'dashboard-widgets'
]

const WIDGETS = ['claim-steps', 'recent-activity', 'commission-widget-content']

describe('Dashboard page', () => {
  const page = new Dashboard()
  const addNewTaskModal = new AddNewTaskModal()
  const { dueTasksSection } = page

  beforeEach(() => {
    updateDashboardPageStubs()
  })

  it('renders the sections in the correct order', () => {
    page.visit()

    // wait to load billing section
    page.content.findByTestId('dashboard-billing-stats-widget').should('exist')

    page.content.find('> div').each((el, index) => {
      cy.wrap(el).invoke('data', 'testid').should('contain', SECTIONS[index])
    })

    page.widgets.find('> div > div').each((el, index) => {
      cy.wrap(el).invoke('data', 'testid').should('contain', WIDGETS[index])
    })
  })

  it('opens the add new task modal and submits the form', () => {
    dueTasksSection.addNewTaskButton.click()

    addNewTaskModal.descriptionField.type('D')

    addNewTaskModal.submitButton.click()

    cy.getNotification().should('contain', 'Success! The task was created.')
  })
})
