import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { AnyObject } from '@toptal/picasso-forms'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { getAdjustedValues, getAutocompleteValidation } from '../../utils'
import ChangeRoleReferrerModalForm from '../ChangeRoleReferrerModalForm'
import { useResetRoleReferrerMutation } from '../../data/setResetRoleReferrer.graphql.types'
import { useChangeRoleReferrerMutation } from '../../data/setChangeRoleReferrer.graphql.types'
import { useGetCommissionQuery } from '../../../../data/getCommission.graphql.types'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'ChangeRoleReferrerModal'
const changeResponseKey = 'changeRoleReferrer'
const resetResponseKey = 'resetRoleReferrer'

const ChangeRoleReferrerModal = ({ options: { nodeId, nodeType } }: Props) => {
  const roleOrClientId = encodeId({ id: nodeId, type: nodeType })
  const { t: translate } = useTranslation('commission')

  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [changeRoleReferrerMutation] = useChangeRoleReferrerMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [resetRoleReferrerMutation] = useResetRoleReferrerMutation({
    onRootLevelError: handleOnRootLevelError
  })

  const { data, loading, initialLoading } = useGetNode(useGetCommissionQuery)({
    nodeId: roleOrClientId
  })
  const roleHasReferrer = !!data?.referrer

  const handleOnSubmit = (values: AnyObject) => {
    if (!values.referrerId) {
      return handleSubmit({
        adjustValues: getAdjustedValues,
        handleError: handleOnSubmissionError(resetResponseKey),
        handleSuccess: handleOnSuccess({
          apolloEvent: ApolloContextEvents.changeRoleReferrer,
          successMessage: translate(
            'modals.changeRoleReferrer.notification.success'
          )
        }),
        responseKey: resetResponseKey,
        submit: resetRoleReferrerMutation,
        variables: { roleOrClientId },
        validate: getAutocompleteValidation(roleHasReferrer)
      })(values)
    }

    return handleSubmit({
      adjustValues: getAdjustedValues,
      handleError: handleOnSubmissionError(changeResponseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.changeRoleReferrer,
        successMessage: translate(
          'modals.changeRoleReferrer.notification.success'
        )
      }),
      responseKey: changeResponseKey,
      submit: changeRoleReferrerMutation,
      variables: { roleOrClientId }
    })(values)
  }

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('modals.changeRoleReferrer.title')} />
      }
    >
      <ChangeRoleReferrerModalForm
        handleOnSubmit={handleOnSubmit}
        canIssueSourcingCommission={data?.canIssueSourcingCommission}
        roleHasReferrer={roleHasReferrer}
      />
    </ContentLoader>
  )
}

ChangeRoleReferrerModal.displayName = displayName

export default memo(ChangeRoleReferrerModal)
