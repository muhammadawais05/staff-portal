import { BusinessTypes } from '@staff-portal/graphql/staff'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateRequestTransferMocks } from '~integration/mocks/schema-updates/companies'

describe('RequestTransfer', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { requestTransfer }
  } = basicInfoTab

  describe('when staff is the same as current user', () => {
    it('successfully submits request transfer modal', () => {
      updateRequestTransferMocks({
        businessTypeV2: BusinessTypes.SMALL_BUSINESS
      })

      basicInfoTab.visitTab()

      requestTransfer.getTransferButton().click()
      requestTransfer.selectStaff('Gina Linetti (Staff)')
      requestTransfer.comment.type('Some test comment.')
      requestTransfer.submitButton.click()
      cy.getNotification().should(
        'contain',
        'Your request for transfer on this lead was successfully submitted.'
      )
    })
  })
})
