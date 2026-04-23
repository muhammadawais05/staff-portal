import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, Link, PurchaseOrder } from '@staff-portal/graphql/staff'

import { updateTalentSectionStubs } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { ENTER_KEY } from '~integration/utils'

describe('Engagement Page -> Talent Section', () => {
  const page = new Engagement()

  const { talentSection: section } = page

  it('shows talent section', () => {
    updateTalentSectionStubs()

    page.visit()

    // test edit trial length
    section.getTrialLengthEditButton().click()

    section.trialLengthEdit
      .getLengthSelector()
      .click()
      // TODO: remove { force: true } in scope of
      // https://toptal-core.atlassian.net/browse/SPB-2967
      .trigger('keydown', { keyCode: ENTER_KEY, force: true })

    section.trialLengthEdit.getTrialLengthEditComment().type('Some comment')
    section.trialLengthEdit.getTrialLengthEditSubmitButton().click()

    cy.getNotification().should(
      'have.text',
      'The Trial Length was successfully changed.'
    )
    cy.getNotification().find('button').click()

    section.getTrialLength().should('contain.text', '1 business day')

    // test change min commitment
    updateTalentSectionStubs({
      engagement: {
        commitmentSettings: {
          id: encodeEntityId('1', 'CommitmentSettings'),
          minimumHours: 80
        }
      }
    })

    section.getEditMinCommitmentButton().click()
    section.selectMinimumHours()
    section.getEditMinCommitmentComment().type('Some comment')
    section.getEditMinCommitmentSubmitButton().click()

    cy.getNotification().should(
      'have.text',
      'Minimum commitment settings were successfully updated.'
    )
    cy.getNotification().find('button').click()

    section.getMinCommitment().should('contain.text', '80 hours per week')

    // change extra hours enabled
    section.editExtraHoursEnabled()
    section.setExtraHoursEnabled('true')
    section.getExtraHoursEnabled().should('contain', 'Yes')

    // edit the purchase order
    updateTalentSectionStubs({
      engagement: {
        purchaseOrder: undefined,
        selectablePurchaseOrders: {
          totalCount: 1,
          nodes: [
            {
              id: encodeEntityId('1', 'PurchaseOrder'),
              poNumber: '123456',
              client: {
                id: encodeEntityId('1', 'Client'),
                fullName: 'Company Name'
              } as Client
            } as PurchaseOrder
          ]
        }
      },
      jobNode: {
        id: encodeEntityId('1', 'Job'),
        title: 'Job Title',
        purchaseOrder: {
          id: encodeEntityId('2', 'PurchaseOrder'),
          poNumber: '1234567'
        }
      }
    })

    section.getPurchaseOrderEditButton().click()
    section.purchaseOrderEditModal
      .getPurchaseOrdersField()
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY })
    section.purchaseOrderEditModal.comment.type('Some comment')

    updateTalentSectionStubs({
      engagement: {
        purchaseOrder: {
          id: encodeEntityId('1', 'PurchaseOrder'),
          poNumber: '123456',
          webResource: {
            url: 'https://toptal.com'
          } as Link
        } as PurchaseOrder
      }
    })

    section.purchaseOrderEditModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'The Purchase Order Number was successfully updated.'
    )

    section.getPurchaseOrderNumber().should('contain.text', '123456')

    // test Skype link
    section
      .getSkypeLink()
      .should('have.attr', 'href', 'skype:christine_steuber2832944')

    // test phone link
    section.getPhoneLink().click()
    cy.url().should('be.equal', Cypress.config().baseUrl + '/engagements/911')
  })
})
