import React from 'react'
import { Button, Container, Typography, Info16, Tooltip } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import PresalesEngagementModal from '../PresalesEngagementModal'
import { JobDetailsInformationFragment } from '../JobDetailsInformation/data/get-job-details-information/get-job-details-information.staff.gql.types'

type Props = Pick<
  JobDetailsInformationFragment,
  'presalesEngagement' | 'presalesEngagementComment'
> & {
  jobId: string
  operation?: OperationType
}

const PresalesEngagementField = ({
  jobId,
  presalesEngagement,
  presalesEngagementComment,
  operation
}: Props) => {
  const { showModal } = useModal(PresalesEngagementModal, {
    jobId,
    presalesEngagement,
    presalesEngagementComment
  })

  return (
    <Container justifyContent='space-between' flex>
      {presalesEngagement ? (
        <Container as='span' alignItems='center' flex>
          <Typography size='medium'>Yes</Typography>
          <Tooltip interactive content={presalesEngagementComment}>
            <Container as='span' left='xsmall' flex>
              <Info16 />
            </Container>
          </Tooltip>
        </Container>
      ) : (
        <Typography size='medium'>No</Typography>
      )}

      <Operation
        operation={operation}
        render={disabled => (
          <Container left='small'>
            <Button
              onClick={showModal}
              disabled={disabled}
              variant='secondary'
              size='small'
              aria-label='Edit'
              data-testid='edit-button'
            >
              Edit
            </Button>
          </Container>
        )}
      />
    </Container>
  )
}

export default PresalesEngagementField
