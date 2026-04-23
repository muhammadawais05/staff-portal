import { EditableField } from '~integration/modules/components'

class SocialMediaSection {
  editableField = new EditableField()

  editTwitter() {
    this.editableField.toggleEditMode('twitter')
  }

  protected getSocialMediaEditableField(key: string) {
    return cy.getByTestId(`EditableField-viewer-${key}`)
  }

  setTwitter(value: string) {
    return this.editableField.updateInput({
      key: 'twitter',
      value
    })
  }

  getTwitter() {
    return this.getSocialMediaEditableField('twitter')
  }

  editFacebook() {
    this.editableField.toggleEditMode('facebook')
  }

  setFacebook(value: string) {
    return this.editableField.updateInput({
      key: 'facebook',
      value
    })
  }

  getFacebook() {
    return this.getSocialMediaEditableField('facebook')
  }

  editLinkedin() {
    this.editableField.toggleEditMode('linkedin')
  }

  setLinkedin(value: string) {
    return this.editableField.updateInput({
      key: 'linkedin',
      value
    })
  }

  getLinkedin() {
    return this.getSocialMediaEditableField('linkedin')
  }

  editCrunchbase() {
    this.editableField.toggleEditMode('crunchbase')
  }

  setCrunchbase(value: string) {
    return this.editableField.updateInput({
      key: 'crunchbase',
      value
    })
  }

  getCrunchbase() {
    return this.getSocialMediaEditableField('crunchbase')
  }

  editZoominfoProfile() {
    this.editableField.toggleEditMode('zoominfoProfile')
  }

  setZoominfoProfile(value: string) {
    return this.editableField.updateInput({
      key: 'zoominfoProfile',
      value
    })
  }

  getZoominfoProfile() {
    return this.getSocialMediaEditableField('zoominfoProfile')
  }
}

export default SocialMediaSection
