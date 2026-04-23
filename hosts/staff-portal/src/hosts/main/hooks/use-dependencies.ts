import { DependenciesRegistry } from '@staff-portal/dependency-injector'
import { STATUS_MESSAGES_COMPONENT } from '@staff-portal/page-wrapper'
import { RelatedTasks } from '@staff-portal/tasks-lists'
import { TASK_CARD_SUBJECT_OPTIONS } from '@staff-portal/tasks-list-item'
import { TASK_CARD_COMPONENTS, TaskCardType } from '@staff-portal/tasks-cards'
import {
  TALENT_STATUS_MAPPING,
  useSendRescheduleScreeningEmailModal
} from '@staff-portal/talents'
import { useSendRescheduleReviewCallEmailModal } from '@staff-portal/talents-review-call-email'
import { MEETING_CANCELED_NEXT_ACTION_HOOKS } from '@staff-portal/meetings'
// eslint-disable-next-line no-restricted-imports
import {
  BILLING_MODALS_PATH_MAP,
  RECENT_ACTIVITY_BUTTON,
  RELATED_TASKS,
  BillingAppModalsPathsMap
} from '@toptal/billing-frontend'
import {
  COMPANY_STATUS_TEXT_MAPPING_DI_KEY,
  TALENT_STATUS_MAPPING_DI_KEY
} from '@staff-portal/ofac-compliance'
import { COMPANY_STATUS_TEXT_MAPPING } from '@staff-portal/clients'
import { BillingWidgetsModalsPathsMap } from '@staff-portal/billing-widgets'
import { lazy } from '@staff-portal/utils'
import { StatusMessages } from '@staff-portal/status-messages'
import { RecentActivityButton } from '@staff-portal/chronicles'

// TODO: will be picked up from different namespaced libraries.
const TaskCardComponents = {
  [TaskCardType.Job]: lazy(() => import('@staff-portal/jobs-task-card')),
  [TaskCardType.Company]: lazy(() => import('@staff-portal/clients-task-card')),
  [TaskCardType.Talent]: lazy(() => import('@staff-portal/talents-task-card')),
  [TaskCardType.CommunityEvent]: lazy(
    () => import('@staff-portal/community-event-task-card')
  ),
  [TaskCardType.Payment]: lazy(
    () =>
      import('@staff-portal/billing-widgets/src/widget/StaffPaymentTaskCard')
  ),
  [TaskCardType.Invoice]: lazy(
    () =>
      import('@staff-portal/billing-widgets/src/widget/StaffInvoiceTaskCard')
  ),
  [TaskCardType.RateChangeRequest]: lazy(
    () =>
      import(
        '@staff-portal/talents-rate-change-requests-app/src/rate-change-request-task-card'
      )
  )
}

export const useDependencies = (registry: DependenciesRegistry) =>
  registry
    .set(STATUS_MESSAGES_COMPONENT, StatusMessages)
    .set(TASK_CARD_SUBJECT_OPTIONS, {
      createTalentCard: ({ entityId, fullName, cumulativeStatus }) => ({
        type: TaskCardType.Talent,
        title: fullName,
        subtitle: TALENT_STATUS_MAPPING[cumulativeStatus].text,
        entityId
      })
    })
    .set(TASK_CARD_COMPONENTS, TaskCardComponents)
    .set(MEETING_CANCELED_NEXT_ACTION_HOOKS, {
      useSendRescheduleReviewCallEmailModal,
      useSendRescheduleScreeningEmailModal
    })
    .set(BILLING_MODALS_PATH_MAP, {
      ...BillingWidgetsModalsPathsMap,
      ...BillingAppModalsPathsMap
    })
    .set(COMPANY_STATUS_TEXT_MAPPING_DI_KEY, COMPANY_STATUS_TEXT_MAPPING)
    .set(TALENT_STATUS_MAPPING_DI_KEY, TALENT_STATUS_MAPPING)
    .set(RECENT_ACTIVITY_BUTTON, RecentActivityButton)
    .set(RELATED_TASKS, RelatedTasks)
