import { updateEditInvoiceNoteMocks } from '~integration/mocks/schema-updates/job'
import { JobListPage } from '~integration/modules/pages/jobs'
import { UpdateInvoiceNoteModal } from '~integration/modules/pages/jobs/components'

describe('Job List Page -> Edit Invoice Note', () => {
  const page = new JobListPage()
  const modal = new UpdateInvoiceNoteModal()

  beforeEach(() => {
    updateEditInvoiceNoteMocks()

    page.visit()
  })

  describe('when the Edit Invoice note button is clicked', () => {
    it('submits the modal and displays the success notification message', () => {
      page.firstEditInvoiceButton.click()

      modal.invoiceNoteField.type('c')

      modal.submitButton.contains('Update').click()
      
      cy.getNotification().should(
        'have.text',
        'The invoice note was successfully updated.'
      )
    })
  })
})
