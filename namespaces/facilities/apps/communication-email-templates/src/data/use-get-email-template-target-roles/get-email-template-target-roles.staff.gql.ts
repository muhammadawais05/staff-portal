import { gql, useQuery, ApolloError } from '@staff-portal/data-layer-service'

import { GetEmailTemplateTargetRolesDocument } from './get-email-template-target-roles.staff.gql.types'

export default gql`
  query GetEmailTemplateTargetRoles {
    emailTemplateTargetRoles {
      nodes {
        ...EmailTemplateTargetRoleFragment
      }
    }
  }

  fragment EmailTemplateTargetRoleFragment on EmailTemplateTargetRole {
    title
    value
  }
`

interface Props {
  onError?: (error: ApolloError) => void
}

export const useGetEmailTemplateTargetRoles = ({ onError }: Props) => {
  const { data, ...restOptions } = useQuery(
    GetEmailTemplateTargetRolesDocument,
    {
      fetchPolicy: 'cache-first',
      onError
    }
  )

  return {
    ...restOptions,
    emailTemplateTargetRoles: data?.emailTemplateTargetRoles?.nodes
  }
}
