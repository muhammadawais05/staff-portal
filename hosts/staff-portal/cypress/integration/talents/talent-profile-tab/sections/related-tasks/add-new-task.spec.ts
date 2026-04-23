import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { BasicModal } from '~integration/modules/modals'

describe('Talent Profile Tab > Related Tasks Section > Add New Task button', () => {
  const page = new TalentProfilePage()
  const addNewTaskModal = new BasicModal()

  it('opens the modal', () => {
    cy.stubGraphQLRequests({
      ...talentProfileStubs()
    })

    page.visit()

    page.relatedTasksSection.addNewTask.click()

    addNewTaskModal.clickButton('Cancel')
  })
})
