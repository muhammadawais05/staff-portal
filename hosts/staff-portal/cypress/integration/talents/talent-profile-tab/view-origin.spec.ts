import { updateViewOriginStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { ApplicationInfoModal } from '~integration/modules/pages/talents/talent-profile-tab/components'

describe('Talent Profile Tab > View origin', () => {
  const page = new TalentProfilePage()
  const applicationInfoModal = new ApplicationInfoModal()

  const { generalSection } = page

  beforeEach(() => {
    updateViewOriginStubs()

    page.visit()
  })

  it('shows the application info modal', () => {
    generalSection.applicationInfoLink.click()

    applicationInfoModal.idField.should('have.text', '123456789')

    applicationInfoModal.closeButton.click()

    applicationInfoModal.self.should('not.exist')
  })
})
