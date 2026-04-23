import React from 'react'
import { Typography, Container, Alert } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { getTasksPath } from '@staff-portal/routes'

type Props = {
  fullName?: string | null
  hasPendingTasks?: boolean | null
  staffId: string
}

const DeleteStaffModalContent = ({
  fullName,
  hasPendingTasks,
  staffId
}: Props) => (
  <Container bottom='small'>
    {!!hasPendingTasks && (
      <Container bottom='small' data-testid='delete-staff-text-alert'>
        <Alert>
          <Container>
            <Typography inline as='span' weight='semibold'>
              {fullName}
            </Typography>{' '}
            has pending tasks.
          </Container>
          <Container>
            Please complete or reassign all{' '}
            <Link
              href={getTasksPath({
                performerId: decodeEntityId(staffId).id
              })}
            >
              pending tasks.
            </Link>
          </Container>
        </Alert>
      </Container>
    )}
    <Typography size='medium' data-testid='delete-staff-text-message'>
      Are you sure you want to delete the Staff account for{' '}
      <Typography inline as='span' weight='semibold'>
        {fullName}
      </Typography>
      ?
    </Typography>
  </Container>
)

export default DeleteStaffModalContent
