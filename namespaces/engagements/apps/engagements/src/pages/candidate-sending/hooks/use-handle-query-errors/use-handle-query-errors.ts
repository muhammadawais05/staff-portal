import {
  getFormErrors,
  ORIGINAL_ERRORS_KEY
} from '@staff-portal/mutation-result-handlers'
import { UserError } from '@staff-portal/graphql/staff'
import { GraphQLError } from 'graphql'
import { SubmissionErrors } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import parse from 'html-react-parser'

const useHandleQueryErrors = () => {
  const { showError } = useNotifications()

  return {
    handleQueryErrors: ({
      errors,
      rootLevelErrors
    }: {
      errors?: UserError[]
      rootLevelErrors?: readonly GraphQLError[]
    }): SubmissionErrors => {
      const errorsSet: UserError[] = errors ?? []

      if (rootLevelErrors?.length) {
        errorsSet.push({
          code: '',
          key: 'base',
          message: 'Server-side Error'
        })
        showError(
          parse(rootLevelErrors.map(({ message }) => message).join('<br/>'))
        )
      }

      const { validationErrors: validationOnly } = getFormErrors(
        errorsSet ?? []
      )

      return {
        ...validationOnly,
        [ORIGINAL_ERRORS_KEY]: errorsSet ?? []
      }
    }
  }
}

export default useHandleQueryErrors
