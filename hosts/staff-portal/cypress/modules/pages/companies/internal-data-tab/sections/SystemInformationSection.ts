import { BasePage } from '~integration/modules/pages'
import { EditableField } from '~integration/modules/components'

class SystemInformationSection extends BasePage {
  editableField = new EditableField()

  mostInterestedIn() {
    return this.editableField.get('interestedInId')
  }

  editMostInterestedIn() {
    cy.getByTestId('EditableField-toggle-button-interestedInId').click()
  }

  selectMostInterestedIn(value: string) {
    this.editableField.selectDropdownValue({
      key: 'interestedInId',
      value
    })
  }

  heardUsFrom() {
    return this.editableField.get('howDidYouHear')
  }

  editHeardUsFrom() {
    cy.getByTestId('EditableField-toggle-button-howDidYouHear').click()
  }

  selectHeardUsFrom(value: string) {
    this.editableField.selectDropdownValue({
      key: 'howDidYouHear',
      value
    })
  }

  reviewLink() {
    return this.editableField.get('reviewLink')
  }

  reviewLinkFormError() {
    return cy.getFieldError('EditableField-reviewLink-editor')
  }

  editReviewLink() {
    cy.getByTestId('EditableField-toggle-button-reviewLink').click()
  }

  updateReviewLink(reviewLink: string) {
    this.reviewLink().clear().type(`${reviewLink}{enter}`)
  }

  editHowDidYouHearDetails() {
    cy.getByTestId('EditableField-toggle-button-howDidYouHearDetails').click()
  }

  updateHowDidYouHearDetails(reviewLink: string) {
    this.howDidYouHearDetails().clear().type(`${reviewLink}{enter}`)
  }

  howDidYouHearDetails() {
    return this.editableField.get('howDidYouHearDetails')
  }
}

export default SystemInformationSection
