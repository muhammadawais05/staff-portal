import { SpecializationApplicationRejectionReasonValue } from '@staff-portal/graphql/staff'

import { updateEditStatusStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

describe('Talent Profile Tab > Edit Status', () => {
  const page = new TalentProfilePage()

  const {
    generalSection: { statusField }
  } = page

  beforeEach(() => {
    updateEditStatusStubs()

    page.visit()
  })

  it('edits status reason', () => {
    statusField.toggleRejectionReason()
    statusField.selectReason(
      SpecializationApplicationRejectionReasonValue.OTHER
    )

    updateEditStatusStubs(SpecializationApplicationRejectionReasonValue.OTHER)

    statusField.editableFieldValue.should('contain.text', 'Reason: No show.')
  })
})
