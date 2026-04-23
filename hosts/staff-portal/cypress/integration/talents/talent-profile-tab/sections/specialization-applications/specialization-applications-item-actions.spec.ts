import {
  Specialization,
  SpecializationApplicationOperations,
  TalentSpecializationApplicationStatus
} from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { updateTalentSpecializationApplicationsItemActionsStubs } from '~integration/mocks/schema-updates/talents'
import talentSpecializationApplicationsMock from '~integration/mocks/talent-specialization-applications-mock'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

const SPECIALIZATION_DEVELOPER = 'Developer'
const SPECIALIZATION_CORE = 'Core'

describe('Talent Profile > Specialization Applications Section > Specialization Applications Item actions', () => {
  const page = new TalentProfilePage()
  const { specializationApplicationsSection: section } = page

  it('Reject specialization application', () => {
    updateTalentSpecializationApplicationsItemActionsStubs(
      talentSpecializationApplicationsMock({
        talent: {
          cancelableMeetings: {
            nodes: [],
            totalCount: 0
          }
        },
        specializationApplication: {
          status: TalentSpecializationApplicationStatus.PENDING,
          operations: {
            rejectSpecializationApplication: enabledOperationMock()
          } as unknown as SpecializationApplicationOperations,
          specialization: {
            title: SPECIALIZATION_CORE
          } as unknown as Specialization
        }
      })
    )

    page.visit()

    section.specializationApplications
      .first()
      .findByTestId('reject-specialization-application-button')
      .click()

    section.rejectSpecializationApplicationModal.selectRejectionReason('Other')
    section.rejectSpecializationApplicationModal.comment.type('C')
    section.rejectSpecializationApplicationModal.submitButton.click()
    cy.getNotification().should(
      'have.text',
      'The Applicant was successfully rejected.'
    )
  })

  it('Convert specialization application', () => {
    updateTalentSpecializationApplicationsItemActionsStubs(
      talentSpecializationApplicationsMock({
        specializationApplication: {
          operations: {
            convertSpecializationApplication: enabledOperationMock()
          } as unknown as SpecializationApplicationOperations,
          specialization: {
            title: SPECIALIZATION_CORE
          } as unknown as Specialization
        },
        availableSpecialization: {
          title: SPECIALIZATION_DEVELOPER
        }
      })
    )
    page.visit()

    section.specializationApplications
      .first()
      .findByTestId('convert-specialization-application-button')
      .click()

    section.convertSpecializationApplicationModal.selectSpecialization(
      SPECIALIZATION_DEVELOPER
    )
    section.convertSpecializationApplicationModal.comment.type('C')
    section.convertSpecializationApplicationModal.submitButton.click()
    cy.getNotification().should(
      'have.text',
      `The ${SPECIALIZATION_CORE} specialization was successfully converted to ${SPECIALIZATION_DEVELOPER}.`
    )
  })

  it('Resume talent specialization application', () => {
    updateTalentSpecializationApplicationsItemActionsStubs(
      talentSpecializationApplicationsMock({
        specializationApplication: {
          operations: {
            restoreSpecializationApplication: enabledOperationMock()
          } as unknown as SpecializationApplicationOperations,
          specialization: {
            title: SPECIALIZATION_CORE
          } as unknown as Specialization
        }
      })
    )

    page.visit()

    section.specializationApplications
      .first()
      .findByTestId('resume-talent-specialization-application-button')
      .click()

    section.resumeTalentSpecializationApplicationModal.comment.type('C')
    section.resumeTalentSpecializationApplicationModal.submitButton.click()
    cy.getNotification().should(
      'have.text',
      `The ${SPECIALIZATION_CORE} specialization application was successfully resumed.`
    )
  })
})
