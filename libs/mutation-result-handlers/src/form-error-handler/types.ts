import { SubmissionErrors } from '@toptal/picasso-forms'
import { UserError } from '@staff-portal/graphql/staff'

export type FormErrors = {
  formWideError: string | undefined
  validationErrors: SubmissionErrors | undefined
}

export type MutationResult = {
  success: boolean
  errors: UserError[]
}
