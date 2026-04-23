import {
  Link,
  SpecialistAssignment,
  SpecialistAssignmentOperations,
  SpecialistAssignmentStatuses,
  Staff
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { SPECIALIST_ASSIGNMENT_STATUS_MAPPING } from '@staff-portal/talents'

import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { updateTalentScreeningSpecialistStatusStubs } from '~integration/mocks/schema-updates/talents'
import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'

const TSS_ASSIGNEE_NAME = 'Talent Specialist assignee'
const TSS_STATUS_ACTIVE = 'ACTIVE'
const TSS_STATUS_ARCHIVED = 'ARCHIVED'

describe('Talent Profile > Talent Screening Specialist Status Section', () => {
  const page = new TalentProfilePage()
  const { talentScreeningSpecialistStatusSection: section } = page

  it('assigns talent screening specialist status', () => {
    updateTalentScreeningSpecialistStatusStubs({
      specialistAssignment: {
        assignee: { fullName: TSS_ASSIGNEE_NAME } as Staff,
        status: TSS_STATUS_ACTIVE as SpecialistAssignmentStatuses
      }
    })
    page.visit()

    section.emptySpecialistAssignmentTable
      .findByTestId('tss-assign-button')
      .click()

    section.assignTalentScreeningSpecialistStatusModal.assignDrowpdownButton.click()
    section.assignTalentScreeningSpecialistStatusModal.talentScreeningSpecialistList
      .find('[role="menuitem"]')
      .first()
      .click()

    section.assignTalentScreeningSpecialistStatusModal.clickButton('Assign')
    section.specialistAssignmentTable
      .findByTestId('tss-assignee-cell')
      .contains(TSS_ASSIGNEE_NAME)
    section.specialistAssignmentTable
      .findByTestId('tss-status-cell')
      .contains(SPECIALIST_ASSIGNMENT_STATUS_MAPPING[TSS_STATUS_ACTIVE].text)
  })

  it('archives talent screening specialist status', () => {
    updateTalentScreeningSpecialistStatusStubs({
      currentSpecialistAssignment: {
        id: encodeEntityId('123', 'SpecialistAssignment'),
        status: 'ACTIVE' as SpecialistAssignmentStatuses,
        archiving: null,
        assignee: {
          id: encodeEntityId('456', 'Staff'),
          fullName: TSS_ASSIGNEE_NAME,
          webResource: {
            url: 'url.to',
            __typename: 'Link'
          } as unknown as Link,
          __typename: 'Staff'
        } as unknown as Staff,
        operations: {
          archiveSpecialistAssignment: enabledOperationMock(),
          reactivateSpecialistAssignment: hiddenOperationMock(),
          __typename: 'SpecialistAssignmentOperations'
        } as unknown as SpecialistAssignmentOperations,
        __typename: 'SpecialistAssignment'
      } as SpecialistAssignment,
      lazyOperationNode: {
        id: encodeEntityId('123', 'SpecialistAssignment'),
        operations: {
          archiveSpecialistAssignment: enabledOperationMock(),
          reactivateSpecialistAssignment: hiddenOperationMock(),
          __typename: 'SpecialistAssignmentOperations'
        } as unknown as SpecialistAssignmentOperations,
        __typename: 'SpecialistAssignment'
      },
      specialistAssignment: {
        assignee: { fullName: TSS_ASSIGNEE_NAME } as Staff,
        status: TSS_STATUS_ARCHIVED as SpecialistAssignmentStatuses
      }
    })
    page.visit()
    section.specialistAssignmentTable
      .findByTestId('tss-assignee-cell')
      .contains(TSS_ASSIGNEE_NAME)
    section.specialistAssignmentTable
      .findByTestId('tss-status-cell')
      .contains(SPECIALIST_ASSIGNMENT_STATUS_MAPPING[TSS_STATUS_ACTIVE].text)
    section.specialistAssignmentTable.findByTestId('tss-archive-button').click()
    section.archiveTalentScreeningSpecialistStatusModal.selectArchiveReason(
      'Talent not interested'
    )
    section.archiveTalentScreeningSpecialistStatusModal.comment.type('C')
    section.archiveTalentScreeningSpecialistStatusModal.submitButton.click()

    section.specialistAssignmentTable
      .findByTestId('tss-assignee-cell')
      .contains(TSS_ASSIGNEE_NAME)
    section.specialistAssignmentTable
      .findByTestId('tss-status-cell')
      .contains(SPECIALIST_ASSIGNMENT_STATUS_MAPPING[TSS_STATUS_ARCHIVED].text)
  })
})
