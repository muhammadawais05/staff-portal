import React from 'react'
import { Container, Typography } from '@toptal/picasso'

type Props = {
  temporaryRecruiterFullName: string
  primaryRecruiterFullName: string
}

const MatcherFieldTooltipContent = ({
  primaryRecruiterFullName,
  temporaryRecruiterFullName
}: Props) => (
  <Container>
    <Typography
      color='inherit'
      size='medium'
      data-testid='MatcherFieldTooltipContent-temporaryRecruiterFullNameprimaryRecruiterFullName'
    >{`Temporary Recruiter: ${temporaryRecruiterFullName}`}</Typography>
    <Typography
      color='inherit'
      size='medium'
      data-testid='MatcherFieldTooltipContent-primaryRecruiterFullName'
    >{`Primary Recruiter: ${primaryRecruiterFullName} (On vacation)`}</Typography>
  </Container>
)

export default MatcherFieldTooltipContent
