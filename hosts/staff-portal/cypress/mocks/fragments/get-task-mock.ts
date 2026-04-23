import {
  Activity,
  Task,
  PlaybookTemplate,
  Subject
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

type Props = {
  activity?: Partial<Activity>
  task?: Partial<Task>
  playbookTemplate?: Partial<PlaybookTemplate>
  subjects?: Partial<Subject[]>
}

export const getTaskMock = ({
  activity,
  task,
  playbookTemplate,
  subjects
}: Props = {}) =>
  ({
    __typename: 'Task',
    id: encodeEntityId('123', 'Task'),
    description: 'Follow up',
    disputed: false,
    dueDate: '0216-05-18',
    finishedWithChildTask: false,
    priority: 'MEDIUM',
    relatedTime: '2022-01-12T02:58:35-05:00',
    engagedSubjects: {
      totalCount: 1,
      __typename: 'RoleOrClientConnection'
    },
    recurringPeriod: null,
    status: 'finished',
    completer: null,
    starred: false,
    relatedTo: {
      id: encodeEntityId('123', 'Client'),
      __typename: 'Client',
      webResource: {
        text: 'Ferry-Morar BL',
        url: 'https://staging.toptal.net/platform/staff/companies/406373',
        __typename: 'Link'
      }
    },
    performer: {
      id: encodeEntityId('123', 'Staff'),
      webResource: {
        text: 'Leala Dueno',
        url: 'https://staging.toptal.net/platform/staff/staff/315079',
        __typename: 'Link'
      },
      __typename: 'Staff',
      fullName: 'Leala Dueno'
    },
    commentCount: 0,
    playbookTemplate: {
      id: encodeEntityId('123', 'PlaybookTemplate'),
      identifier: 'reach_out_to_prospect_on_lead_pause',
      finishDisabled: true,
      webResource: {
        text: 'Inbound Sales',
        url: 'https://staging.toptal.net/platform/playbooks/inbound_sales#reach_out_to_prospect_on_lead_pause',
        __typename: 'Link'
      },
      __typename: 'PlaybookTemplate',
      ...playbookTemplate
    },
    clientEmailMessagingDefaultEmailTemplate: null,
    operations: {
      __typename: 'TaskOperations'
    },
    activity: activity ?? null,
    subjects: {
      nodes: subjects ?? [
        {
          id: encodeEntityId('123', 'Client'),
          __typename: 'Client',
          fullName: 'Ferry-Morar BL'
        }
      ],
      __typename: 'SubjectConnection'
    },
    ...task
  } as Task)
