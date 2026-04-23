import { encodeEntityId } from '@staff-portal/data-layer-service'
import { FlagColor } from '@staff-portal/graphql/staff'

import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { BasicModal } from '~integration/modules/modals'
import { updateRoleFlagsStaffProfileStubs } from '~integration/mocks/schema-updates/staff-profile'
import { ENTER_KEY } from '~integration/utils'
import { getStaffProfileRoleFlagsResponse } from '~integration/mocks/responses'
import { clientRoleFlagMock } from '~integration/mocks/fragments'

describe('Staff Profile Role flags', () => {
  const staffProfilePage = new StaffProfilePage()
  const flagModal = new BasicModal()
  const { roleFlags } = staffProfilePage

  it('checks Role Flag functions on the Header', () => {
    updateRoleFlagsStaffProfileStubs()

    staffProfilePage.visit()

    roleFlags.addFlagButton.click()
    roleFlags.flagSelect.click().trigger('keydown', { keyCode: ENTER_KEY })
    roleFlags.commentField.type('comment')

    const flagTagTitle = 'Type A Quality Talent'
    const roleFlagMock = {
      id: encodeEntityId('123', 'RoleFlag'),
      flag: {
        id: encodeEntityId('123', 'Flag'),
        color: FlagColor.GREEN,
        title: flagTagTitle,
        reviewCycleEnabled: true,
        severityEnabled: true,
        targetRole: ''
      }
    }

    updateRoleFlagsStaffProfileStubs({
      GetRoleFlags: getStaffProfileRoleFlagsResponse([
        clientRoleFlagMock(roleFlagMock)
      ])
    })

    flagModal.clickButton('Add Flag')

    cy.getNotification()
      .should('have.text', 'The Flag was successfully added.')
      .find('button')
      .click()
    roleFlags.flagTag.should('have.text', flagTagTitle)

    const differentComment = 'different comment'

    roleFlags.editFlagWithName(flagTagTitle).trigger('mouseover')
    roleFlags.editFlagButton.click()
    roleFlags.commentField.type(differentComment)

    updateRoleFlagsStaffProfileStubs({
      GetRoleFlags: getStaffProfileRoleFlagsResponse([
        clientRoleFlagMock({
          ...roleFlagMock,
          comment: differentComment
        })
      ])
    })

    flagModal.clickButton('Update Flag')

    cy.getNotification()
      .should('have.text', 'The Flag was successfully updated.')
      .find('button')
      .click()

    roleFlags.editFlagWithName(flagTagTitle).trigger('mouseover')
    cy.getTooltip().within(() => {
      cy.get('p').should('contain.text', differentComment)
    })

    roleFlags.deleteFlagButton.click()
    roleFlags.commentField.type('comment')
    updateRoleFlagsStaffProfileStubs({
      GetRoleFlags: getStaffProfileRoleFlagsResponse()
    })
    flagModal.clickButton('Delete Flag')

    cy.getNotification()
      .should('have.text', 'The Flag was successfully removed.')
      .find('button')
      .click()
    roleFlags.flagTag.should('not.exist')
  })
})
