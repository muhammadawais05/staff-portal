import TalentPerformanceTab from '~integration/modules/pages/talents/talent-performance-tab'
import {
  updateInfractionStubs,
  updateEditInfractionStubs
} from '~integration/mocks/schema-updates/talents'
import { daysFromNow, ENTER_KEY } from '~integration/utils'
import { getTalentInfractionMock } from '~integration/mocks/fragments/get-talent-infraction-mock'
import { updateRemoveInfractionStubs } from '../../../mocks/schema-updates/talents'
import {
  AddInfractionModal,
  DeleteInfractionModal
} from '~integration/modules/pages/talents/talent-performance-tab/components'
import { enabledOperationMock } from '~integration/mocks'

describe('Talent Performance Tab > Infractions Section > Infractions', () => {
  const page = new TalentPerformanceTab()
  const { infractionsSection: section } = page
  const addInfractionModal = new AddInfractionModal()
  const deleteInfractionModal = new DeleteInfractionModal()

  beforeEach(() => {
    updateInfractionStubs()
    page.visit()
  })

  it('adds an infraction against a talent', () => {
    section.addInfractionButton.click()
    addInfractionModal.summary.type('a')
    addInfractionModal.selectReason
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY, force: true })
    addInfractionModal.description.type('a')

    addInfractionModal.whenOccured
      // to select the current date and keep the format
      .type(daysFromNow(0))
      .trigger('keydown', { keyCode: ENTER_KEY })

    updateInfractionStubs({
      infractions: {
        totalCount: 1,
        nodes: [
          getTalentInfractionMock({
            operations: {
              changeInfraction: enabledOperationMock(),
              removeInfraction: enabledOperationMock()
            }
          })
        ]
      }
    })

    addInfractionModal.submit()
    page
      .getNotification('The Infraction was successfully created.')
      .should('be.visible')
    section.itemFieldReason.contains('Poor English skills')
    section.itemFieldDeatils.contains('a')
  })

  it('edits an infraction for a talent', () => {
    updateInfractionStubs({
      infractions: {
        totalCount: 1,
        nodes: [
          getTalentInfractionMock({
            operations: {
              changeInfraction: enabledOperationMock(),
              removeInfraction: enabledOperationMock()
            }
          })
        ]
      }
    })
    cy.reload()

    section.infractionEditButton.first().click()
    addInfractionModal.assignee
      .click()
      .trigger('keydown', { keyCode: ENTER_KEY, force: true })
    addInfractionModal.summary.type('a')
    updateEditInfractionStubs()

    addInfractionModal.updateButton.click()
    page
      .getNotification('The Infraction was successfully updated.')
      .should('be.visible')
  })

  it('deletes an infraction for a talent', () => {
    updateInfractionStubs({
      infractions: {
        totalCount: 1,
        nodes: [
          getTalentInfractionMock({
            operations: {
              changeInfraction: enabledOperationMock(),
              removeInfraction: enabledOperationMock()
            }
          })
        ]
      }
    })
    cy.reload()

    section.infractionDeleteButton.first().click()
    deleteInfractionModal.comment.type('b')
    updateRemoveInfractionStubs()
    deleteInfractionModal.removeButton.click()

    page
      .getNotification('The infraction was successfully deleted.')
      .should('be.visible')
    section.infractionItems.should('not.exist')
  })
})
