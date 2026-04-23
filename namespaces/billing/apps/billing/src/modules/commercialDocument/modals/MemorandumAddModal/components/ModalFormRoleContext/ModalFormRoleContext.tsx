import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@toptal/picasso'
import { AddMemorandumToRoleInput } from '@staff-portal/graphql/staff'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { MemorandumAddModalFormContext } from '../../utils/types'
import { useSetAddMemorandumToRoleMutation } from '../../../../data'
import { canAffectCommissionRevenue } from '../../utils'

const addMemorandumMutationName = 'addMemorandumToRole'

const displayName = 'MemorandumAddModalFormRoleContext'

const ModalFormRoleContext: MemorandumAddModalFormContext<AddMemorandumToRoleInput> =
  ({ children }) => {
    const { t: translate } = useTranslation('memorandum')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [addMemorandumMutation] = useSetAddMemorandumToRoleMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(addMemorandumMutationName),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.memorandumAdd,
        outboundEvent: { key: ApolloContextEvents.memorandumAdd },
        successMessage: translate('addModal.notification.roleSuccess')
      }),
      responseKey: addMemorandumMutationName,
      submit: addMemorandumMutation,
      adjustBeforeValidate: false,
      validate: values =>
        values.receiverId
          ? {}
          : {
              receiverId__fake: values.receiverId__fake
                ? translate('addModal.fields.receiver.errorInvalidSelection')
                : translate('addModal.fields.receiver.errorRequired')
            },
      adjustValues: values => {
        // todo: remove this adjustment as soon as Form.Autocomplete will support `id` instead of `search term` as value
        // see https://toptal-core.atlassian.net/browse/FX-1469
        const adjustedValues = { ...values }

        delete adjustedValues.receiverId__fake

        return adjustedValues
      }
    })

    const canAffectCommissions = canAffectCommissionRevenue({
      roleType: ''
    })

    const initialValues = {
      affectsCommissions: canAffectCommissions,
      notifyReceiver: true
    }

    return (
      <Container data-testid={displayName}>
        {children({
          document: undefined,
          loading: false,
          initialLoading: false,
          initialValues,
          handleOnSubmit,
          showReceiverField: true
        })}
      </Container>
    )
  }

ModalFormRoleContext.displayName = displayName

export default memo(ModalFormRoleContext)
