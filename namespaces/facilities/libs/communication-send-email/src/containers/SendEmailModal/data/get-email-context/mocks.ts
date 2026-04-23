import { MockedResponse } from '@staff-portal/data-layer-service'
import { OfacStatus, TaskPriorityLevel } from '@staff-portal/graphql/staff'

import {
  GetGeneralEmailContextDocument,
  GetGeneralEmailContextQuery,
  GetGeneralEmailContextQueryVariables
} from '../../components/SendGeneralEmailModalContent/data/get-general-email-context/get-general-email-context.staff.gql.types'
import {
  EmailMessagingFragment,
  PendingCommunicationsTaskFragment
} from '../fragments'

export const createPendingCommunicationTaskMock = (
  partial: Partial<PendingCommunicationsTaskFragment>
): PendingCommunicationsTaskFragment => ({
  id: 'mock default id',
  priority: TaskPriorityLevel.HIGH,
  description: 'mock default description',
  status: 'pending',
  dueDate: '2020-06-03',
  recurringPeriod: null,
  ...partial
})

export const createEmailContextMock = ({
  emailMessaging
}: {
  emailMessaging?: Partial<EmailMessagingFragment>
}): EmailMessagingFragment =>
  ({
    roleType: 'Client',
    defaultSendTo: {
      id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyMjE0MTk',
      __typename: 'CompanyRepresentative'
    },
    optionsSendTo: {
      nodes: [
        {
          id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyMjE0MTk',
          fullName: 'Maynard Monahan',
          email: 'tim.-f02a3c7d39d3ff92@toptal.io',
          contacts: {
            nodes: [
              {
                id: 'VjEtQ29udGFjdC0yNjA4MTc0',
                value: 'tim.-f02a3c7d39d3ff92@toptal.io',
                __typename: 'Contact'
              }
            ],
            __typename: 'ContactConnection'
          },
          __typename: 'CompanyRepresentative'
        }
      ],
      __typename: 'EmailMessagingOptionsSendToConnection'
    },
    blankEmailTemplate: {
      id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ',
      name: 'Blank template',
      __typename: 'EmailTemplate'
    },
    renderedBlankEmailTemplate: {
      body: 'Hi {{receiver.contact_first_name}},\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
      subject: null,
      __typename: 'EmailTemplateRendered'
    },
    emailCarbonCopyOptions: {
      nodes: [
        {
          label: 'Sales Claimer',
          default: false,
          role: {
            id: 'VjEtU3RhZmYtMTIwOTYyNA',
            fullName: 'Serena Runte',
            email: 'mich-9d054b67d4477cf1@toptal.io',
            __typename: 'Staff'
          },
          __typename: 'EmailCarbonCopyOption'
        },
        {
          label: 'Relationship Manager',
          default: false,
          role: {
            id: 'VjEtU3RhZmYtMTEzNzEwNg',
            fullName: 'Cleo Lockman',
            email: 'seba-59b506ac2e3c32fa@toptal.io',
            __typename: 'Staff'
          },
          __typename: 'EmailCarbonCopyOption'
        },
        {
          label: 'Company CEO',
          default: false,
          role: {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyMjE0MTk',
            fullName: 'Maynard Monahan',
            email: 'tim.-f02a3c7d39d3ff92@toptal.io',
            __typename: 'CompanyRepresentative'
          },
          __typename: 'EmailCarbonCopyOption'
        }
      ],
      __typename: 'EmailCarbonCopyOptionConnection'
    },
    emailTemplates: {
      edges: [
        {
          rendered: {
            body: '\r\nHi {{receiver.first_name}},\r\nWelcome to Toptal. We are looking to increase our network of PROJECT managers, especially in the US. Are you interested in trying to pass in the screening process for Project managers?\r\nOnce you pass, you will increase your chances of getting engagement. If you are, I can submit your profile to our screening process. \r\nI am looking forward to hearing back from you.\r\nBest,\r\n{{sender.first_name}}\n\n{{sender.signature}}\r\n',
            subject:
              'Are you interested in applying to Project Management Vertical?',
            __typename: 'EmailTemplateRendered'
          },
          node: {
            id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjMwNTA',
            name: 'Are you interested in applying to Project Management Vertical?',
            __typename: 'EmailTemplate'
          },
          __typename: 'EmailTemplateEdge'
        }
      ],
      __typename: 'EmailTemplatesEdgedConnection'
    },
    fullName: 'Gerhold-Kohler GM',
    ofacStatus: OfacStatus.NORMAL,
    viewerPendingCommunications: {
      nodes: [
        {
          id: 'VjEtVGFzay0xMTk2NjUxMA',
          priority: TaskPriorityLevel.HIGH,
          description:
            'Give update to client on progress with developer search',
          dueDate: '2021-11-02',
          status: 'pending',
          recurringPeriod: 2,
          __typename: 'Task'
        }
      ],
      __typename: 'TaskSimpleConnection'
    },
    __typename: 'EmailMessaging',
    ...emailMessaging
  } as unknown as EmailMessagingFragment)

export const createGetEmailContextMock = (
  roleOrClientId: string,
  emailMessaging?: Partial<EmailMessagingFragment>
): MockedResponse => {
  const variables: GetGeneralEmailContextQueryVariables = {
    nodeId: roleOrClientId
  }

  const data: GetGeneralEmailContextQuery = {
    staffNode: {
      id: roleOrClientId,
      emailMessaging: createEmailContextMock({ emailMessaging }),
      __typename: 'Client'
    }
  } as unknown as GetGeneralEmailContextQuery

  return {
    request: { query: GetGeneralEmailContextDocument, variables },
    result: { data }
  }
}
