import { Client } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const activeTask = {
  __typename: 'Task',
  id: encodeEntityId('1', 'Task'),
  description: 'Call/Email - Client Check In (60)',
  disputed: false,
  dueDate: '2022-03-07',
  finishedWithChildTask: false,
  priority: 'MEDIUM',
  relatedTime: '2022-01-25T03:46:29-04:00',
  engagedSubjects: {
    totalCount: 1,
    __typename: 'RoleOrClientConnection'
  },
  recurringPeriod: 60,
  source: null,
  status: 'pending',
  completer: null,
  starred: false,
  relatedTo: {
    id: 'VjEtQ2xpZW50LTUzNTQyOQ',
    __typename: 'Client',
    webResource: {
      text: 'Schulist, Funk and Wolff',
      url: 'https://staging.toptal.net/platform/staff/companies/2596580',
      __typename: 'Link'
    }
  },
  performer: {
    id: 'VjEtU3RhZmYtMjMzMDY3Ng',
    webResource: {
      text: 'Astrid Bahringer',
      url: 'https://staging.toptal.net/platform/staff/staff/2330676',
      __typename: 'Link'
    },
    __typename: 'Staff',
    fullName: 'Astrid Bahringer'
  },
  commentCount: 0,
  playbookTemplate: null,
  clientEmailMessagingDefaultEmailTemplate: null,
  operations: {
    __typename: 'TaskOperations'
  },
  activity: null,
  subjects: {
    nodes: [
      {
        id: 'VjEtQ2xpZW50LTUzNTQyOQ',
        __typename: 'Client',
        fullName: 'Schulist, Funk and Wolff'
      }
    ],
    __typename: 'SubjectConnection'
  }
}

export const completedTask = {
  __typename: 'Task',
  id: encodeEntityId('2', 'Task'),
  description: 'Reach out to prospect and classify interview',
  disputed: false,
  dueDate: '2021-07-05',
  finishedWithChildTask: false,
  priority: 'MEDIUM',
  relatedTime: '2022-01-24T17:14:02-04:00',
  engagedSubjects: {
    totalCount: 2,
    __typename: 'RoleOrClientConnection'
  },
  recurringPeriod: 2,
  source: null,
  status: 'finished',
  completer: null,
  starred: false,
  relatedTo: {
    id: 'VjEtSm9iLTI1MDIyOQ',
    __typename: 'Job',
    webResource: {
      text: 'Principal Web Developer (250229)',
      url: 'https://staging.toptal.net/platform/staff/jobs/250229',
      __typename: 'Link'
    }
  },
  performer: {
    id: 'VjEtU3RhZmYtMjQyNTg3NA',
    webResource: {
      text: 'Andres Rosero',
      url: 'https://staging.toptal.net/platform/staff/staff/2425874',
      __typename: 'Link'
    },
    __typename: 'Staff',
    fullName: 'Andres Rosero'
  },
  commentCount: 0,
  playbookTemplate: {
    id: 'VjEtUGxheWJvb2tUZW1wbGF0ZS0yOA',
    identifier: 'follow_up_and_classify_interview',
    finishDisabled: false,
    webResource: {
      text: 'Recruiting',
      url: 'https://staging.toptal.net/platform/playbooks/recruiting#follow_up_and_classify_interview',
      __typename: 'Link'
    },
    __typename: 'PlaybookTemplate'
  },
  clientEmailMessagingDefaultEmailTemplate: null,
  operations: {
    __typename: 'TaskOperations'
  },
  activity: null,
  subjects: {
    nodes: [
      {
        id: 'VjEtSm9iLTI1MDIyOQ',
        __typename: 'Job',
        title: 'Principal Web Developer (250229)',
        jobType: 'developer'
      },
      {
        id: 'VjEtRW5nYWdlbWVudC0yNjUxNDU',
        __typename: 'Engagement',
        job: {
          id: 'VjEtSm9iLTI1MDIyOQ',
          __typename: 'Job',
          title: 'Principal Web Developer (250229)',
          jobType: 'developer'
        }
      },
      {
        id: 'VjEtQ2xpZW50LTUzNTQyOQ',
        __typename: 'Client',
        fullName: 'Schulist, Funk and Wolff'
      }
    ],
    __typename: 'SubjectConnection'
  }
}

export const getRelatedTasksResponse = (client?: Partial<Client>) => ({
  data: {
    staffNode: {
      ...client,
      id: encodeEntityId('123', 'Client'),
      __typename: 'Client',
      relatedTasks: {
        completedCount: 1,
        nodes: [activeTask],
        __typename: 'RelatedTasksConnection'
      }
    }
  }
})
