import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import {
  GetTalentPaymentOptionsDocument,
  GetTalentPaymentOptionsQuery
} from './get-talent-payment-options.staff.gql.types'

export const GET_TALENT_PAYMENT_OPTIONS: typeof GetTalentPaymentOptionsDocument = gql`
  query GetTalentPaymentOptions($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentPaymentOptionsFragment
      }
    }
  }

  fragment TalentPaymentOptionsFragment on Talent {
    id
    paymentOptions: paymentOptionsNullable {
      manageLink {
        text
        url
      }
      viewLink {
        text
        url
      }
      nodes {
        accountInfo {
          label
          value
        }
        paymentMethod
        placeholder
        preferred
      }
    }
  }
`

export const useGetTalentPaymentOptions = ({
  talentId,
  batchKey,
  onCompleted,
  onError
}: {
  talentId: string
  batchKey?: string
  onCompleted?: (data: GetTalentPaymentOptionsQuery) => void
  onError?: (error: Error) => void
}) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_PAYMENT_OPTIONS, {
    variables: { talentId },
    onCompleted,
    onError,
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, data: data?.node?.paymentOptions }
}
