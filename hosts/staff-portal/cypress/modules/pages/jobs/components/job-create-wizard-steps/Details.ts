export default class DetailsStep {
  get workType() {
    return cy.get('#workType')
  }

  selectWorkType(value: string) {
    this.workType.click()

    cy.get('[role="radiogroup"]').within(() => {
      cy.get(`input[value="${value}"]`).click({ force: true })
    })

    return this
  }

  get jobOrigin() {
    return cy.get('#jobOrigin')
  }

  get timeLengthOnSite() {
    return cy.get('[name=timeLengthOnsite]')
  }

  get semyMonthlyBilling() {
    return cy.get('#semiMonthlyBilling')
  }

  get desiredCommitment() {
    return cy.get('#commitment')
  }

  selectDesiredCommitment(value: string) {
    this.desiredCommitment.click()

    cy.get('[role="listbox"]').within(() => {
      cy.get(`li[value="${value}"]`).click({ force: true })
    })

    return this
  }

  get talentCount() {
    return cy.get('[name=talentCount]')
  }

  get jobTimeZone() {
    return cy.get('#timeZoneName')
  }

  get timezonePreference() {
    return cy.get('#hasPreferredHours')
  }

  get clientWorkingHoursFrom() {
    return cy.get('[name=workingTimeFrom]')
  }

  get clientWorkingHoursTo() {
    return cy.get('[name=workingTimeTo]')
  }

  get hoursOverlap() {
    return cy.get('[name=hoursOverlap]')
  }

  get desiredStartDate() {
    return cy.get('#startDate')
  }

  get estimatedLength() {
    return cy.get('#estimatedLength')
  }
  selectEstimatedLength(value: string) {
    this.estimatedLength.click()

    cy.get('[role="listbox"]').within(() => {
      cy.get(`li[value="${value}"]`).click({ force: true })
    })

    return this
  }

  get estimatedEndDate() {
    return cy.get('#estimatedEndDate')
  }

  get countryRequirements() {
    return cy.get('[name=allowedCountryIds]')
  }

  get spokenLanguages() {
    return cy.get('[name=languageIds]')
  }

  get addJobContacts() {
    return cy.get('[name=companyRepresentativeIds]')
  }

  get nextStepButton() {
    return cy.get('button[type="submit"]')
  }
}
