import { DetailedListItem } from '~integration/modules/components'
import { BasicModal } from '~integration/modules/modals'

class ApplicationInfoModal extends BasicModal {
  item = new DetailedListItem()

  get idField() {
    return this.item.getItemValue('Id')
  }

  get closeButton() {
    return this.self.findByTestId('application-info-modal-close-button')
  }
}

export default ApplicationInfoModal
