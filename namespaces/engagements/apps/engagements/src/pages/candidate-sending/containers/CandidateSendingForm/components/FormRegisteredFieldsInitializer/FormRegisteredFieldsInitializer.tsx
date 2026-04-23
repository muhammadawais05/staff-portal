import React from 'react'
import { FormSpy, useForm, useFormState } from '@toptal/picasso-forms'

import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../../../types'
import { updateRegisteredFieldsInitialValues } from './utils'

/**
 * This component is a hacky workaround to a react-final-form problem.
 * When any form field gets unregistered and then registered again, it is not pre-filled with its initial values
 */
const FormRegisteredFieldsInitializer = <
  TStep extends keyof CandidateSendingStepsAttributesByStep,
  TStepAttributes extends CandidateSendingStepAttributes<TStep> = CandidateSendingStepAttributes<TStep>
>() => {
  const form = useForm<TStepAttributes>()
  const { initialValues } = useFormState<TStepAttributes>()

  return (
    <FormSpy
      subscription={{
        modified: true
      }}
      onChange={async ({ modified }) => {
        // Required to correctly visual update newly registered fields
        // Without it, these fields have initial visual state until re-render of each field
        await Promise.resolve()

        updateRegisteredFieldsInitialValues<TStep, TStepAttributes>({
          initialValues,
          modifiedFields: modified,
          changeFieldValue: form.change
        })
      }}
    />
  )
}

export default FormRegisteredFieldsInitializer
