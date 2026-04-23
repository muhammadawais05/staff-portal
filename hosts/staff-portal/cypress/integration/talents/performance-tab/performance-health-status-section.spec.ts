import { TalentHealthStatusValue } from '@staff-portal/graphql/staff'

import TalentPerformanceTab from '~integration/modules/pages/talents/talent-performance-tab'
import updateHealthStatusStubs from '~integration/mocks/schema-updates/talents/performance-health-status-stubs-update'
import { SetHealthStatusModal } from '~integration/modules/pages/talents/talent-profile-tab/components'
import { getTalentHealthStatusMock } from '~integration/mocks/fragments'

describe('Talent Performance Tab > History & Health Status Section', () => {
  const page = new TalentPerformanceTab()
  const { healthStatusSection: section } = page
  const changeHealthModal = new SetHealthStatusModal()

  it('Change Health Status of talent', () => {
    updateHealthStatusStubs()
    page.visit()
    section.changeHealthStatusButton.click()

    changeHealthModal.healthStatusField.realClick()
    changeHealthModal.selectHealthStatus()
    changeHealthModal.comment.last().type('a')

    updateHealthStatusStubs({
      currentHealthStatus: {
        createdAt: '2022-03-11T02:10:29-05:00',
        healthStatus: TalentHealthStatusValue.NONE
      },
      healthStatusHistory: {
        totalCount: 1,
        nodes: [getTalentHealthStatusMock()]
      }
    })

    changeHealthModal.submitButton.realClick()
    cy.getNotification().should('have.text', 'The health status was set.')
    section.currentHealthStatusField.contains('None')
  })

  it('Show & Hide Health Status History', () => {
    updateHealthStatusStubs({
      currentHealthStatus: {
        createdAt: '2022-03-11T02:10:29-05:00',
        healthStatus: TalentHealthStatusValue.NONE
      },
      healthStatusHistory: {
        totalCount: 1,
        nodes: [getTalentHealthStatusMock()]
      }
    })
    cy.reload()

    section.healthStatusHistoryButton.click()
    section.healthStatusHistorySection.should('be.visible')
    section.historyCommentField.contains('a')
    section.historyStatusField.contains('None')

    // Clicking on Hide History should Hide the Health Change History

    section.healthStatusHistoryButton.click()
    section.healthStatusHistorySection.should('not.exist')
    section.historyStatusField.should('not.exist')
  })
})
