import CompanyProfilePage from '~integration/modules/pages/companies'
import { updatePhoneStubs } from '~integration/mocks/schema-updates/companies/phone-update'

describe('Phone Contact field', () => {
  const { basicInfoTab } = new CompanyProfilePage()
  const {
    accountOverviewSection: { phoneContacts: phone }
  } = basicInfoTab

  beforeEach(() => {
    updatePhoneStubs()
  })

  it('initialization', () => {
    basicInfoTab.visitTab()
  })

  it('allows adding new phones', () => {
    phone.startEdit()

    // TODO: remove in in scope of https://toptal-core.atlassian.net/browse/SPB-2895
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)
    phone.phoneInputs.eq(0).find('input').should('be.focused')
    phone.addItemButton.click()
    phone.phoneInputs.eq(1).find('input').should('be.focused')
    phone.phoneInputs.eq(1).type('1')
    phone.getSetPhoneAsPrimaryButton(1).click()

    phone.addItemButton.click()
    phone.phoneInputs.eq(2).type('2')
    phone.getSetPhoneAsPrimaryButton(2).click()

    phone.addItemButton.click()
    phone.phoneInputs.eq(3).type('3')
    phone.getSetPhoneAsPrimaryButton(3).click()

    phone.cancelButton.click()
  })

  it('allows deleting phones', () => {
    phone.startEdit()

    // TODO: remove in in scope of https://toptal-core.atlassian.net/browse/SPB-2895
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)
    phone.getDeleteItemButton(0).click()

    phone.cancelButton.click()
  })

  it('reflects changes on the section after receiving mutation response', () => {
    phone.startEdit()

    // TODO: remove in in scope of https://toptal-core.atlassian.net/browse/SPB-2895
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100)
    phone.phoneCategories.eq(0).click()
    phone.getMenuItem('Home').click()

    phone.saveButton.click()

    phone.get().contains('phone 1').should('be.visible')
    phone.get().contains('phone 2').should('be.visible')

    phone.getViewer(0).should('not.contain.text', 'Primary')
    phone.getViewer(1).contains('Primary')
  })
})
