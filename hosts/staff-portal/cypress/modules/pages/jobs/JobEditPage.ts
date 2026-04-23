/* global cy */
import { DeleteJobModal } from '~integration/modules/pages/jobs/components'
import { BasePage } from '~integration/modules/pages'
import Slider from '~integration/modules/components/Slider'

class JobEditPage extends BasePage {
  deleteJobModal = new DeleteJobModal()
  maxHourlyRateSlider = new Slider('[data-testid="job-max-hourly-rate-slider"]')

  get progressBar() {
    return cy.getByTestId(`TalentPoolProgressBar`)
  }

  get barChart() {
    return cy.getByTestId(`JobMaxHourlyRateChart`)
  }

  get deleteJobButton() {
    return cy.getByTestId('job-edit-actions-delete-job-button')
  }

  get saveButton() {
    return cy.getByTestId('job-edit-form-save-button')
  }

  visit(jobId = '123') {
    cy.visit(`/jobs/${jobId}/edit`)
  }

  get editForm() {
    return cy.get('form')
  }

  getFormField(name: string) {
    return this.editForm.find(`[name=${name}]`)
  }

  get maxHourlyRateField() {
    return this.editForm.find('#maxHourlyRate')
  }

  get noRateLimit() {
    return this.editForm.find('#noRateLimit')
  }

  get uncertainOfBudget() {
    return this.editForm.find('#uncertainOfBudget')
  }
}

export default JobEditPage
