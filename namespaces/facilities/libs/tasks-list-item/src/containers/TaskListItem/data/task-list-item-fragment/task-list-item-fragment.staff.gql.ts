import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TASK_FRAGMENT } from '@staff-portal/tasks'

import { TASK_CLIENT_SUBJECT_FRAGMENT } from '../task-client-subject-fragment'
import { TASK_COMMUNITY_EVENT_SUBJECT_FRAGMENT } from '../task-community-event-subject-fragment'
import { TASK_ENGAGEMENT_SUBJECT_FRAGMENT } from '../task-engagement-subject-fragment'
import { TASK_INVOICE_SUBJECT_FRAGMENT } from '../task-invoice-subject-fragment'
import { TASK_JOB_SUBJECT_FRAGMENT } from '../task-job-subject-fragment'
import { TASK_PAYMENT_SUBJECT_FRAGMENT } from '../task-payment-subject-fragment'
import { TASK_TALENT_SUBJECT_FRAGMENT } from '../task-talent-subject-fragment'
import { TASK_ACTIVITY_SUBJECT_FRAGMENT } from '../task-activity-subject-fragment'
import { TASK_RATE_CHANGE_REQUEST_SUBJECT_FRAGMENT } from '../task-rate-change-request-subject-fragment'

export const TASK_LIST_ITEM_FRAGMENT = gql`
  fragment TaskListItemFragment on Task {
    ...TaskFragment

    operations {
      cancelTaskDispute @include(if: $loadDisputeOperations) {
        ...OperationFragment
      }
    }
    activity {
      ...TaskActivitySubjectFragment
    }
    subjects {
      nodes {
        ...TaskJobSubject
        ...TaskEngagementSubject
        ...TaskTalentSubject
        ...TaskClientSubject
        ...TaskInvoiceSubject
        ...TaskPaymentSubject
        ...TaskCommunityEventSubject
        ...TaskRateChangeRequestSubject
      }
    }
  }

  ${TASK_FRAGMENT}
  ${OPERATION_FRAGMENT}

  ${TASK_ACTIVITY_SUBJECT_FRAGMENT}
  ${TASK_JOB_SUBJECT_FRAGMENT}
  ${TASK_ENGAGEMENT_SUBJECT_FRAGMENT}
  ${TASK_TALENT_SUBJECT_FRAGMENT}
  ${TASK_CLIENT_SUBJECT_FRAGMENT}
  ${TASK_INVOICE_SUBJECT_FRAGMENT}
  ${TASK_PAYMENT_SUBJECT_FRAGMENT}
  ${TASK_COMMUNITY_EVENT_SUBJECT_FRAGMENT}
  ${TASK_RATE_CHANGE_REQUEST_SUBJECT_FRAGMENT}
`
