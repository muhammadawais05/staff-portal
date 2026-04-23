import { ApolloError, gql, useQuery } from '@staff-portal/data-layer-service'

import { GetManageEmailTemplatesPermitsDocument } from './get-manage-email-templates-permit.staff.gql.types'

export default gql`
  query GetManageEmailTemplatesPermits {
    viewer {
      permits {
        canManageEmailTemplates
      }
    }
  }
`

interface Props {
  onError?: (error: ApolloError) => void
}

export const useGetManageEmailTemplatesPermits = ({ onError }: Props) => {
  const { data, ...rest } = useQuery(GetManageEmailTemplatesPermitsDocument, {
    fetchPolicy: 'cache-first',
    onError
  })

  return {
    permits: data?.viewer.permits,
    ...rest
  }
}
