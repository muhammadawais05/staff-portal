import React from 'react'
import { Container } from '@toptal/picasso'
import { isOperationHidden, Operation } from '@staff-portal/operations'

import { CallRequestFragment } from '../../data/call-request-fragment'
import ClaimCallRequestButton from './components/ClaimCallRequestButton'
import RemoveCallRequestButton from './components/RemoveCallRequestButton'

export interface Props {
  data: CallRequestFragment
}

const CallRequestListItemActions = ({ data }: Props) => {
  const {
    id,
    name,
    status,
    operations: {
      removeCallbackRequest: removeCallbackRequestOperation,
      claimCallbackRequest: claimCallbackRequestOperation,
      claimCallbackRequestWithClient: claimCallbackRequestWithClientOperation
    },
    client
  } = data
  const isRemoved = status === 'removed'
  const isObscure = client === null
  const hasNoClient = isOperationHidden(claimCallbackRequestWithClientOperation)

  return (
    <Container flex justifyContent='flex-end' left='small'>
      <Operation
        operation={
          hasNoClient
            ? claimCallbackRequestOperation
            : claimCallbackRequestWithClientOperation
        }
        render={disabled => (
          <ClaimCallRequestButton callRequestId={id} disabled={disabled} />
        )}
      />

      {!isObscure && (
        <Operation
          operation={removeCallbackRequestOperation}
          hidden={isRemoved}
          render={disabled => (
            <Container left='xsmall'>
              <RemoveCallRequestButton
                callRequestId={id}
                callRequestName={name}
                disabled={disabled}
              />
            </Container>
          )}
        />
      )}
    </Container>
  )
}

export default CallRequestListItemActions
