import { FormModal } from '.'

class CheckComplianceModal extends FormModal {
  get countryField() {
    return cy
      .getByTestId('check-client-compliance-modal-country')
      .find('input:last')
  }

  get timeZoneField() {
    return cy
      .getByTestId('check-client-compliance-modal-timezone')
      .find('input:last')
  }
}

export default CheckComplianceModal
