import { GetEmailPreviewQueryVariables } from '../../../EmailPreview/data/get-email-preview'
import { GET_ROLE_EMAIL_EDIT_PREVIEW } from '../../../RoleEmailPreview/data/get-role-email-edit-preview/get-role-email-edit-preview.staff.gql'

export const createGetRoleEmailEditPreviewMock = (
  variables: Partial<GetEmailPreviewQueryVariables>,
  html: string
) => ({
  request: { query: GET_ROLE_EMAIL_EDIT_PREVIEW, variables },
  result: {
    data: {
      staffNode: {
        id: 'test-id',
        emailPreview: { html, title: '', __typename: 'EmailPreview' },
        __typename: 'Staff'
      }
    }
  }
})

export const createGetRoleEmailEditPreviewFailedMock = (
  variables: Partial<GetEmailPreviewQueryVariables>,
  errorMessage = 'Error occurred.'
) => ({
  request: { query: GET_ROLE_EMAIL_EDIT_PREVIEW, variables },
  error: new Error(errorMessage)
})
