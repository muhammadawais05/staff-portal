import {
  CandidateSendingStepAttributes,
  CandidateSendingStepsAttributesByStep
} from '../../../../../../types'

const updateRegisteredFieldsInitialValues = <
  TStep extends keyof CandidateSendingStepsAttributesByStep,
  TStepAttributes extends CandidateSendingStepAttributes<TStep> = CandidateSendingStepAttributes<TStep>
>({
  initialValues,
  modifiedFields,
  changeFieldValue
}: {
  initialValues: Partial<TStepAttributes>
  modifiedFields?: Record<string, boolean>
  changeFieldValue: (
    fieldName: keyof TStepAttributes,
    value: Partial<TStepAttributes>[keyof TStepAttributes]
  ) => void
}) => {
  if (!modifiedFields) {
    return
  }

  ;(
    Object.entries(modifiedFields) as [keyof TStepAttributes, boolean][]
  ).forEach(([fieldName, isModifiedField]) => {
    const initialValue = initialValues[fieldName]

    if (isModifiedField || initialValue === undefined) {
      return
    }

    changeFieldValue(fieldName, initialValue)
  })
}

export default updateRegisteredFieldsInitialValues
