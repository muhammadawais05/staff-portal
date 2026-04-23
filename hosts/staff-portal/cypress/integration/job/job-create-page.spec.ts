import { encodeEntityId } from '@staff-portal/data-layer-service'

import { createJobStubUpdates } from '~integration/mocks/schema-updates/job'
import { JobCreatePage } from '~integration/modules/pages/jobs'
import { ARROW_DOWN_KEY, ENTER_KEY } from '~integration/utils'

describe('Job Create page', () => {
  const page = new JobCreatePage()
  const COMPANY_ID = '123'
  const JOB_ID = '123'

  beforeEach(() => {
    createJobStubUpdates({ jobId: encodeEntityId(JOB_ID, 'Job') })
    page.visit(COMPANY_ID)
  })

  it('fills job information and creates a new job', () => {
    page.basicInfoStep.jobType.find('label').click()
    page.basicInfoStep.jobTitle.type('T')
    page.basicInfoStep.jobDescription.type('D')
    page.basicInfoStep.nextStepButton.click()

    page.detailsStep.selectWorkType('REMOTE')
    page.detailsStep.selectDesiredCommitment('HOURLY')

    page.detailsStep.desiredStartDate.click()
    cy.get('[title="Next month"]').click()
    cy.getByTestId('day-button-1').first().click()

    page.detailsStep.selectEstimatedLength('LENGTH_1_2_WEEKS')

    page.detailsStep.estimatedEndDate.click()
    cy.get('[title="Next month"]').click()
    cy.getByTestId('day-button-25').click()

    page.detailsStep.nextStepButton.click()

    page.skillsAndIndustriesStep.addSkills.click().type('Typescript')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    page.skillsAndIndustriesStep.addSkills
      .trigger('keydown', { keyCode: ARROW_DOWN_KEY })
      .trigger('keydown', {
        keyCode: ENTER_KEY
      })

    page.skillsAndIndustriesStep.submitButton.click()

    cy.getNotification().should('have.text', 'The job was successfuly created.')

    cy.url().should('eq', Cypress.config().baseUrl + `/jobs/${JOB_ID}`)
  })
})
