import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentContractsDocument } from './get-talent-contracts.staff.gql.types'

export const GET_TALENT_CONTRACTS: typeof GetTalentContractsDocument = gql`
  query GetTalentContracts($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        contractsAndAgreements {
          edges {
            legacy
            node {
              ...TalentAgreement
              ...TalentContract
            }
          }
        }
      }
    }
  }

  fragment TalentAgreement on TalentAgreement {
    id
    agreementSender: sender {
      id
      fullName
    }
    sentAt
    acceptedAt
    agreementStatus: status
    webResource {
      text
      url
    }
  }

  fragment TalentContract on Contract {
    id
    kind
    contractSender: sender {
      id
      fullName
    }
    sentAt
    contractStatus: status
    signatureReceivedAt
    webResource {
      text
      url
    }
    operations {
      resendContract {
        ...ContractOperation
      }
      verifyContract {
        ...ContractOperation
      }
      destroyContract {
        callable
        messages
      }
    }
  }

  fragment ContractOperation on Operation {
    callable
    messages
  }
`

export const useGetTalentContracts = (
  talentId: string,
  { onError }: { onError: () => void }
) =>
  useQuery(GET_TALENT_CONTRACTS, {
    onError,
    variables: { talentId },
    fetchPolicy: 'cache-first'
  })
