import { TalentListPage } from '../../../modules/pages'
import { updateTalentListPageStubs } from '~integration/mocks/schema-updates/talents/talent-list'

describe('Talent List Page', () => {
  const page = new TalentListPage()

  describe('No talents', () => {
    it('renders empty message', () => {
      updateTalentListPageStubs()

      page.visit()

      page.emptyMessage
        .should('exist')
        .should('contain', 'There are no talents for this search criteria')
    })
  })
})
