import { GetEmailPreviewQueryVariables } from './get-email-preview.staff.gql.types'
import { GET_EMAIL_PREVIEW } from './get-email-preview.staff.gql'

export const createGetEmailEditPreviewMock = (
  variables: Partial<GetEmailPreviewQueryVariables>,
  html: string
) => ({
  request: { query: GET_EMAIL_PREVIEW, variables },
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

export const createGetEmailEditPreviewFailedMock = (
  variables: Partial<GetEmailPreviewQueryVariables>,
  errorMessage = 'Error occurred.'
) => ({
  request: { query: GET_EMAIL_PREVIEW, variables },
  error: new Error(errorMessage)
})
