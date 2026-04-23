import { TalentCoachingPage } from '~integration/modules/pages'

describe('Meeting list page', () => {
  const page = new TalentCoachingPage()

  describe('no coaching engagements', () => {
    it('renders empty message', () => {
      cy.updateStaffMocks({
        Query: {
          talentCoachingEngagements: () => ({
            nodes: [],
            totalCount: 0
          })
        }
      })

      page.visit()

      page
        .getEmptyMessage()
        .should('exist')
        .should(
          'contain',
          'There are no talent coaching for this search criteria'
        )
    })
  })
})
