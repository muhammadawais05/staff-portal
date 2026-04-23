import { useForm } from '@toptal/picasso-forms'

import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../types'

const useUpdateFormValues = <
  TStep extends keyof CandidateSendingStepsAttributesByStep,
  TStepAttributes extends CandidateSendingStepAttributes<TStep> = CandidateSendingStepAttributes<TStep>
>() => {
  const { change, batch } = useForm<TStepAttributes>()

  return {
    updateFormValues: (formValues: TStepAttributes) => {
      if (!formValues) {
        return
      }

      const formEntries = Object.entries(formValues) as [
        keyof TStepAttributes,
        TStepAttributes[keyof TStepAttributes]
      ][]

      batch(() => {
        formEntries.forEach(([fieldName, fieldValue]) => {
          change(fieldName, fieldValue)
        })
      })
    }
  }
}

export default useUpdateFormValues
