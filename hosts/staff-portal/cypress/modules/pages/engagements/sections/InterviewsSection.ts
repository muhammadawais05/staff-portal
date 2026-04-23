import { EditableField } from '~integration/modules/components'

class InterviewsSection {
  editableField = new EditableField()

  getSection() {
    return cy.getByTestId('engagement-interviews-section')
  }

  getRows() {
    return this.getSection().findByTestId('EngagementInterview-interview-item')
  }

  getFirstExpandButton() {
    return this.getRows()
      .findByTestId('EngagementInterview-expand-button')
      .first()
  }

  getFirstInterviewStatus() {
    return this.getSection().findByTestId('InterviewStatus').first()
  }

  getFirstInterviewType() {
    return this.getSection()
      .findByTestId('EngagementInterview-interview-type')
      .first()
      .findByTestId('InterviewContentItem-value')
  }

  getFirstRateForClientButton() {
    return this.getSection()
      .findByTestId('rate-for-client-interview-button')
      .first()
  }
}

export default InterviewsSection
