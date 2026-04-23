import JobPage from '../JobPage'

class JobInformation extends JobPage {
  get estimatedEndDateField() {
    return this.getField('Estimated End Date')
  }

  get highPriorityField() {
    return this.getField('High Priority')
  }

  get numberOfDesiredHiresField() {
    return this.getField('Desired Hires')
  }

  get matchersQuestionsField() {
    return cy
      .get("div[data-testid*='Matcher']")
      .findByTestId('item-field-value')
  }

  get pendingTalentReasonField() {
    return this.getField('Pending Talent Reason')
  }

  get preSalesEngagementField() {
    return this.getField('Pre-sales Engagement')
  }

  get estimatedWeeklyRevenueField() {
    return this.getField('Estimated Weekly Revenue Talent')
  }

  get estimatedEndDateInput() {
    return this.estimatedEndDateField.find('input')
  }

  get estimatedEndDateEditButton() {
    return this.estimatedEndDateField.findByTestId('edit-button')
  }

  get highPriorityEditButton() {
    return this.highPriorityField.find('button')
  }

  get numberOfDesiredHiresEditButton() {
    return this.numberOfDesiredHiresField.find('button')
  }

  get matchersQuestionsEditButton() {
    return this.matchersQuestionsField.find('button')
  }

  get pendingTalentReasonEditButton() {
    return this.pendingTalentReasonField.find('button')
  }

  get preSalesEngagementEditButton() {
    return this.preSalesEngagementField.find('button')
  }

  get estimatedWeeklyRevenueEditButton() {
    return this.estimatedWeeklyRevenueField.find('button')
  }

  get estimatedWeeklyRevenueInput() {
    return this.estimatedWeeklyRevenueField.find(
      '#estimatedWeeklyRevenueTalent'
    )
  }
}

export default JobInformation
