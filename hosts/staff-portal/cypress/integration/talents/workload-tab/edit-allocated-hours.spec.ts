import { updateEditAllocatedHoursStubs } from '~integration/mocks/schema-updates/talents'
import TalentWorkloadTab from '~integration/modules/pages/talents/workload-tab'

describe('Workload Tab > Edit Allocated Hours button', () => {
  const talentWorkloadTab = new TalentWorkloadTab()

  const { workloadSection } = talentWorkloadTab

  it('edits the Allocated hours field', () => {
    updateEditAllocatedHoursStubs()

    talentWorkloadTab.visit()

    workloadSection.editAllocatedHoursButton.click()

    workloadSection.editAllocatedHoursInput.clear().type('1').blur()

    cy.getNotification().should(
      'contain.text',
      'Allocated hours were successfully changed.'
    )
  })
})
