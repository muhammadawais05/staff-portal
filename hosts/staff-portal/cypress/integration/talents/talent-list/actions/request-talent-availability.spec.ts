import { updateRequestTalentAvailabilityStubs } from '~integration/mocks/schema-updates/talents/talent-list'
import { TalentListPage } from '~integration/modules/pages'
import {
  TalentAvailabilityRequestModal,
  TalentListItem
} from '~integration/modules/pages/talents/talent-list'

describe('Request Availability', () => {
  const page = new TalentListPage()
  const talentListItem = new TalentListItem()
  const modal = new TalentAvailabilityRequestModal()

  it('opens the modal and request talent availability', () => {
    updateRequestTalentAvailabilityStubs()

    page.visitWithJob()

    talentListItem.requestAvailabilityButton.click()

    modal.submit()

    cy.getNotification().should(
      'contain',
      'The Availability Request was successfully created.'
    )
  })
})
