import React from 'react'
import { Typography, Container } from '@toptal/picasso'

type Props = {
  fullName?: string | null
}

const RestoreStaffModalContent = ({ fullName }: Props) => (
  <Container bottom='small'>
    <Typography size='medium' data-testid='restore-staff-text-message'>
      Are you sure you want to restore the Staff account for{' '}
      <Typography inline as='span' weight='semibold'>
        {fullName}
      </Typography>
      ?
    </Typography>
  </Container>
)

export default RestoreStaffModalContent
