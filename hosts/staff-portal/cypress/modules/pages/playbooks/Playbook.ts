import { BasePage } from '~integration/modules/pages'
import { PlaybookTemplatesSection } from './sections'

class Playbook extends BasePage {
  playbookTemplatesSection = new PlaybookTemplatesSection()

  visit(playbookIdentifier: string) {
    cy.visit(`/playbooks/${playbookIdentifier}`)
  }
}

export default Playbook
