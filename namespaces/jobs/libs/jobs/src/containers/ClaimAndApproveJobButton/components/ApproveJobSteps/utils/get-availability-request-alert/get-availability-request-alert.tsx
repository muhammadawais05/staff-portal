import { Container, Typography } from '@toptal/picasso'
import React from 'react'

const wrapperStyles = `
  border-radius: 0.5rem;
`

export const getAvailabilityRequestAlert = (
  numberLimit?: number,
  hoursLimit?: number
) => (
  <Container variant='yellow' padded='small' bottom='small' css={wrapperStyles}>
    <Typography size='medium' color='black'>
      You can only send{' '}
      <Typography as='span' weight='semibold' size='medium' color='black'>
        {numberLimit}
      </Typography>{' '}
      availability requests for this job within the first{' '}
      <Typography as='span' weight='semibold' size='medium' color='black'>
        {hoursLimit} hours
      </Typography>{' '}
      after claiming. After that, there are no restrictions. Please ensure the
      job description and required skills are well-prepared to attract talent.
    </Typography>
  </Container>
)
