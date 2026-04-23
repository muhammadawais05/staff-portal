import {
  EmailJobApplicantsDocument,
  EmailJobApplicantsMutationVariables
} from './email-job-applicants.staff.gql.types'

const defaultInput = {
  jobApplicationIds: [],
  body: '',
  cc: [],
  emailTemplateId: null,
  title: ''
}

export const createEmailJobApplicantsMock = (
  input: Partial<EmailJobApplicantsMutationVariables['input']>
) => ({
  request: {
    query: EmailJobApplicantsDocument,
    variables: {
      input: { ...defaultInput, ...input }
    }
  },
  result: {
    data: {
      emailJobApplicants: {
        success: true,
        errors: [],
        __typename: 'EmailJobApplicantsPayload',
        successCount:
          input?.jobApplicationIds?.length ??
          defaultInput.jobApplicationIds.length,
        failureCount: 0,
        failureMessage: null
      }
    }
  }
})

export const createEmailJobApplicantsFailedMock = (
  input: Partial<EmailJobApplicantsMutationVariables['input']>
) => ({
  request: {
    query: EmailJobApplicantsDocument,
    variables: {
      input: { ...defaultInput, ...input }
    }
  },
  error: new Error('Failed to fetch')
})
