import React, { useCallback } from 'react'
import { SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal } from '@staff-portal/modals-service'
import { useNavigate, useLocation } from '@staff-portal/navigation'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import {
  GetLazyOperationVariables,
  isOperationHidden
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import { CallbackRequest } from '@staff-portal/graphql/staff'

import ClaimCallRequestModalContent from './components/ClaimCallRequestModalContent'
import { useGetLazyCallRequest } from '../../data/get-call-request'
import {
  useClaimCallRequest,
  ClaimCallbackRequestMutation
} from './data/claim-call-request'
import {
  useClaimCallRequestWithClient,
  ClaimCallbackRequestWithClientMutation
} from './data/claim-call-request-with-client'
import { useGetClaimCallRequest } from './data/get-claim-call-request'

type ClaimResult =
  | ClaimCallbackRequestMutation['claimCallbackRequest']
  | ClaimCallbackRequestWithClientMutation['claimCallbackRequestWithClient']

export interface Props {
  callRequestId: string
  hideModal: () => void
}

const ClaimCallRequestModal = ({ hideModal, callRequestId }: Props) => {
  const location = useLocation()
  const { showError } = useNotifications()
  const navigate = useNavigate()
  const { data: callRequest, loading: callRequestLoading } =
    useGetClaimCallRequest(callRequestId)

  const [refetchCallRequest] = useGetLazyCallRequest(callRequestId)
  const handleClaimResult = useCallback(
    (claimResult: ClaimResult) => {
      if (claimResult?.success) {
        const clientUrl = claimResult.callbackRequest?.client?.webResource?.url

        if (clientUrl) {
          if (location.pathname === clientUrl) {
            refetchCallRequest()

            return
          }

          navigate(clientUrl)
        }
      } else {
        showError('Invalid request, the Call Request has not been claimed.')
      }
    },
    [location.pathname, refetchCallRequest, showError, navigate]
  )

  const [claimCallRequest, { loading: claimCallRequestLoading }] =
    useClaimCallRequest({
      onCompleted: response => {
        if (response.claimCallbackRequest?.errors.length) {
          return showError(
            concatMutationErrors(response.claimCallbackRequest?.errors)
          )
        }

        handleClaimResult(response.claimCallbackRequest)
      },
      onError: () =>
        showError('An error occurred, the Call Request has not been claimed.')
    })
  const [
    claimCallRequestAndClient,
    { loading: claimCallRequestAndClientLoading }
  ] = useClaimCallRequestWithClient({
    onCompleted: response => {
      if (response.claimCallbackRequestWithClient?.errors.length) {
        return showError(
          concatMutationErrors(response.claimCallbackRequestWithClient?.errors)
        )
      }

      handleClaimResult(response.claimCallbackRequestWithClient)
    },
    onError: () =>
      showError(
        'An error occurred, the Call Request and the Company have not been claimed.'
      )
  })

  const hasNoClient = isOperationHidden(
    callRequest?.operations.claimCallbackRequestWithClient
  )

  const isLoading =
    claimCallRequestLoading ||
    claimCallRequestAndClientLoading ||
    callRequestLoading

  const operationName: keyof CallbackRequest['operations'] = hasNoClient
    ? 'claimCallbackRequest'
    : 'claimCallbackRequestWithClient'

  const operationVariables: GetLazyOperationVariables | undefined = callRequest
    ? {
        nodeId: callRequest.id,
        nodeType: NodeType.CALLBACK_REQUEST,
        operationName
      }
    : undefined

  const handleClaim = hasNoClient ? claimCallRequest : claimCallRequestAndClient

  return (
    <Modal
      onClose={hideModal}
      open
      defaultTitle={<SkeletonLoader.Header />}
      operationVariables={operationVariables}
    >
      <ClaimCallRequestModalContent
        callRequest={callRequest}
        hideModal={hideModal}
        isClientClaimed={hasNoClient}
        loading={isLoading}
        onClaimCallRequest={handleClaim}
      />
    </Modal>
  )
}

export default ClaimCallRequestModal
