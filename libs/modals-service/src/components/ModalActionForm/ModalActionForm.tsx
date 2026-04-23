import React, { memo, ReactNode } from 'react'
import { SizeType } from '@toptal/picasso'
import { SubmissionErrors } from '@toptal/picasso-forms'
import { VariantType } from '@toptal/picasso/Button'
import {
  FormErrors,
  MutationResult,
  SuccessMessageEmitOptions
} from '@staff-portal/mutation-result-handlers'
import { VariablesOf } from '@staff-portal/data-layer-service'
import type { Dictionary, StrictUnion } from '@staff-portal/utils'
import { TypedMessage } from '@toptal/staff-portal-message-bus'

import { ActionFormContent, MutationHandlerWrapper } from './components'
import { TypedDocumentNodeWithInputVariables } from './types'
import { arePropsEqual } from './utils'

export type BaseProps<TFormValues extends Dictionary> = {
  children: ReactNode
  title: string
  cancelText?: string
  submitText?: string
  loading?: boolean
  initialLoading?: boolean
  variant?: VariantType
  size?: SizeType<'small' | 'medium' | 'large'> | 'full-screen'
  initialValues?: Partial<TFormValues>
  testIds?: {
    closeButton?: string
    submitButton?: string
  }
  onClose: () => void
}

export type PropsWithSubmitHandler<TFormValues extends Dictionary> = {
  mutationLoading: boolean
  onSubmit: (
    formValues: TFormValues
  ) => Promise<SubmissionErrors | FormErrors | void>
}

export type PropsWithMutationObject<
  TFormValues extends Dictionary,
  TDocumentNode extends TypedDocumentNodeWithInputVariables
> = {
  mutation: {
    document: TDocumentNode
    successMessage: string
    successMessageEmitOptions?: SuccessMessageEmitOptions<TypedMessage>
    onSuccess?: (mutationResult: MutationResult) => void
    errorMessage?: string
  }
  adjustFormValues?: (
    formValues: TFormValues
  ) => VariablesOf<TDocumentNode>['input']
}

export type Props<
  TFormValues extends Dictionary,
  TDocumentNode extends TypedDocumentNodeWithInputVariables = TypedDocumentNodeWithInputVariables
> = BaseProps<TFormValues> &
  StrictUnion<
    | PropsWithSubmitHandler<TFormValues>
    | PropsWithMutationObject<TFormValues, TDocumentNode>
  >

const ModalActionForm = memo(
  <
    TFormValues extends Dictionary,
    TDocumentNode extends TypedDocumentNodeWithInputVariables = TypedDocumentNodeWithInputVariables
  >({
    children,
    loading = false,
    initialLoading = false,
    submitText = 'Submit',
    cancelText = 'Cancel',
    title,
    variant = 'positive',
    initialValues,
    testIds,
    onClose,
    mutation,
    mutationLoading,
    adjustFormValues,
    onSubmit
  }: BaseProps<TFormValues> &
    StrictUnion<
      | PropsWithSubmitHandler<TFormValues>
      | PropsWithMutationObject<TFormValues, TDocumentNode>
    >) => {
    if (mutation) {
      return (
        <MutationHandlerWrapper<TFormValues, TDocumentNode>
          adjustFormValues={adjustFormValues}
          mutation={mutation}
          onClose={onClose}
        >
          {mutationHandlerData => (
            <ActionFormContent<TFormValues>
              title={title}
              variant={variant}
              initialLoading={initialLoading}
              loading={loading}
              mutationLoading={mutationHandlerData.mutationLoading}
              initialValues={initialValues}
              submitText={submitText}
              cancelText={cancelText}
              onSubmit={mutationHandlerData.onSubmit}
              onClose={onClose}
              testIds={testIds}
            >
              {children}
            </ActionFormContent>
          )}
        </MutationHandlerWrapper>
      )
    }

    if (onSubmit) {
      return (
        <ActionFormContent<TFormValues>
          title={title}
          variant={variant}
          initialLoading={initialLoading}
          loading={loading}
          mutationLoading={mutationLoading}
          initialValues={initialValues}
          submitText={submitText}
          cancelText={cancelText}
          onSubmit={onSubmit}
          onClose={onClose}
          testIds={testIds}
        >
          {children}
        </ActionFormContent>
      )
    }

    return null
  },
  arePropsEqual
)

export default ModalActionForm
