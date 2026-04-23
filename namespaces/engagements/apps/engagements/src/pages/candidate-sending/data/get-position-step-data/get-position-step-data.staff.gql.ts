import { gql } from '@staff-portal/data-layer-service'

import { RELATED_JOB_APPLICATION_FRAGMENT } from '../related-job-application-fragment'

export default gql`
  query GetPositionStepData($attributes: NewEngagementWizardAttributes!) {
    minimumClientCreditRequired
    newEngagementWizard(step: POSITION, attributes: $attributes) {
      ...PositionStepData
    }
  }

  fragment PositionStepData on NewEngagementWizard {
    job {
      id
      jobType
      specialization {
        id
        title
      }
      client {
        id
        hasUnpaidDepositInvoices
        availablePrepaymentBalanceNullable
      }
    }
    talent {
      id
      type
      vertical {
        id
      }
    }
    relatedJobApplication {
      ...RelatedJobApplicationFragment
    }
  }
  ${RELATED_JOB_APPLICATION_FRAGMENT}
`
