import { updateAddTalentToJobFavoritesStubs } from '~integration/mocks/schema-updates/talents/talent-list'
import { TalentListPage } from '~integration/modules/pages'
import { TalentListItem } from '~integration/modules/pages/talents/talent-list'

describe('Add Job Favorites', () => {
  const page = new TalentListPage()
  const talentListItem = new TalentListItem()

  it('adds the talent to job favorites', () => {
    updateAddTalentToJobFavoritesStubs()

    page.visitWithJob()

    talentListItem.addToFavoritesButton.click()

    page.jobFavoritesWidget.container.should('be.visible')
  })
})
