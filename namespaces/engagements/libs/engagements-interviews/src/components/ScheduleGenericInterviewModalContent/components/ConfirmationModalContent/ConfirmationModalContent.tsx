import { Alert, Container, Typography } from '@toptal/picasso'
import React from 'react'

export interface Props {
  showClaimerWarning: boolean
}

const ConfirmationModalContent = ({ showClaimerWarning }: Props) => {
  return (
    <>
      {showClaimerWarning && (
        <Container
          bottom='xsmall'
          data-testid='ConfirmationModalContent-claimer-warning'
        >
          <Alert>
            This job is not claimed by you. The job claimer will receive
            interview feedback.
          </Alert>
        </Container>
      )}
      <Container
        top='medium'
        bottom='small'
        data-testid='ConfirmationModalContent-confirmation'
      >
        <Typography size='medium'>
          Are you sure you want to reschedule this interview?
        </Typography>
      </Container>
    </>
  )
}

export default ConfirmationModalContent
