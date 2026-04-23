import React, { forwardRef } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { ExecutionResult } from 'graphql'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ConvertTalentInput, Maybe } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import {
  concatUnexpectedValidationErrors,
  useHandleMutationResult
} from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED, TalentVerticalFragment } from '@staff-portal/talents'
import { getRoleTypeText } from '@staff-portal/facilities'

import { ConvertTalentMutation } from './data/convert-talent'
import ConvertToAnotherVerticalFormContent from '../ConvertToAnotherVerticalFormContent'
import { useConvertTalent } from './data/convert-talent/convert-talent.staff.gql'
import { getVerticalById } from '../../utils'

export interface ConvertToAnotherVerticalFormMethods {
  submit: () => Promise<ExecutionResult<ConvertTalentMutation> | undefined>
}

export interface Props {
  talentId: string
  type: string
  verticals: TalentVerticalFragment[]
  screeningRoleSteps?: Maybe<{
    nodes: { id: string; status: string; step: { id: string; title: string } }[]
  }>
}

const ConvertToAnotherVerticalForm = forwardRef(
  ({ talentId, type, verticals, screeningRoleSteps }: Props, ref) => {
    const { handleMutationResult } = useHandleMutationResult()
    const { showError } = useNotifications()
    const emitMessage = useMessageEmitter()

    const [convertTalent] = useConvertTalent({
      onError: () =>
        showError('An error occurred, the vertical was not changed.')
    })

    return (
      <Form<ConvertTalentInput>
        onSubmit={async (input, _, setSubmissionErrors) => {
          const { toVerticalId } = input
          const convertTalentResult = await convertTalent({
            variables: { input: { ...input, talentId } }
          })

          const newVertical = getVerticalById(toVerticalId, verticals)

          if (!newVertical) {
            return
          }

          const mutationErrors = handleMutationResult({
            mutationResult: convertTalentResult?.data?.convertTalent,
            successNotificationMessage: `The ${getRoleTypeText(
              type
            )} was successfully converted to a ${titleize(
              newVertical.talentType
            )}.`,
            onSuccessAction: () => emitMessage(TALENT_UPDATED, { talentId }),
            returnAllErrors: true
          })

          if (mutationErrors) {
            const { validationErrors } = mutationErrors

            if (validationErrors) {
              setSubmissionErrors?.(validationErrors)
              const unexpectedValidationErrors =
                concatUnexpectedValidationErrors(
                  validationErrors,
                  Object.keys(input)
                )

              if (unexpectedValidationErrors) {
                showError(unexpectedValidationErrors)
              }
            }

            return
          }

          return convertTalentResult
        }}
      >
        <ConvertToAnotherVerticalFormContent
          ref={ref}
          verticals={verticals}
          screeningRoleSteps={screeningRoleSteps}
        />
      </Form>
    )
  }
)

export default ConvertToAnotherVerticalForm
