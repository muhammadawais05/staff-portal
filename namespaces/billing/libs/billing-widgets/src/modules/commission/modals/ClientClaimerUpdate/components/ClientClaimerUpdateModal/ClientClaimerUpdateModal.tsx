import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { UpdateClientClaimerInput } from '@staff-portal/graphql/staff'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

import {
  useGetClientClaimerUpdateQuery,
  useSetUpdateClientClaimerMutation
} from '../../data'
import ClientClaimerUpdateModalForm from '../ClientClaimerUpdateModalForm'
import { SetUpdateClientClaimerMutation } from '../../data/setUpdateClientClaimer.graphql.types'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'ClientClaimerUpdateModal'
const responseKey = 'updateClientClaimer'

const ClientClaimerUpdateModal: FC<Props> = memo(
  ({ options: { nodeId, nodeType } }) => {
    const { t: translate } = useTranslation('commission')
    const { handleOnOpenModal } = useModals()
    const { handleOnSuccess } = useFormSubmission()
    const [setUpdateClientClaimerMutation] = useSetUpdateClientClaimerMutation()
    const {
      data: { roles: { nodes: roles = [] } = {} } = {},
      loading,
      initialLoading
    } = useGetClientClaimerUpdateQuery()
    const title = translate('modals.clientClaimerUpdate.title')
    const clientId = encodeId({ id: nodeId, type: nodeType })
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: (
        input: UpdateClientClaimerInput,
        response: SetUpdateClientClaimerMutation['updateClientClaimer']
      ) => {
        handleOnSuccess({
          apolloEvent: ApolloContextEvents.clientUpdateClaimer,
          successMessage: translate(
            'modals.clientClaimerUpdate.notification.success'
          )
        })()

        if (response?.nextActionPerformable) {
          handleOnOpenModal(ModalKey.clientBusinessTypeUpdate, {
            nodeId,
            nodeType: 'client'
          })
        }
      },
      responseKey,
      submit: setUpdateClientClaimerMutation,
      variables: { clientId }
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ModalSkeleton title={title} />}
      >
        <ClientClaimerUpdateModalForm
          handleOnSubmit={handleOnSubmit}
          title={title}
          roles={roles}
        />
      </ContentLoader>
    )
  }
)

ClientClaimerUpdateModal.displayName = displayName

export default ClientClaimerUpdateModal
