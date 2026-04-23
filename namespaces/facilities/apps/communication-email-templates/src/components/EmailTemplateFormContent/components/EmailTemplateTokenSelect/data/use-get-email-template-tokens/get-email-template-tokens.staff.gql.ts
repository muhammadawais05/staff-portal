import { gql, useQuery, ApolloError } from '@staff-portal/data-layer-service'

import { GetEmailTemplateTokensDocument } from './get-email-template-tokens.staff.gql.types'

export default gql`
  query GetEmailTemplateTokens {
    emailTemplateTokens {
      nodes {
        ...EmailTemplateTokenFragment
      }
    }
  }

  fragment EmailTemplateTokenFragment on EmailTemplateToken {
    value
  }
`

interface Props {
  onError?: (error: ApolloError) => void
}

export const useGetEmailTemplateTokens = ({ onError }: Props) => {
  const { data, ...restOptions } = useQuery(GetEmailTemplateTokensDocument, {
    fetchPolicy: 'cache-first',
    onError
  })

  return {
    ...restOptions,
    emailTemplateTokens: data?.emailTemplateTokens?.nodes
  }
}
