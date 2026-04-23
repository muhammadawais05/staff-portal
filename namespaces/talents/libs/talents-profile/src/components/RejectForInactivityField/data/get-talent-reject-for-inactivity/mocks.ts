import {
  TalentCumulativeStatus,
  Operation,
  OfacStatus,
  OperationCallableTypes,
  InactivityRejectionDeadlineTypes
} from '@staff-portal/graphql/staff'

import { GET_TALENT_REJECT_FOR_INACTIVITY } from './get-talent-reject-for-inactivity.staff.gql'

export const createGetTalentRejectForInactivityMock = ({
  talentId = '123',
  date = '2021-03-03',
  cumulativeStatus,
  operation,
  ofacStatus,
  hasOngoingActivation = false,
  hasOngoingScreening = false,
  inactivityRejectionDeadlines
}: {
  talentId?: string
  date?: string
  cumulativeStatus?: TalentCumulativeStatus
  ofacStatus?: OfacStatus
  operation?: Operation
  hasOngoingActivation?: boolean
  hasOngoingScreening?: boolean
  inactivityRejectionDeadlines?: {
    type: InactivityRejectionDeadlineTypes
    id: string
  }[]
}) => ({
  request: {
    query: GET_TALENT_REJECT_FOR_INACTIVITY,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        cumulativeStatus:
          cumulativeStatus ||
          (hasOngoingScreening
            ? TalentCumulativeStatus.IN_ONBOARDING
            : TalentCumulativeStatus.REJECTED),
        ofacStatus:
          ofacStatus ||
          (hasOngoingScreening ? OfacStatus.NORMAL : OfacStatus.INVESTIGATION),
        inactivityRejectionDeadlines: {
          nodes:
            hasOngoingScreening && inactivityRejectionDeadlines
              ? inactivityRejectionDeadlines.map(deadline => ({
                  operations: {
                    updateInactivityRejectionDeadline: {
                      callable: OperationCallableTypes.ENABLED,
                      messages: [],
                      ...operation,
                      __typename: 'Operation'
                    },
                    __typename: 'InactivityRejectionDeadlineOperations'
                  },
                  date,
                  id: deadline.id,
                  identifier: deadline.type,
                  __typename: 'InactivityRejectionDeadline'
                }))
              : [],
          __typename: 'TalentInactivityRejectionDeadlineConnection'
        },
        activation: hasOngoingActivation
          ? {
              status: 'in_progress',
              id: 'xyz',
              steps: {
                nodes: [
                  {
                    id: 'VjEtQWN0aXZhdGlvblN0ZXAtMzIxOTQ',
                    status: 'FINISHED',
                    deadlineAt: '2021-02-14T23:16:25+03:00',
                    __typename: 'ActivationStep'
                  },
                  {
                    id: 'VjEtQWN0aXZhdGlvblN0ZXAtMzIxOTU',
                    status: 'PENDING_APPLICANT_ACTION',
                    deadlineAt: date,
                    __typename: 'ActivationStep'
                  }
                ],
                __typename: 'ActivationStepConnection'
              },
              __typename: 'Activation'
            }
          : null,
        specializationApplications: {
          nodes: hasOngoingScreening
            ? [
                {
                  id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi00MTk2OTk',
                  __typename: 'SpecializationApplication'
                }
              ]
            : [],
          __typename: 'SpecializationApplicationConnection'
        },
        operations: {
          changeTalentActivationDeadline: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            ...operation,
            __typename: 'Operation'
          },
          __typename: 'TalentOperations'
        },
        __typename: 'Talent'
      }
    }
  }
})
