import { updateNavigateTalentListItemTabsStubs } from '~integration/mocks/schema-updates/talents/talent-list'
import { TalentListPage } from '~integration/modules/pages'
import { TalentListItem } from '~integration/modules/pages/talents/talent-list'

describe('Talent List Item Tabs', () => {
  const page = new TalentListPage()
  const talentListItem = new TalentListItem()

  beforeEach(() => {
    updateNavigateTalentListItemTabsStubs()
  })

  it('opens workload tab', () => {
    page.visit()

    talentListItem.workloadTab.click()
    talentListItem.workloadSection.should('be.visible')
  })

  it('opens stats tab', () => {
    talentListItem.statsTab.click()
    talentListItem.statsSection.should('be.visible')
  })

  it('opens employments tab', () => {
    talentListItem.employmentsTab.click()
    talentListItem.employmentsSection.should('be.visible')
  })

  it('opens work experience tab', () => {
    talentListItem.workExperienceTab.click()
    talentListItem.workExperienceSection.should('be.visible')
  })

  it('opens quality & ratings tab', () => {
    talentListItem.qualityRatingsTab.click()
    talentListItem.qualityRatingsSection.should('be.visible')
  })

  it('opens general tab', () => {
    talentListItem.generalTab.click()
    talentListItem.generalSection.should('be.visible')
  })
})
