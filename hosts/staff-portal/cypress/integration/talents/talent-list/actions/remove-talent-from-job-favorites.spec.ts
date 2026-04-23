import { updateRemoveTalentFromJobFavoritesStubs } from '~integration/mocks/schema-updates/talents/talent-list'
import { TalentListPage } from '~integration/modules/pages'
import { TalentListItem } from '~integration/modules/pages/talents/talent-list'

describe('Remove Job Favorites', () => {
  const page = new TalentListPage()
  const talentListItem = new TalentListItem()

  it('removes the talent from job favorites', () => {
    updateRemoveTalentFromJobFavoritesStubs()

    page.visitWithJob()

    talentListItem.removeFromFavoritesButton.click()

    page.jobFavoritesWidget.container.should('not.exist')
  })
})
