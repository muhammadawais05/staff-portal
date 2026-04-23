import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ApplyUnallocatedMemorandumsToCommercialDocumentInput,
  ApplyUnallocatedMemorandumsToCommercialDocumentPayload
} from '@staff-portal/graphql/staff'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import { UnallocatedMemorandumNodesFragment } from '../../../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import { useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation } from '../../data'
import adjustValues from './adjustValues'
import validator from './validator'
import ApplyUnallocatedMemorandumsForm from '../../../../components/ApplyUnallocatedMemorandumsForm'
import {
  ApplyUnallocatedMemorandumsFormValues,
  StepCompleted
} from '../ApplyUnallocatedMemorandums/ApplyUnallocatedMemorandums'

const displayName = 'ApplyUnallocatedMemorandumsContent'
const responseKey = 'applyUnallocatedMemorandumsToCommercialDocument'

interface CommercialDocument {
  documentNumber: number
  id: string
  subjectObject: {
    availablePrepaymentBalanceNullable?: string | null
    id: string
    unallocatedMemorandums: UnallocatedMemorandumNodesFragment
  }
}

interface ContentProps {
  commercialDocument: CommercialDocument
  isApplyMemosAndPayFlow?: boolean
  onStepCompleted?: StepCompleted
}

const ApplyUnallocatedMemorandumsContent: FC<ContentProps> = memo<ContentProps>(
  ({
    isApplyMemosAndPayFlow = false,
    commercialDocument: {
      id: nodeId,
      subjectObject: {
        availablePrepaymentBalanceNullable = '',
        unallocatedMemorandums
      }
    },
    onStepCompleted = noop
  }) => {
    const { t: translate } = useTranslation('commercialDocument')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [applyUnallocatedMemorandumsMutation] =
      useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation({
        onRootLevelError: handleOnRootLevelError
      })
    const { id, type } = decodeRawIdAndType(nodeId)

    const initialValues: ApplyUnallocatedMemorandumsFormValues = {
      applyPrepayments: false,
      creditMemorandums: [],
      debitMemorandums: [],
      commercialDocumentId: nodeId,
      memorandumIdsToAllocate: []
    }

    const handleSuccess = (
      mutationInput?: ApplyUnallocatedMemorandumsToCommercialDocumentInput,
      mutationResult?: ApplyUnallocatedMemorandumsToCommercialDocumentPayload
    ) => {
      handleOnSuccess({
        apolloEvent: ApolloContextEvents.commercialDocumentApplyMemos,
        // needed, otherwise the modal will be closed after the first step
        isModal: !isApplyMemosAndPayFlow,
        successMessage: translate('modals.applyMemos.notification.success', {
          type,
          id
        })
      })()

      if (isApplyMemosAndPayFlow) {
        onStepCompleted(mutationInput, mutationResult)
      }
    }

    return (
      <FinalForm
        initialValues={initialValues}
        keepDirtyOnReinitialize
        onSubmit={handleSubmit({
          adjustValues,
          handleError: handleOnSubmissionError(responseKey),
          handleSuccess,
          responseKey,
          submit: applyUnallocatedMemorandumsMutation,
          validate: validator
        })}
        render={(
          formProps: FormRenderProps<ApplyUnallocatedMemorandumsFormValues>
        ) => (
          <ApplyUnallocatedMemorandumsForm
            isApplyMemosAndPayFlow={isApplyMemosAndPayFlow}
            formProps={formProps}
            nodeId={nodeId}
            availablePrepaymentBalance={availablePrepaymentBalanceNullable}
            unallocatedMemorandums={unallocatedMemorandums?.nodes}
            onSkipToNextStep={onStepCompleted}
          />
        )}
      />
    )
  }
)

ApplyUnallocatedMemorandumsContent.displayName = displayName

export default ApplyUnallocatedMemorandumsContent
