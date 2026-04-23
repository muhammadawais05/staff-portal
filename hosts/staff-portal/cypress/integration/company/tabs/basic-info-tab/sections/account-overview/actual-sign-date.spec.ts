import { updateClientActualSignDate } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Actual Sign Date', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { actualSignDate }
  } = basicInfoTab

  describe('when a date is selected', () => {
    it('submits successfully and updates Actual Sign Date', () => {
      updateClientActualSignDate({
        actualSignDate: '2021-11-17'
      })

      basicInfoTab.visitTab()

      actualSignDate.toggleActualSignDate()
      actualSignDate.selectActualSignDate('2021-11-17')
      actualSignDate
        .getActualSignDate()
        .should('have.text', 'November 17, 2021')
    })
  })

  describe('when date is reset', () => {
    it('submits successfully and resets Actual Sign Date', () => {
      updateClientActualSignDate({
        actualSignDate: null
      })

      basicInfoTab.visitTab()

      actualSignDate.toggleActualSignDate()
      actualSignDate.resetActualSignDate()
      actualSignDate.getActualSignDate().should('have.text', '—')
    })
  })
})
