import { EditableField } from '~integration/modules/components'

class Location {
  editableField = new EditableField()

  getLocation() {
    return cy.getByTestId('EditableField-location')
  }

  editLocation() {
    this.editableField.toggleEditMode('location')
  }
}

export default Location
