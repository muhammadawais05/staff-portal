import { FormModal } from '../../../modals'

class AddContactModal extends FormModal {
  setJobContactsSelectValue(value: string) {
    this.setDropdown('representativeId', value)
  }
}

export default AddContactModal
