import { DetailedListItem } from '~integration/modules/components'

const STATUS = 'Reapplication date'

class ReapplicationDateField extends DetailedListItem {
  get editButton() {
    return this.value.findByTestId('edit-button')
  }

  get nextDate() {
    return cy.getByTestId('day-button-27')
  }

  get value() {
    return this.getItemValue(STATUS)
  }
}

export default ReapplicationDateField
