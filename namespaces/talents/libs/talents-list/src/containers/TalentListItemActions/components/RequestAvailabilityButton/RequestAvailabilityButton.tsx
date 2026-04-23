import React, { useMemo } from 'react'
import { Container, Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useRequestAvailabilityModal } from '@staff-portal/talents'

interface Props {
  talentId: string
  createTalentAvailabilityRequestOperation?: OperationType
  jobId?: string
  clientId?: string
  clientName?: string
}

export const RequestAvailabilityButton = ({
  talentId,
  createTalentAvailabilityRequestOperation,
  jobId,
  clientId,
  clientName
}: Props) => {
  const initialJobData = useMemo(() => {
    if (!jobId || !clientId || !clientName) {
      return
    }

    return { jobId, client: { id: clientId, fullName: clientName } }
  }, [jobId, clientId, clientName])
  const { showModal } = useRequestAvailabilityModal(talentId, initialJobData)

  return (
    <Operation
      operation={createTalentAvailabilityRequestOperation}
      render={disabled => (
        <Container left='small'>
          <Button
            size='small'
            variant='secondary'
            data-testid='request-availability-button'
            disabled={disabled}
            onClick={showModal}
          >
            Request Availability
          </Button>
        </Container>
      )}
    />
  )
}

export default RequestAvailabilityButton
