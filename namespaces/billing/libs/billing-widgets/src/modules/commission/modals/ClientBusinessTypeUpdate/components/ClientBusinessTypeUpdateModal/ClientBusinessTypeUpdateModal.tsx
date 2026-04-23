import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { snakeCase } from 'lodash-es'
import { BusinessTypes } from '@staff-portal/graphql/staff'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import {
  useGetClientBusinessTypeUpdateQuery,
  useSetUpdateClientBusinessTypeMutation
} from '../../data'
import ClientBusinessTypeUpdateModalForm from '../ClientBusinessTypeUpdateModalForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'ClientBusinessTypeUpdateModal'
const responseKey = 'updateClientBusinessType'

const ClientBusinessTypeUpdateModal: FC<Props> = memo(
  ({ options: { nodeId, nodeType } }) => {
    const { t: translate } = useTranslation('commission')
    const { handleOnSuccess } = useFormSubmission()

    const [setUpdateClientCommitmentMutation] =
      useSetUpdateClientBusinessTypeMutation()
    const encodedId = encodeId({ id: nodeId, type: nodeType })
    const { data, loading, initialLoading } =
      useGetClientBusinessTypeUpdateQuery({
        variables: {
          nodeId: encodedId
        }
      })
    const title = translate('modals.clientBusinessTypeUpdate.title') as string
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        successMessage: translate(
          'modals.clientBusinessTypeUpdate.notification.success'
        )
      }),
      responseKey,
      submit: setUpdateClientCommitmentMutation,
      variables: {
        clientId: encodedId
      }
    })

    // TODO: Possible issue, businessType nullable
    const initialValues = {
      businessType:
        BusinessTypes[
          snakeCase(
            data?.node?.businessType as string
          ).toUpperCase() as keyof typeof BusinessTypes
        ]
    }

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <ClientBusinessTypeUpdateModalForm
          title={title}
          initialValues={initialValues}
          handleOnSubmit={handleOnSubmit}
        />
      </ContentLoader>
    )
  }
)

ClientBusinessTypeUpdateModal.displayName = displayName

export default ClientBusinessTypeUpdateModal
