class JobApplicantsSection {
  getSkeletonLoader() {
    return cy.get('[data-testid="job-applicants-loader"]')
  }

  getSection() {
    return cy.getByTestId('job-applicants-section')
  }

  getRows() {
    return cy.getByTestId('job-applicant-row')
  }

  getFirstRow() {
    return cy.getByTestId('job-applicant-row').first()
  }

  getBestMatchField() {
    return this.getFirstRow().findByTestId('best-match-field').first()
  }

  getBestMatchTooltip() {
    return this.getBestMatchField().findByTestId('best-match-tooltip')
  }

  getBestMatchTooltipContent() {
    this.getBestMatchTooltip().trigger('mouseover')

    return cy.getByTestId('best-match-tooltip-content')
  }

  getPublicProfileButton() {
    return this.getFirstRow().findByTestId('public-profile-button')
  }

  openJobApplication() {
    return this.getFirstRow().findByTestId('expand-job-applicant').click()
  }

  openEmailApplicantModal() {
    cy.getByTestId('email-talent-button').click()
  }

  openRejectJobApplicationModal() {
    cy.getByTestId('reject-job-application-button').click()
  }
}

export default JobApplicantsSection
