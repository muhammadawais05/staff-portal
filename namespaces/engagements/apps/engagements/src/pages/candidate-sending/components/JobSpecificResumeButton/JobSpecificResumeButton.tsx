import React from 'react'
import { Button } from '@toptal/picasso'

export type Props = {
  resumeUrl: string
}

const JobSpecificResumeButton = ({ resumeUrl }: Props) => (
  <Button
    size='small'
    variant='secondary'
    href={resumeUrl}
    target='_blank'
    data-testid='job-specific-resume-button'
  >
    View Job-Specific Resume
  </Button>
)

export default JobSpecificResumeButton
