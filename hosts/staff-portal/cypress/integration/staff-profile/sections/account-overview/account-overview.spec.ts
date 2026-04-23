import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateStaffProfileAccountOverview } from '~integration/mocks/schema-updates/staff-profile'
import { ENTER_KEY } from '~integration/utils'

describe('Account Overview Section', () => {
  const staffProfilePage = new StaffProfilePage()

  beforeEach(() => {
    updateStaffProfileAccountOverview()

    staffProfilePage.visit()
  })

  it('Notes', () => {
    staffProfilePage.billingNotesButton.click()
    staffProfilePage.billingNotesTextArea.type('test')
    staffProfilePage.billingNotesSubmitButton.click()

    staffProfilePage.billingNotesLabel.should('contain.text', 'test')
  })

  it('Employee Type', () => {
    staffProfilePage.paymentsEmployeeTypeButton.click()
    staffProfilePage.paymentsEmployeeTypeSelect
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    staffProfilePage.paymentsEmployeeTypeLabel.should(
      'contain.text',
      'International Contractor'
    )
  })

  it('Pay Frequency', () => {
    staffProfilePage.paymentsFrequencyButton.click()
    staffProfilePage.paymentsFrequencySelect
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })

    staffProfilePage.paymentsFrequencyLabel.should('contain.text', 'Monthly')
  })
})
