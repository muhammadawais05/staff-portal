import { ClientTransferRoleRequestFragment } from '../data'
import { getTransferRequestLabel } from './get-transfer-request-label'

export const getTransferRequestItems = (
  transferRequest: ClientTransferRoleRequestFragment
) => {
  const { requester, requestedTransfer, comment, relationship } =
    transferRequest

  if (!requester || !requestedTransfer || !relationship) {
    return []
  }

  return [
    [
      {
        label: `Current ${getTransferRequestLabel(relationship)}`,
        value: requester.fullName
      },
      {
        label: `New ${getTransferRequestLabel(relationship)}`,
        value: requestedTransfer.fullName
      }
    ],
    {
      label: 'Comment',
      value: comment
    }
  ]
}
