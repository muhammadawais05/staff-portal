import {
  SpecializationApplicationRejectionReasonInput,
  Talent,
  TalentCumulativeStatus,
  TalentStatusV2
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '~integration/mocks'

export const getTalentStatusResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      cumulativeStatus: TalentCumulativeStatus.REJECTED,
      newcomer: false,
      topShield: false,
      specializationApplications: {
        nodes: [
          {
            id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMDA0MDM5',
            status: TalentStatusV2.REJECTED,
            startedAt: '2021-11-24T10:14:31+03:00',
            rejectionReason: {
              id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvblJlamVjdGlvblJlYXNvbi04MDYwNzM',
              comment: SpecializationApplicationRejectionReasonInput.NO_SHOW,
              place: 'english',
              reason: SpecializationApplicationRejectionReasonInput.NO_SHOW,
              operations: {
                id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvblJlamVjdGlvblJlYXNvbk9wZXJhdGlvbnMtODA2MDcz',
                updateSpecializationApplicationRejectionReason:
                  hiddenOperationMock(),
                __typename: 'SpecializationApplicationRejectionReasonOperations'
              },
              __typename: 'SpecializationApplicationRejectionReason'
            },
            __typename: 'SpecializationApplication'
          }
        ],
        __typename: 'SpecializationApplicationConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
