import { DetailedListItem } from '~integration/modules/components'

const fieldLabel = 'Availability'

class AvailabilityField extends DetailedListItem {
  get field() {
    return this.getItem(fieldLabel)
  }

  get subscriptionInactiveButton() {
    return this.field.findByTestId('bell-icon:inactive')
  }

  get subscriptionActiveButton() {
    return this.field.findByTestId('bell-icon:active')
  }
}

export default AvailabilityField
