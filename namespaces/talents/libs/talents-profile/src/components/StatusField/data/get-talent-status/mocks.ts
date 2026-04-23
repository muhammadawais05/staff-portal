import {
  TalentCumulativeStatus,
  TalentSpecializationApplicationStatus,
  SpecializationApplicationRejectionReasonValue,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { SpecializationApplicationFragment } from '../specialization-application-fragment/specialization-application-fragment.staff.gql.types'
import { GET_TALENT_STATUS } from './get-talent-status.staff.gql'

const defaultSpecializationApplicationMock = {
  id: '123',
  status: TalentSpecializationApplicationStatus.REJECTED,
  startedAt: '2020-12-27T02:52:22+03:00' as const,
  rejectionReason: {
    id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvblJlamVjdGlvblJlYXNvbi0yMjExOTY',
    comment: 'No show',
    place: 'english',
    reason: SpecializationApplicationRejectionReasonValue.NO_SHOW,
    operations: {
      id: 'test-id',
      updateSpecializationApplicationRejectionReason: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  }
}

export const createGetTalentStatusMock = ({
  cumulativeStatus = TalentCumulativeStatus.ACTIVE,
  talentId = '123',
  newcomer = false,
  topShield = false,
  specializationApplications = [defaultSpecializationApplicationMock]
}: {
  cumulativeStatus?: TalentCumulativeStatus
  talentId?: string
  newcomer?: boolean
  topShield?: boolean
  specializationApplications?: SpecializationApplicationFragment[]
}) => ({
  request: {
    query: GET_TALENT_STATUS,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        cumulativeStatus,
        newcomer,
        topShield,
        specializationApplications: {
          nodes: specializationApplications.map(specialization => ({
            ...specialization,
            rejectionReason: {
              ...specialization.rejectionReason,
              operations: {
                id: 'test-id',
                updateSpecializationApplicationRejectionReason: {
                  ...specialization.rejectionReason?.operations
                    .updateSpecializationApplicationRejectionReason,
                  __typename: 'Operation'
                },
                __typename: 'SpecializationApplicationRejectionReasonOperations'
              },
              __typename: 'SpecializationApplicationRejectionReason'
            },
            __typename: 'SpecializationApplication'
          })),
          __typename: 'SpecializationApplicationConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})
