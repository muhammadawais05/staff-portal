export default class TalentHistoryAndHealthStatusSection {
  get changeHealthStatusButton() {
    return cy.getByTestId('change-health-status-button')
  }

  get healthStatusHistoryButton() {
    return cy.getByTestId('health-status-show-history-button')
  }

  get currentHealthStatusField() {
    return cy.getByTestId('health-status-field-current-health')
  }

  get historyCommentField() {
    return cy.getByTestId('health-status-history-comment-field')
  }

  get historyStatusField() {
    return cy.getByTestId('health-status-history-status-field')
  }

  get healthStatusHistorySection() {
    return cy.getByTestId('HealthStatusHistory')
  }
}
