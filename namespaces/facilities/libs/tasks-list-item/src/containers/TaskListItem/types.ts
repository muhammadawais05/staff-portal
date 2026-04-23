import { TaskMetadataFragment } from '@staff-portal/tasks'

import { TaskListItemFragment } from './data/task-list-item-fragment'
import { TaskTalentSubjectFragment } from './data/task-talent-subject-fragment'
import { TaskPaymentSubjectFragment } from './data/task-payment-subject-fragment'
import { TaskJobSubjectFragment } from './data/task-job-subject-fragment'
import { TaskInvoiceSubjectFragment } from './data/task-invoice-subject-fragment'
import { TaskEngagementSubjectFragment } from './data/task-engagement-subject-fragment'
import { TaskCommunityEventSubjectFragment } from './data/task-community-event-subject-fragment'
import { TaskClientSubjectFragment } from './data/task-client-subject-fragment'
import { TaskRateChangeRequestSubjectFragment } from './data/task-rate-change-request-subject-fragment'

export interface TaskColRenderProps {
  task: TaskListItemFragment
  taskMetadata?: TaskMetadataFragment
  isExpandedVisible: boolean
}

export type TaskSubject =
  | TaskClientSubjectFragment
  | TaskCommunityEventSubjectFragment
  | TaskEngagementSubjectFragment
  | TaskInvoiceSubjectFragment
  | TaskJobSubjectFragment
  | TaskPaymentSubjectFragment
  | TaskTalentSubjectFragment
  | TaskRateChangeRequestSubjectFragment
