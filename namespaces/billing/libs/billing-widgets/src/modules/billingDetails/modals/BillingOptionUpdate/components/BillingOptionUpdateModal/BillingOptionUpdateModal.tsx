import React, { FC, memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import BillingOptionUpdateModalForm from '../BillingOptionUpdateModalForm'
import {
  useGetBillingOptionUpdateQuery,
  useSetUpdateBillingOptionMutation
} from '../../data'
import { getInitialValues } from '../../utils'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'clientId'>>
}

const displayName = 'BillingOptionUpdateModal'
const responseKey = 'updateBillingOption'

const BillingOptionUpdateModal: FC<Props> = memo(
  ({ options: { nodeId, clientId } }) => {
    const { t: translate } = useTranslation('billingDetails')
    const { handleOnSuccess } = useFormSubmission()
    const [setUpdateBillingOptionMutation] = useSetUpdateBillingOptionMutation()
    const {
      data: client,
      loading,
      initialLoading
    } = useGetBillingOptionUpdateQuery({
      variables: {
        nodeId: clientId
      }
    })
    const billingOption = useMemo(
      () =>
        client?.node?.billingOptions?.nodes.find(
          option => option.id === nodeId
        ),
      [client, nodeId]
    )
    const title = translate('modals.billingOptionUpdate.title')
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        apolloEvent: ApolloContextEvents.billingOptionUpdate,
        successMessage: translate(
          'modals.billingOptionUpdate.notification.success'
        )
      }),
      responseKey,
      submit: setUpdateBillingOptionMutation,
      variables: {
        billingOptionId: billingOption?.id
      }
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <BillingOptionUpdateModalForm
          handleOnSubmit={handleOnSubmit}
          billingMethod={billingOption?.billingMethod}
          initialValues={getInitialValues(billingOption)}
          title={title}
        />
      </ContentLoader>
    )
  }
)

BillingOptionUpdateModal.displayName = displayName

export default BillingOptionUpdateModal
