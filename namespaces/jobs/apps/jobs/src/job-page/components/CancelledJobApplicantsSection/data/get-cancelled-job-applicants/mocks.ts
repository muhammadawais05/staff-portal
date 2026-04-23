import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

import { CancelledJobApplicantFragment } from './get-cancelled-job-applicants.staff.gql.types'

export const createCancelledJobApplicantsMock = ({
  jobId,
  talentName,
  talentType,
  operation
}: {
  jobId?: string
  talentName?: string
  talentType?: string
  operation?: Operation
} = {}): CancelledJobApplicantFragment => ({
  id: jobId || 'some-id',
  createdAt: '2021-07-28T22:11:06+03:00',
  talent: {
    id: 'talent-id',
    fullName: talentName || 'Talent Name',
    type: talentType || 'Developer'
  },
  webResource: {
    url: 'some-url.com'
  },
  operations: {
    emailJobApplicant: operation || {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  emailMessaging: {
    id: 'VjEtRW1haWxNZXNzYWdpbmdKb2JBcHBsaWNhdGlvbi0xMjM='
  }
})
