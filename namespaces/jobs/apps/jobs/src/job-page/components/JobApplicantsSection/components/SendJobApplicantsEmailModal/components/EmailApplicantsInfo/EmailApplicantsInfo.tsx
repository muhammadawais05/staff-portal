import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import { EmailApplicantsApplicationFragment } from '../../data/get-email-applicants-recipient/get-email-applicants-recipient.staff.gql.types'

type Props = {
  applicants?: EmailApplicantsApplicationFragment[]
}

const EmailApplicantsInfo = ({ applicants }: Props) => {
  if (!applicants?.length) {
    return null
  }

  const emailApplicantsNames = applicants
    .map(applicant => applicant.talent.fullName)
    .join(', ')

  return (
    <Container bottom='medium' data-testid='email-applicants-info'>
      <Typography as='span' size='medium'>
        You are about to send email to the following candidates:{' '}
        <Typography inline weight='semibold' size='medium'>
          {emailApplicantsNames}.
        </Typography>
      </Typography>
    </Container>
  )
}

export default EmailApplicantsInfo
