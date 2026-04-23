import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { Button, Container, Link as PicassoLink } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { getEditSourcingRequest } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { Operation } from '@staff-portal/operations'

export interface Props {
  updateSourcingRequestOperation?: OperationType
  sourcingRequestId?: string | null
}

const EditRequestButton = ({
  updateSourcingRequestOperation,
  sourcingRequestId
}: Props) => {
  if (!sourcingRequestId) {
    return null
  }

  return (
    <Operation
      operation={updateSourcingRequestOperation}
      render={disabled => (
        <Container left='small'>
          <Button
            as={Link as typeof PicassoLink}
            href={getEditSourcingRequest(decodeEntityId(sourcingRequestId).id)}
            disabled={disabled}
            size='small'
            variant='secondary'
            data-testid='edit-request-button'
          >
            Edit Request
          </Button>
        </Container>
      )}
    />
  )
}

export default EditRequestButton
