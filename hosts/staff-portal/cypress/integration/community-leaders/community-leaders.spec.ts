import { CommunityLeadersPage } from '../../modules/pages'
import {
  updateCommunityLeadersEmptyListMock,
  updateCommunityLeadersListMock,
  updateAppliedCommunityLeaderAccountsMock,
  updateSortFeaturedCommunityLeadersMock
} from '~integration/mocks/schema-updates/community-leaders'

describe('Community Leaders Page', () => {
  describe('when user opens Community Leaders Page', () => {
    const page = new CommunityLeadersPage()

    it('renders empty message, if there are no Community Leaders', () => {
      updateCommunityLeadersEmptyListMock()

      page.visit()

      page.emptyMessage
        .should('exist')
        .should(
          'contain',
          'There are no community leaders for this search criteria'
        )
    })

    it('pauses Community Leader when application has been sent', () => {
      updateAppliedCommunityLeaderAccountsMock()

      page.visit()
      page.pauseCommunityLeaderApplication.click()

      page.modal.self
        .findByTestId('modal-input')
        .click()
        .type('need to clarify requirements')

      page.modal.clickButton('Submit')

      cy.getNotification().should(
        'have.text',
        'Euna Conroy application was successfully holded.'
      )
    })

    it('can search for community leader', () => {
      updateCommunityLeadersListMock()

      page.visit()

      page.content.should('contain', 'Carina Rodriguez')
      page.content.should('contain', 'Matheus Eduardo Mordorst')
      page.content.should('contain', 'Adriana Koch')

      updateCommunityLeadersListMock({ useDefaultCommunityLeaderStub: true })

      page.searchField.type('Cari')

      page.content.should('contain', 'Carina Rodriguez')
      page.content.should('not.contain', 'Matheus Eduardo Mordorst')
      page.content.should('not.contain', 'Adriana Koch')
    })
  })

  describe('when user opens Sort Featured Community Leaders page', () => {
    const page = new CommunityLeadersPage()

    it('removes Featured Community Leader successfully', () => {
      updateSortFeaturedCommunityLeadersMock()

      page.visit('/active/sort')

      page.removesFromFeaturedCommunityLeader.click()

      cy.getNotification().should(
        'have.text',
        'Community Leaders order has been updated!'
      )
    })

    it('fetches community leaders properly', () => {
      updateSortFeaturedCommunityLeadersMock()

      page.visit('/active/sort')

      page.sortFeaturedCommunityLeader
        .first()
        .should('contain', 'Euna Conroy')
        .and('contain', 1)
      page.sortFeaturedCommunityLeader
        .last()
        .should('contain', 'Test Conroy')
        .and('contain', 2)
    })
  })
})
