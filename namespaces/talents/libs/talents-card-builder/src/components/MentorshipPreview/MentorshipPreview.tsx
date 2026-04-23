import { Container, Typography } from '@toptal/picasso'
import React from 'react'

import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'

interface Props {
  fullName: string
}

const MentorshipPreview = ({ fullName }: Props) => (
  <HighlightItemPreview title='Toptal Mentor'>
    <Container top='xsmall'>
      <Typography size='medium' color='dark-grey'>
        {fullName} is a mentor in the Toptal Global Mentor's Program.
      </Typography>
    </Container>
  </HighlightItemPreview>
)

export default MentorshipPreview
