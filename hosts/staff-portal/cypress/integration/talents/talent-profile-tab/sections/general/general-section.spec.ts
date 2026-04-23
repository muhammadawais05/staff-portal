import {
  ReferralPartner,
  Staff,
  TalentApplicantSkillConnection
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { updateTalentGeneralSectionStubs } from '~integration/mocks/schema-updates/talents'
import { DEBOUNCED_AUTOCOMPLETE, ENTER_KEY } from '~integration/utils'

describe('Talent Profile Tab > Talent General Section', () => {
  const page = new TalentProfilePage()
  const { generalSection } = page
  const { changeReferrerModal, changeSourcerModal, applicantSkillsField } =
    generalSection

  describe('Change Referrer button', () => {
    it('opens & submits the change referrer modal', () => {
      updateTalentGeneralSectionStubs({ referrer: null })
      cy.clock()

      page.visit()

      generalSection.changeReferrerButton.click()

      changeReferrerModal.comment.click().type('C')
      changeReferrerModal.referrerInput
        .click()
        .type('T')
        .tick(DEBOUNCED_AUTOCOMPLETE)
      changeReferrerModal.referrerInput.trigger('keydown', {
        keyCode: ENTER_KEY
      })
      changeReferrerModal.submitButton.click()

      cy.getNotification().should(
        'contain',
        'The referrer has been successfully changed.'
      )
    })

    it('opens & submits the reset referral modal', () => {
      updateTalentGeneralSectionStubs({
        referrer: {
          id: encodeEntityId('123', 'ReferralPartner'),
          __typename: 'ReferralPartner',
          webResource: {
            text: 'Tyler Terry',
            url: 'https://staging.toptal.net/platform/staff/referral_partners/123',
            __typename: 'Link'
          }
        } as unknown as ReferralPartner
      })

      page.visit()

      generalSection.changeReferrerButton.click()

      changeReferrerModal.comment.click().type('C')
      changeReferrerModal.submitButton.click()

      cy.getNotification().should(
        'contain',
        'The referrer has been successfully changed.'
      )
    })
  })

  describe('Change Sourcer button', () => {
    it('opens & submits the change sourcer modal', () => {
      updateTalentGeneralSectionStubs({ sourcer: null })

      page.visit()

      generalSection.changeSourcerButton.click()

      changeSourcerModal.comment.click().type('C')
      changeSourcerModal.sourcerField
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      changeSourcerModal.submitButton.click()

      cy.getNotification().should(
        'contain',
        'The sourcer has been successfully changed'
      )
    })

    it('opens & submits the reset sourcer modal', () => {
      updateTalentGeneralSectionStubs({
        sourcer: {
          id: encodeEntityId('123', 'Staff'),
          webResource: {
            text: 'Aliona Miron',
            url: 'https://staging.toptal.net/platform/staff/staff/789',
            __typename: 'Link'
          },
          __typename: 'Staff'
        } as unknown as Staff
      })

      page.visit()

      generalSection.changeSourcerButton.click()

      changeSourcerModal.comment.click().type('C')
      changeSourcerModal.submitButton.click()

      cy.getNotification().should(
        'contain',
        'The sourcer has been successfully changed'
      )
    })
  })

  describe('Applicant Skills field', () => {
    it('adds new skill to the list', () => {
      updateTalentGeneralSectionStubs({
        applicantSkills: {
          nodes: [
            {
              id: 'VjEtU2tpbGwtMTExNzEy',
              name: 'AWS',
              __typename: 'Skill'
            }
          ],
          __typename: 'TalentApplicantSkillConnection'
        } as unknown as TalentApplicantSkillConnection
      })

      cy.clock()
      page.visit()

      applicantSkillsField.enterEditMode()
      applicantSkillsField.setApplicantSkill('html')

      cy.tick(DEBOUNCED_AUTOCOMPLETE)

      applicantSkillsField.firstOption.click()
      applicantSkillsField.saveButton.click()
    })
  })
})
