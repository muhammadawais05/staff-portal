import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  EmailApplicantsApplicationFragment,
  GetEmailApplicantsDataDocument
} from './get-email-applicants-recipient.staff.gql.types'

export const applicantsEmailMessagingMock = {
  roleType: 'Talent',
  defaultSendTo: {
    id: 'VjEtVGFsZW50LTEyMTk4Ng',
    __typename: 'Talent'
  },
  optionsSendTo: {
    nodes: [
      {
        id: 'VjEtVGFsZW50LTEyMTk4Ng',
        fullName: 'Gerda Kuhn',
        email: 'amir-209b40d8f4139b7b@toptal.io',
        contacts: {
          nodes: [
            {
              id: 'VjEtQ29udGFjdC00NTAyNzI',
              value: 'amir-209b40d8f4139b7b@toptal.io',
              __typename: 'Contact'
            },
            {
              id: 'VjEtQ29udGFjdC0zNjYyMzk',
              value: 'amir-9de8b7585d100ede@toptal.io',
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        __typename: 'Talent'
      }
    ],
    __typename: 'EmailMessagingOptionsSendToConnection'
  },
  blankEmailTemplate: {
    id: 'VjEtRW1haWxUZW1wbGF0ZS05MDU0NQ',
    name: 'Blank template',
    __typename: 'EmailTemplate',
    rawTemplate:
      '---\nsubject: ""\n---\n\nHi {{ receiver.contact_first_name }},\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n'
  },
  renderedBlankEmailTemplate: {
    body: 'Hi Gerda,\n\n\nMy best,\n{{sender.first_name}}\n\n{{sender.signature}}\n',
    subject: null,
    __typename: 'EmailTemplateRendered'
  },
  emailCarbonCopyOptions: {
    nodes: [
      {
        label: 'Talent Partner',
        default: false,
        role: {
          id: 'VjEtVGFsZW50UGFydG5lci00MDg5Mzg',
          fullName: 'Kari Blanda',
          email: 'amir-9de8b7585d100ede@toptal.io',
          __typename: 'TalentPartner'
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
          body: 'some template',
          subject: 'CX Talent Promoter NPS Thanks Email (Version 1)',
          __typename: 'EmailTemplateRendered'
        },
        node: {
          id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjM1NDM',
          name: 'CX Talent Promoter NPS Thanks Email (Version 1)',
          __typename: 'EmailTemplate'
        },
        __typename: 'EmailTemplateEdge'
      }
    ],
    __typename: 'EmailTemplatesEdgedConnection'
  },
  fullName: 'Gerda Kuhn',
  ofacStatus: 'INVESTIGATION',
  viewerPendingCommunications: {
    nodes: [],
    __typename: 'TaskSimpleConnection'
  },
  __typename: 'EmailMessagingJobApplication',
  id: 'VjEtRW1haWxNZXNzYWdpbmdKb2JBcHBsaWNhdGlvbi00NjA4MzY'
}

export const createGetEmailApplicantsRecipientMock = ({
  jobId,
  applications
}: {
  jobId: string
  applications?: EmailApplicantsApplicationFragment[]
}): MockedResponse => {
  return {
    request: { query: GetEmailApplicantsDataDocument, variables: { jobId } },
    result: {
      data: {
        node: {
          id: jobId || 'VjEtSm9iLTI1ODM2Mw',
          applications: {
            nodes: applications
              ? applications.map(application => ({
                  ...application,
                  talent: {
                    ...application.talent,
                    __typename: 'Talent'
                  },
                  __typename: 'JobApplication'
                }))
              : [],
            __typename: 'JobApplicationConnection'
          },
          applicantsEmailMessaging: applicantsEmailMessagingMock,
          __typename: 'Job'
        }
      }
    }
  }
}
