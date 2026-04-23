import { EditableField } from '~integration/modules/components'

class ParentLink {
  private editableField = new EditableField()

  enterEditMode() {
    this.editableField.toggleEditMode('parentId')
  }

  get input() {
    return cy.getByTestId('ParentLinkEditor-input')
  }

  get autocomplete() {
    // TODO replace with cy.getByTestId
    // https://toptal-core.atlassian.net/browse/SPB-2837
    return cy.get(`[data-test-id='ParentLinkEditor-menuItem-0']`)
  }
}

export default ParentLink
