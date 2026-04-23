import { updatePlaybookPageStubs } from '~integration/mocks/schema-updates/playbook'
import { Playbook } from '~integration/modules/pages/playbooks'
import { EditPlaybookTemplateModal } from '~integration/modules/pages/playbooks/components'

describe('Playbook page -> Edit Playbook Template', () => {
  const page = new Playbook()
  const editPlaybookTemplateModal = new EditPlaybookTemplateModal()

  it('submits `Edit Playbook Template` modal', () => {
    updatePlaybookPageStubs()

    page.visit('legal')

    page.playbookTemplatesSection.editPlaybookTemplateButton.click()

    editPlaybookTemplateModal.description.type('test description')
    editPlaybookTemplateModal.details.type('test comment')

    editPlaybookTemplateModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Playbook template was successfully updated.'
    )
  })
})
