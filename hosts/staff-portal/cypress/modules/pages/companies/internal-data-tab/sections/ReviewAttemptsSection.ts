import { BasePage } from '~integration/modules/pages'

class ReviewAttemptsSection extends BasePage {
  expandReviewAttemptsSection() {
    cy.getByTestId('ReviewAttempts')
      .find('[class*="PicassoSection-actions"] > button')
      .click()
  }

  reviewAttemptsList() {
    return cy.getByTestId('ReviewAttemptsContent-reviewAttemptsList')
  }
}

export default ReviewAttemptsSection
