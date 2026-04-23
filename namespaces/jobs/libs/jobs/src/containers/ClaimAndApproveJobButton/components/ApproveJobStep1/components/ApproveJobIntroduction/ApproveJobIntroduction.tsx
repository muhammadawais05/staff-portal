import React from 'react'
import { Container, Typography } from '@toptal/picasso'

export interface Props {
  jobDepositCanBeIssued?: boolean | null
  inTalentMatchers: boolean
}

const ApproveJobIntroduction = ({
  jobDepositCanBeIssued,
  inTalentMatchers
}: Props) => {
  if (!jobDepositCanBeIssued) {
    return null
  }

  return (
    <Container bottom='small'>
      <Typography size='medium'>
        You are about to claim this job which will generate an invoice for the
        client in the amount you specify below. Are you sure you want to do
        this?
      </Typography>

      <Container top='small'>
        <Typography size='medium'>
          {inTalentMatchers ? (
            <>
              By doing so, you will be responsible for screening and sending
              freelancers and also processing the freelancer applications until
              this job has been completed
            </>
          ) : (
            <>
              Please assign this job to a recruiter. He or she will be
              responsible for screening freelancers for the position.
            </>
          )}
        </Typography>
      </Container>
    </Container>
  )
}

export default ApproveJobIntroduction
