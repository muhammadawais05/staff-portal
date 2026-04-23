import { encodeEntityId } from '@staff-portal/data-layer-service'

import { updateJobEditStubs } from '~integration/mocks/schema-updates/job'
import { JobEditPage } from '~integration/modules/pages/jobs'

describe('Job Edit page', () => {
  const page = new JobEditPage()
  const { deleteJobModal } = page
  const ID = '123'

  beforeEach(() => {
    updateJobEditStubs({ id: encodeEntityId(ID, 'Job') })
    page.visit(ID)
  })

  it('edits job and redirects to job page on save', () => {
    page.getFormField('title').clear().type('T')

    page.saveButton.click()

    cy.getNotification().should(
      'have.text',
      'The job was successfully updated.'
    )

    cy.url().should('eq', Cypress.config().baseUrl + `/jobs/${ID}`)
  })

  it('shows job delete modal and redirects to jobs list', () => {
    page.deleteJobButton.click()

    deleteJobModal.reasonField.click()
    deleteJobModal.tooltip.contains('Client budget is too small').click()

    deleteJobModal.comment.type('C')

    deleteJobModal.clientHireField.click()
    deleteJobModal.tooltip.contains('No').click()

    deleteJobModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Job was successfully removed.'
    )
    cy.url().should('eq', Cypress.config().baseUrl + `/jobs/${ID}`)
  })

  it('shows the slider when max hourly rate is focused', () => {
    page.maxHourlyRateSlider.container.should('not.be.visible')

    page.maxHourlyRateField.focus()
    page.maxHourlyRateSlider.container.should('be.visible')
    page.maxHourlyRateSlider.container.should('have.text', '$0$500')

    page.noRateLimit.check()
    page.maxHourlyRateSlider.container.should('not.be.visible')

    page.noRateLimit.uncheck()
    page.uncertainOfBudget.check()
    page.uncertainOfBudget.uncheck()
    page.maxHourlyRateSlider.container.should('not.be.visible')

    page.maxHourlyRateField.focus()
    page.maxHourlyRateSlider.container.should('be.visible')

    page.maxHourlyRateField.type('10')
    page.maxHourlyRateField.should('have.value', '10')

    page.maxHourlyRateSlider.move('right', 90)
    page.maxHourlyRateField.should('have.value', '100')
    page.maxHourlyRateSlider.thumb.focus()
    page.maxHourlyRateSlider.tooltip.should('have.text', '$100')

    page.maxHourlyRateSlider.move('right', 42)
    page.maxHourlyRateField.should('have.value', '142')
    page.maxHourlyRateSlider.thumb.focus()
    page.maxHourlyRateSlider.tooltip.should('have.text', '$142')

    page.maxHourlyRateField.focus().blur()
    page.maxHourlyRateSlider.container.should('not.be.visible')
  })

  it('shows talent pool progress bar when max hourly rate is focused', () => {
    page.progressBar.should('not.be.visible')

    page.maxHourlyRateField.focus()
    page.progressBar.should('be.visible')

    page.noRateLimit.check()
    page.progressBar.should('not.be.visible')

    page.noRateLimit.uncheck()
    page.uncertainOfBudget.check()
    page.uncertainOfBudget.uncheck()
    page.progressBar.should('not.be.visible')

    page.maxHourlyRateField.focus()
    page.progressBar.should('be.visible')
  })

  it('displays proper value of talent pool progress bar', () => {
    page.maxHourlyRateField.type('0')
    page.progressBar.should(elem => {
      expect(elem).to.contain('0%')
      expect(elem).to.contain('of talent pool')
    })

    page.maxHourlyRateField.clear()
    page.maxHourlyRateField.type('298')
    page.progressBar.should(elem => {
      // Math.floor(((sum from 0 to 298) / (sum from 0 to 499)) * 100) = 36
      expect(elem).to.contain(`36%`)
      expect(elem).to.contain('of talent pool')
    })

    page.maxHourlyRateField.clear()
    page.maxHourlyRateField.type('500')
    page.progressBar.should(elem => {
      expect(elem).to.contain(`100%`)
      expect(elem).to.contain('of talent pool')
    })
  })

  it('shows bar chart when max hourly rate is focused', () => {
    page.barChart.should('not.be.visible')

    page.maxHourlyRateField.focus()
    page.barChart.should('be.visible')

    page.noRateLimit.check()
    page.barChart.should('not.be.visible')

    page.noRateLimit.uncheck()
    page.uncertainOfBudget.check()
    page.uncertainOfBudget.uncheck()
    page.barChart.should('not.be.visible')

    page.maxHourlyRateField.focus()
    page.barChart.should('be.visible')
  })

  it('displays proper total count of bars of bar chart', () => {
    page.maxHourlyRateField.focus()
    page.barChart.get('.recharts-bar').should('have.length', 100)
  })

  it('displays proper ratio of colored/colorless bars of bar chart', () => {
    // colored bars: palette.blue.main = #204ecf
    // colorless bars: palette.grey.main = #c4c6ca
    page.maxHourlyRateField.clear()
    page.maxHourlyRateField.type('0')
    page.barChart
      .get('.recharts-rectangle[fill="#204ecf"]')
      .should('have.length', 0)
    page.barChart
      .get('.recharts-rectangle[fill="#c4c6ca"]')
      .should('have.length', 100)

    page.maxHourlyRateField.clear()
    page.maxHourlyRateField.type('298')
    // total bars: 100. max value: 500.
    // formula for colored bars: Math.floor(298 * 100 / 500) = 59
    // formula for colorless bars: 100 - 59 = 41
    page.barChart
      .get('.recharts-rectangle[fill="#204ecf"]')
      .should('have.length', 59)
    page.barChart
      .get('.recharts-rectangle[fill="#c4c6ca"]')
      .should('have.length', 41)

    page.maxHourlyRateField.clear()
    page.maxHourlyRateField.type('500')
    page.barChart
      .get('.recharts-rectangle[fill="#204ecf"]')
      .should('have.length', 100)
    page.barChart
      .get('.recharts-rectangle[fill="#c4c6ca"]')
      .should('have.length', 0)
  })
})
