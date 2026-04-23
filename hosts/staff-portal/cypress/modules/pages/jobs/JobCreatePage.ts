import { BasePage } from '~integration/modules/pages'
import {
  BasicInfoStep,
  DetailsStep,
  SkillsAndIndustriesStep
} from './components'

class JobCreatePage extends BasePage {
  basicInfoStep = new BasicInfoStep()
  detailsStep = new DetailsStep()
  skillsAndIndustriesStep = new SkillsAndIndustriesStep()

  visit(companyId = '123') {
    cy.visit(`/jobs/new?company_id=${companyId}`)
  }
}
export default JobCreatePage
