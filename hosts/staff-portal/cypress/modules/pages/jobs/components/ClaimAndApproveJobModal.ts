class ClaimAndApproveJobModal {
  protected get modal() {
    return cy.getByTestId('approve-job-modal')
  }

  get submitButton() {
    return this.modal.find('button[type="submit"]')
  }

  get claimer() {
    return this.modal.findByTestId('approve-job-step-claimer')
  }

  get comment() {
    return this.modal.findByTestId('approve-job-step-comment')
  }

  get maxHourlyRate() {
    return this.modal.findByTestId('approve-job-step-max-hourly-rate')
  }

  get firstSkillRequireButton() {
    return cy.getByTestId('require-skill').eq(0)
  }

  get mainSkillSelect() {
    return this.modal.findByTestId('main-skill-select')
  }
}

export default ClaimAndApproveJobModal
