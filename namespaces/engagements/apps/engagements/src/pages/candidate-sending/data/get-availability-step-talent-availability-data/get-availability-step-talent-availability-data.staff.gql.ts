import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetAvailabilityStepTalentAvailabilityData(
    $attributes: NewEngagementWizardAttributes!
  ) {
    newEngagementWizard(step: AVAILABILITY, attributes: $attributes) {
      ...AvailabilityStepTalentAvailabilityDataFragment
    }
  }

  fragment AvailabilityStepTalentAvailabilityDataFragment on NewEngagementWizard {
    talent {
      id

      associatedRoles(filter: { roleType: TALENT }) {
        nodes {
          ...TalentAvailabilityFragment
        }
      }

      operations {
        updateTalentAllocatedHours {
          ...OperationFragment
        }
      }

      endingEngagements {
        nodes {
          id
          job {
            id
            claimer {
              id
              ...WebResourceFragment
            }
          }
          ...WebResourceFragment
        }
      }

      ...TalentAvailabilityFragment
    }

    job {
      id
      commitment
      expectedWeeklyHours
      expectedWeeklyHoursWithDefault
    }

    talentCalendarAvailability {
      date
      slotsCount
    }
  }

  ${OPERATION_FRAGMENT}
`
