import { timeZoneMock } from '~integration/mocks/fragments/time-zone-mock'
import { updateClientTimeZoneMocks } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Update Time zone', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { timeZone }
  } = basicInfoTab

  describe('when a value is selected', () => {
    it('submits successfully and saves Time zone', () => {
      // eslint-disable-next-line @miovision/disallow-date/no-static-date
      cy.clock(Date.UTC(2020, 6, 24, 0), ['Date'])
      updateClientTimeZoneMocks({
        timeZone: timeZoneMock({
          name: '(UTC+02:00) Europe - Berlin',
          value: 'Europe/Berlin'
        })
      })

      basicInfoTab.visitTab()

      timeZone.toggleTimeZone()
      timeZone.selectTimeZone('Europe/Berlin')
      timeZone
        .getTimeZone()
        .should('have.text', '(UTC+02:00) Europe - Berlin, now 2:00 AM')
    })
  })
})
