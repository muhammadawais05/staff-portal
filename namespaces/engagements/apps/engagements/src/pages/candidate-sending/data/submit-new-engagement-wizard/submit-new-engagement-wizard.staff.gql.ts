import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation SubmitNewEngagementWizard($input: SubmitNewEngagementWizardInput!) {
    submitNewEngagementWizard(input: $input) {
      ...SubmitNewEngagementWizardPayloadFragment
      ...MutationResultFragment
    }
  }

  fragment SubmitNewEngagementWizardPayloadFragment on SubmitNewEngagementWizardPayload {
    engagement {
      id
      status

      job {
        id
        ...WebResourceFragment
      }
      talent {
        id
        fullName
      }
    }
    rejectionFeedback {
      ...RejectionFeedbackFragment
    }
  }

  fragment RejectionFeedbackFragment on RejectionFeedback {
    internalFeedbackTitleAndSlugs {
      key
      value
    }
    internalFeedbackTooltips {
      key
      value
    }
    rejectedApplications {
      nodes {
        ...RejectedApplicationConnectionFragment
      }
    }
  }

  fragment RejectedApplicationConnectionFragment on RejectedApplication {
    ... on AvailabilityRequest {
      id
      availabilityRequestTalent: talent {
        id
        profileLink {
          text
          url
        }
      }
    }
    ... on JobApplication {
      id
      jobApplicationTalent: talent {
        id
        profileLink {
          text
          url
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
