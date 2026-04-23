import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  EmailTemplateTargetRoleFragment,
  GetEmailTemplateTargetRolesDocument
} from './get-email-template-target-roles.staff.gql.types'

export default gql`
  query GetEmailTemplateTargetRoles {
    originals: emailTemplateTargetRoles(filter: { scope: TO_CLONE_FROM }) {
      nodes {
        ...EmailTemplateTargetRoleFragment
      }
    }

    destinations: emailTemplateTargetRoles(filter: { scope: TO_CLONE_TO }) {
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

const mapToOptions = (items?: EmailTemplateTargetRoleFragment[]) =>
  items?.length
    ? items.map(({ title, value }) => ({ text: title, value }))
    : [{ text: 'No available vertical', value: '' }]

interface Props {
  onError?: () => void
}

export const useGetEmailTemplateTargetRoles = ({ onError }: Props) => {
  const { data, ...restOptions } = useQuery(
    GetEmailTemplateTargetRolesDocument,
    {
      onError
    }
  )

  const { originalsOptions, destinationsOptions } = useMemo(
    () => ({
      originalsOptions: mapToOptions(data?.originals.nodes),
      destinationsOptions: mapToOptions(data?.destinations.nodes)
    }),
    [data]
  )

  return {
    ...restOptions,
    originalsOptions,
    destinationsOptions
  }
}
