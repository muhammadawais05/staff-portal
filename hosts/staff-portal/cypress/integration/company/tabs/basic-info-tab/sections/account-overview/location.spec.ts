import { Country } from '@staff-portal/graphql/staff'

import CompanyProfilePage from '~integration/modules/pages/companies'
import { updateClientProfileLocationMocks } from '~integration/mocks/schema-updates/companies'

describe('Location field', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { editableCountry, location }
  } = basicInfoTab

  describe('when save button is clicked', () => {
    it('submits successfully and saves the location', () => {
      updateClientProfileLocationMocks({
        country: {
          id: 'VjEtQ291bnRyeS0xNzg',
          name: 'Puerto Rico'
        } as Country,
        city: undefined
      })

      basicInfoTab.visitTab()

      location.editLocation()
      editableCountry.selectCountry('Puerto Rico')
      location.getLocation().parent().submit()
      location.getLocation().should('have.text', 'Puerto Rico')
    })
  })
})
