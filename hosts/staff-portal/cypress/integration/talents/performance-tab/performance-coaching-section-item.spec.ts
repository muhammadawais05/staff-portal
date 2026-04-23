import { encodeEntityId } from '@staff-portal/data-layer-service'

import TalentPerformanceTab from '~integration/modules/pages/talents/talent-performance-tab'
import { updateCoachingSectionItemStubs } from '~integration/mocks/schema-updates/talents'
import { CoachingSectionItem } from '~integration/modules/pages/talents/talent-performance-tab/components'

describe('Talent Performance Tab > Coaching Section > Item actions', () => {
  const page = new TalentPerformanceTab()
  const coachingItem = new CoachingSectionItem()

  beforeEach(() => {
    updateCoachingSectionItemStubs()
    page.visit()
  })

  it('Changes coaching item status and assignee', () => {
    // change coaching status
    coachingItem.toggleStatusEdit()
    // TODO: remove this after https://toptal-core.atlassian.net/browse/SPB-2789 is finished
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    coachingItem.selectStatus('CONTACTED')

    coachingItem.statusField.should('have.text', 'Contacted')

    // change coaching assignee
    coachingItem.toggleCoachIdEdit()
    // TODO: remove this after https://toptal-core.atlassian.net/browse/SPB-2789 is finished
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    coachingItem.selectCoachId(encodeEntityId('456', 'Staff'))

    coachingItem.coachIdField.should('have.text', 'John Wick')
  })
})
