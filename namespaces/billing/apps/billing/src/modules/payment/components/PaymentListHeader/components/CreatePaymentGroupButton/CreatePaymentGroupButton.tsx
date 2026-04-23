import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { FetchResult } from '@apollo/client'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { CreatePaymentGroupInput } from '@staff-portal/graphql/staff'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  decodeRawIdAndType,
  getMessagesFromErrors,
  submitMutation
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import { normalizeSubjectRole } from '@staff-portal/billing/src/utils/role'
import { navigateExternallyTo } from '@staff-portal/navigation'

import {
  SetCreatePaymentGroupMutation,
  useSetCreatePaymentGroupMutation
} from '../../data/setCreatePaymentGroup.graphql.types'
import { usePaymentListContext } from '../../../../context/PaymentListContext'

const displayName = 'CreatePaymentGroupButton'

interface Props {
  operation?: OperationItemFragment
}

const CreatePaymentGroupButton: FC<Props> = memo<Props>(({ operation }) => {
  const { t: translate } = useTranslation('paymentList')
  const {
    handleOnCloseConfirmation,
    handleOnOpenConfirmation,
    handleOnSetConfirmation
  } = useConfirmations()
  const {
    urlValues,
    list: { data },
    filter
  } = usePaymentListContext()
  const [setCreatePaymentGroupMutation] = useSetCreatePaymentGroupMutation()
  const { showSuccess, showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  if (!operation) {
    return null
  }

  const responseKey = 'createPaymentGroup'
  const payee = urlValues?.badges?.payee_ids?.[0]?.label ?? ''
  const subject = data?.groups?.[0]?.payments[0].subjectObject
  const role = normalizeSubjectRole(subject)

  const showCreatePaymentGroupModal = () =>
    handleOnOpenConfirmation({
      actionTitle: translate('modals.createPaymentGroup.confirmButtonText'),
      description: translate('modals.createPaymentGroup.description'),
      notice: translate('modals.createPaymentGroup.intro', { payee, role }),
      onSuccess: () => {
        handleOnSetConfirmation({
          actionIsDisabled: true,
          actionIsLoading: true
        })

        return submitMutation({
          handleSuccess: (
            input: CreatePaymentGroupInput,
            response: SetCreatePaymentGroupMutation['createPaymentGroup']
          ) => {
            const { id } = decodeRawIdAndType(response?.paymentGroup?.id)

            handleOnCloseConfirmation()
            emitMessage(ApolloContextEvents.paymentCreateGroup)
            showSuccess(
              translate('modals.createPaymentGroup.notification.success', {
                id
              })
            )

            navigateExternallyTo(`/payment_groups/${id}`)
          },
          handleError: (errors: FetchResult<SetCreatePaymentGroupMutation>) => {
            handleOnSetConfirmation({
              actionIsDisabled: false,
              actionIsLoading: false
            })
            showError(
              getMessagesFromErrors({
                errors: errors?.data?.[responseKey]?.errors || []
              })
            )
          },
          input: { filter },
          responseKey,
          submit: setCreatePaymentGroupMutation
        })
      },
      title: translate('modals.createPaymentGroup.title')
    })

  return (
    <OperationWrapper
      operation={operation}
      enabledText={translate('header.actions.createPaymentGroup.tooltip')}
    >
      <Button
        data-testid={displayName}
        onClick={showCreatePaymentGroupModal}
        size='small'
      >
        {translate('header.actions.createPaymentGroup.label')}
      </Button>
    </OperationWrapper>
  )
})

CreatePaymentGroupButton.displayName = displayName

export default CreatePaymentGroupButton
