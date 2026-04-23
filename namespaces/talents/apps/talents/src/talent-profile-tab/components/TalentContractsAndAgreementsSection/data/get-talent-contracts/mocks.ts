import { Maybe, OperationCallableTypes } from '@staff-portal/graphql/staff'

import { GET_TALENT_CONTRACTS } from './get-talent-contracts.staff.gql'
import {
  TalentContractFragment,
  TalentAgreementFragment
} from './get-talent-contracts.staff.gql.types'

export const createGetTalentContractsMock = ({
  talentId = '123',
  contractsAndAgreements
}: {
  talentId: string
  contractsAndAgreements?: Maybe<{
    edges: {
      legacy?: Maybe<boolean>
      node: TalentContractFragment | TalentAgreementFragment
    }[]
  }>
}) => ({
  request: { query: GET_TALENT_CONTRACTS, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        contractsAndAgreements: {
          edges: [
            {
              legacy: null,
              node: {
                id: 'VjEtVGFsZW50QWdyZWVtZW50LTUwNg',
                agreementSender: {
                  id: 'VjEtU3RhZmYtMTY2NDI4OA',
                  fullName: 'Carolina Della Corte',
                  __typename: 'Staff'
                },
                sentAt: '2020-09-24T21:23:11+05:30',
                acceptedAt: '2020-09-24T21:56:41+05:30',
                agreementStatus: 'ACCEPTED',
                webResource: {
                  text: 'Semi-Monthly Payments Agreement',
                  url: 'https://staging.toptal.net/platform/staff/email_messages?badges%5Bmessage_id%5D%5B%5D=%3C5f6cc0e7f30b5_1ef93fbc6c048b1c843b2%40platform-web01.production.toptal.net.mail%3E',
                  __typename: 'Link'
                },
                __typename: 'TalentAgreement'
              },
              __typename: 'ContractOrTalentAgreementEdge'
            },
            {
              legacy: false,
              node: {
                id: 'VjEtQ29udHJhY3QtMjE3MzM2',
                kind: 'TALENT_AGREEMENT',
                contractSender: {
                  id: 'VjEtU3RhZmYtMTg3Mjg1Mg',
                  fullName: 'Prishaa Ellagovan',
                  __typename: 'Staff'
                },
                sentAt: '2020-09-16T01:25:32+05:30',
                contractStatus: 'SIGNED',
                signatureReceivedAt: '2020-09-16T13:27:59+05:30',
                webResource: {
                  text: 'Toptal Talent A',
                  url: 'https://staging.toptal.net/platform/staff/contracts/217336',
                  __typename: 'Link'
                },
                operations: {
                  resendContract: {
                    callable: OperationCallableTypes.ENABLED,
                    messages: [],
                    __typename: 'Operation'
                  },
                  destroyContract: {
                    callable: OperationCallableTypes.HIDDEN,
                    messages: ['Cannot resend signed contract'],
                    __typename: 'Operation'
                  },
                  verifyContract: {
                    callable: OperationCallableTypes.ENABLED,
                    messages: [],
                    __typename: 'Operation'
                  },
                  __typename: 'ContractOperations'
                },
                __typename: 'Contract'
              },
              __typename: 'ContractOrTalentAgreementEdge'
            }
          ],
          __typename: 'ContractsAndTalentAgreementsEdgedConnection',
          ...contractsAndAgreements
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentContractsFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: { query: GET_TALENT_CONTRACTS, variables: { talentId } },
  error: new Error('Network error occurred')
})
