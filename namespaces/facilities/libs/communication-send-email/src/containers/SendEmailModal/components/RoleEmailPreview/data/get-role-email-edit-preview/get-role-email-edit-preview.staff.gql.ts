import { useEffect } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetRoleEmailEditPreviewDocument,
  GetRoleEmailEditPreviewQueryVariables
} from './get-role-email-edit-preview.staff.gql.types'

export const GET_ROLE_EMAIL_EDIT_PREVIEW: typeof GetRoleEmailEditPreviewDocument = gql`
  query GetRoleEmailEditPreview($id: ID!, $body: String!) {
    staffNode(id: $id) {
      id
      ... on Role {
        emailPreview(body: $body) {
          html
        }
      }
    }
  }
`

export const useGetRoleEmailEditPreview = ({
  onError,
  variables
}: {
  onError: (error: Error) => void
  variables: GetRoleEmailEditPreviewQueryVariables
}) => {
  const { data, loading, error } = useQuery(GET_ROLE_EMAIL_EDIT_PREVIEW, {
    variables,
    // TODO: use callback when https://toptal-core.atlassian.net/browse/SPC-296 is resolved
    // onError,
    fetchPolicy: 'cache-first'
  })

  // TODO: do not use useEffect() when https://toptal-core.atlassian.net/browse/SPC-296 is resolved
  useEffect(() => {
    if (error) {
      onError(error)
    }
  }, [onError, error])

  let preview

  if (data?.staffNode && 'emailPreview' in data.staffNode) {
    preview = data.staffNode.emailPreview?.html
  }

  return {
    preview,
    loading,
    error
  }
}
