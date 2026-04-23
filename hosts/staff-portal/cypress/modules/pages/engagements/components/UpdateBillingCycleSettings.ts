import { FormModal } from '~integration/modules/modals'

class UpdateBillingCycleSettings extends FormModal {
  getBillCycleField() {
    return this.modal.findByTestId('billCycle-field').find('input')
  }
}

export default UpdateBillingCycleSettings
