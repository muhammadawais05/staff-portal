import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import {
  TaskCardType,
  TaskCardConfig,
  TaskCardConfigGroup,
  TaskCardConfigGroupOrItem
} from '@staff-portal/tasks-cards'

import { TaskRateChangeRequestSubjectFragment } from '../../data/task-rate-change-request-subject-fragment'
import { TaskActivitySubjectFragment } from '../../data/task-activity-subject-fragment'
import { TaskSubject } from '../../types'
import { TASK_CARD_PRIORITY } from '../../config'

type TaskCardMappingConfig = {
  entityId: string
}

export type TaskCardSubjectOptions = {
  createTalentCard: (options: {
    fullName: string
    cumulativeStatus: TalentCumulativeStatus
    entityId: string
  }) => TaskCardConfig
}

const createTaskCardGroup = (
  type: TaskCardType,
  taskCards: TaskCardConfig[]
): TaskCardConfigGroup => ({
  type,
  taskCards,
  title: `${type} (${taskCards.length})`
})

const createDetailsTaskCard = ({
  entityId
}: TaskCardMappingConfig): TaskCardConfig => ({
  entityId,
  type: TaskCardType.TaskDetails,
  title: TaskCardType.TaskDetails
})

const createActivityTaskCard = ({
  entityId
}: TaskCardMappingConfig): TaskCardConfig => ({
  entityId,
  type: TaskCardType.Activity,
  title: TaskCardType.Activity
})

const createCompanyCard = ({
  entityId,
  fullName
}: { fullName: string } & TaskCardMappingConfig): TaskCardConfig => ({
  type: TaskCardType.Company,
  title: fullName,
  subtitle: TaskCardType.Company,
  entityId
})

const createJobCard = ({
  entityId,
  title,
  jobType
}: {
  title: string
  jobType: string
} & TaskCardMappingConfig): TaskCardConfig => ({
  type: TaskCardType.Job,
  title,
  subtitle: `${titleize(jobType)} Job`,
  entityId
})

const createInvoiceCard = ({
  entityId,
  isConsolidated
}: { isConsolidated: boolean } & TaskCardMappingConfig): TaskCardConfig => ({
  type: TaskCardType.Invoice,
  title: decodeEntityId(entityId).id,
  subtitle: isConsolidated
    ? `${TaskCardType.Invoice} (original)`
    : TaskCardType.Invoice,
  entityId
})

const createPaymentCard = ({
  entityId
}: TaskCardMappingConfig): TaskCardConfig => ({
  type: TaskCardType.Payment,
  title: decodeEntityId(entityId).id,
  subtitle: TaskCardType.Payment,
  entityId
})

const createCommunityEventCard = ({
  entityId
}: TaskCardMappingConfig): TaskCardConfig => ({
  type: TaskCardType.CommunityEvent,
  title: TaskCardType.CommunityEvent,
  entityId
})

const createRateChangeRequestCard = (
  subject: TaskRateChangeRequestSubjectFragment
): TaskCardConfig => ({
  type: TaskCardType.RateChangeRequest,
  title: TaskCardType.RateChangeRequest,
  subtitle: subject.requestTypeEnumValue
    ? titleize(subject.requestTypeEnumValue)
    : undefined,
  entityId: subject.id
})

// eslint-disable-next-line complexity
const mapSubjectToCard = (
  subject: TaskSubject,
  options?: TaskCardSubjectOptions
): TaskCardConfig | null => {
  switch (subject.__typename) {
    case 'Client':
      return createCompanyCard({
        fullName: subject.fullName,
        entityId: subject.id
      })
    case 'Talent':
      return options
        ? options.createTalentCard({
            fullName: subject.fullName,
            cumulativeStatus: subject.cumulativeStatus,
            entityId: subject.id
          })
        : {
            type: TaskCardType.Talent,
            title: subject.fullName,
            subtitle: subject.cumulativeStatus,
            entityId: subject.id
          }
    case 'Job':
      return createJobCard({
        title: subject.title,
        jobType: subject.jobType,
        entityId: subject.id
      })
    case 'Engagement':
      return subject.job
        ? createJobCard({
            title: subject.job.title,
            jobType: subject.job.jobType,
            entityId: subject.job.id
          })
        : null
    case 'Invoice':
      return createInvoiceCard({
        isConsolidated: Boolean(subject.consolidatedInvoice),
        entityId: subject.id
      })
    case 'Payment':
      return createPaymentCard({ entityId: subject.id })
    case 'CommunityEvent':
      return createCommunityEventCard({ entityId: subject.id })
    case 'RateChangeRequest':
      return createRateChangeRequestCard(subject)
    default:
      return null
  }
}

const filterTaskCards = (
  existingTaskCard: TaskCardConfig | null,
  index: number,
  taskCardList: (TaskCardConfig | null)[]
): existingTaskCard is TaskCardConfig => {
  // Filter out empty values
  if (!existingTaskCard) {
    return false
  }

  // Filter out duplicate entityId
  const foundIndex = taskCardList.findIndex(
    taskCard => taskCard?.entityId === existingTaskCard.entityId
  )

  return foundIndex === index
}

const sortTaskCards = (
  { type: taskCardType1 }: TaskCardConfig,
  { type: taskCardType2 }: TaskCardConfig
) => {
  const index1 = TASK_CARD_PRIORITY.indexOf(taskCardType1)
  const index2 = TASK_CARD_PRIORITY.indexOf(taskCardType2)

  return index1 - index2
}

const groupTaskCards = (
  taskCards: TaskCardConfig[]
): TaskCardConfigGroupOrItem[] => {
  // We need to use a Map because the order matters
  const taskCardTypeMap = new Map<TaskCardType, TaskCardConfig[]>()

  taskCards.forEach(taskCard => {
    const { type: key } = taskCard
    const existingTabs = taskCardTypeMap.get(key)

    return taskCardTypeMap.set(key, [...(existingTabs || []), taskCard])
  })

  const taskCardGroups = Array.from(taskCardTypeMap.entries())

  return taskCardGroups.map(([type, items]) =>
    items.length === 1 ? items[0] : createTaskCardGroup(type, items)
  )
}

export const generateTaskCardsFromSubjects = (
  taskId: string,
  subjects: TaskSubject[],
  activity: TaskActivitySubjectFragment | null | undefined = null,
  options?: TaskCardSubjectOptions
): TaskCardConfigGroupOrItem[] => {
  const detailsTaskCard = createDetailsTaskCard({ entityId: taskId })
  const activityTaskCard =
    activity && createActivityTaskCard({ entityId: activity.id })
  const subjectTaskCards = subjects.map(subject =>
    mapSubjectToCard(subject, options)
  )

  const taskCards = [detailsTaskCard, activityTaskCard, ...subjectTaskCards]
    .filter(filterTaskCards)
    .sort(sortTaskCards)

  return groupTaskCards(taskCards)
}
