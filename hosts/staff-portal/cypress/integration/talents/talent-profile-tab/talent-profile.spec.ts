import { updateTalentProfilePageStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

const SECTIONS = [
  'talent-general-section',
  'talent-skills-section',
  'talent-about-section',
  'talent-soft-skills-section',
  'talent-ofac-compliance-section',
  'talent-screening-section',
  'talent-activation-section',
  'talent-specialization-applications-section',
  'talent-online-tests-section',
  'talent-feedback-stats-section',
  'talent-contracts-and-agreements-section',
  'RelatedTasks',
  'scheduled-meetings-section',
  'talent-comments-section',
  'talent-qa-section',
  'talent-commissions-section',
  'talent-screening-specialist-status-section'
]

describe('Talent Profile Tab', () => {
  const page = new TalentProfilePage()

  it('renders the sections in the correct order', () => {
    updateTalentProfilePageStubs()

    page.visit()

    page.content
      .find('> div')
      .should('not.contain.text', 'Loading...')
      .should('have.length', 17)

    page.content.find('> div').each((el, index) => {
      cy.wrap(el).invoke('data', 'testid').should('contain', SECTIONS[index])
    })
  })
})
