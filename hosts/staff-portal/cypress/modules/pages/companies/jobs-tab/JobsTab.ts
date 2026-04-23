import { BasePage } from '~integration/modules/pages'
import { UpdateInvoiceNoteModal } from './components'
import { JobsSection } from './sections'

class JobsTabPage extends BasePage {
  jobsSection = new JobsSection()
  updateInvoiceNoteModal = new UpdateInvoiceNoteModal()

  visitTab() {
    cy.visit('/clients/2385680#company_jobs')
  }
}

export default JobsTabPage
