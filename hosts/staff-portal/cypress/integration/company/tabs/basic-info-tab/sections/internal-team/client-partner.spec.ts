import { BusinessTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClientPartnerMocks } from '~integration/mocks/schema-updates/companies'
import { ClientPartnerUpdateDetailsModal } from '~integration/modules/pages/companies/basic-info-tab/components'

describe('Client Partner', () => {
  const updateClientPartnerModal = new FormModal()
  const clientPartnerUpdateDetailsModal = new ClientPartnerUpdateDetailsModal()

  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { clientPartner }
  } = basicInfoTab

  describe('when selecting a value', () => {
    it('submits successfully opens modal and updates the field', () => {
      updateClientPartnerMocks({
        businessTypeV2: BusinessTypes.ENTERPRISE_BUSINESS
      })

      basicInfoTab.visitTab()

      clientPartner.enterEditMode()
      clientPartner.selectClientPartnerValue(encodeEntityId('3', 'Staff'))

      updateClientPartnerModal.clickButton('Update This Company Only')
      clientPartner.getClientPartner().should('have.text', 'Charles Boyle')

      clientPartnerUpdateDetailsModal.successMessage.should(
        'have.text',
        'Charles Boyle was assigned as the client partner for 1 company.'
      )
      clientPartnerUpdateDetailsModal.clickButton('Close')
    })
  })
})
