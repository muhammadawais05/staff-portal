import { ReactElement, useCallback } from 'react'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Dictionary } from '@staff-portal/utils'

import {
  PropsWithMutationObject,
  PropsWithSubmitHandler
} from '../../ModalActionForm'
import { TypedDocumentNodeWithInputVariables } from '../../types'

export type Props<
  TFormValues extends Dictionary,
  TDocumentNode extends TypedDocumentNodeWithInputVariables = TypedDocumentNodeWithInputVariables
> = {
  children: (data: {
    onSubmit: PropsWithSubmitHandler<TFormValues>['onSubmit']
    mutationLoading: boolean
  }) => ReactElement
  onClose: () => void
} & PropsWithMutationObject<TFormValues, TDocumentNode>

const MutationHandlerWrapper = <
  TFormValues extends Dictionary,
  TDocumentNode extends TypedDocumentNodeWithInputVariables = TypedDocumentNodeWithInputVariables
>({
  adjustFormValues,
  children,
  mutation,
  onClose
}: Props<TFormValues, TDocumentNode>) => {
  const { handleSubmit: handleMutationSubmit, loading: mutationLoading } =
    useModalFormChangeHandler({
      mutationDocument: mutation.document,
      mutationResultOptions: {
        successNotificationMessage: mutation.successMessage,
        successMessageEmitOptions: mutation.successMessageEmitOptions,
        onSuccessAction: mutationResult => {
          onClose()
          mutation.onSuccess?.(mutationResult)
        }
      },
      errorNotificationMessage: mutation.errorMessage
    })

  const handleSubmit = useCallback(
    (formValues: TFormValues) => {
      return handleMutationSubmit(adjustFormValues?.(formValues) ?? formValues)
    },
    [handleMutationSubmit, adjustFormValues]
  )

  return children({ mutationLoading, onSubmit: handleSubmit })
}

export default MutationHandlerWrapper
