import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClientParentLinkStubs } from '~integration/mocks/schema-updates/companies'

describe('Parent Link', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    internalTeamSection: { parentLink }
  } = basicInfoTab

  describe('when Parent link is changed', () => {
    it('shows modal dialog and updates cascadeParentUpdateInfo', () => {
      updateClientParentLinkStubs()

      basicInfoTab.visitTab()

      parentLink.enterEditMode()
      parentLink.input.clear().type('t').click()
      parentLink.autocomplete.click()
      basicInfoTab.modal.clickButton('Update')
    })
  })
})
