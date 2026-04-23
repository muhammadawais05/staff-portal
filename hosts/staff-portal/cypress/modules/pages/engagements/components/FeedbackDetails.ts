export default class FeedbackDetails {
  getFeedbackDetails() {
    return cy.getByTestId('FeedbackDetails')
  }

  getMarkOutdatedButton() {
    return this.getFeedbackDetails().findByTestId(
      'mark-outdated-feedback-button'
    )
  }

  getReason() {
    return this.getFeedbackDetails().findByTestId('FeedbackDetailsReason-field')
  }

  getOutdatedComment() {
    return this.getFeedbackDetails().findByTestId(
      'FeedbackDetails-outdated-comment'
    )
  }
}
