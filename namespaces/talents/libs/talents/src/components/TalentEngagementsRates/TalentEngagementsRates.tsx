import React from 'react'
import {
  Container,
  QuestionMark16,
  Tooltip,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'

interface Props {
  acceptedInterviewsNumber: number
  approvedTrialsNumber: number
  interviewsNumber: number
  successRate: number
  trialsNumber: number
}

const TalentEngagementsRates = ({
  acceptedInterviewsNumber,
  approvedTrialsNumber,
  interviewsNumber,
  successRate,
  trialsNumber
}: Props) => {
  if (!interviewsNumber) {
    return (
      <Container
        as='span'
        flex
        alignItems='center'
        data-testid='talent-engagement-rates'
      >
        <TypographyOverflow as='span' weight='semibold' color='inherit'>
          Never interviewed
        </TypographyOverflow>
      </Container>
    )
  }

  return (
    <Container
      as='span'
      flex
      alignItems='center'
      data-testid='talent-engagement-rates'
    >
      <TypographyOverflow as='span' weight='semibold' color='inherit'>
        {`${successRate}% (${approvedTrialsNumber} / ${trialsNumber} / ${acceptedInterviewsNumber} / ${interviewsNumber})`}
      </TypographyOverflow>

      <Tooltip
        content={
          <Typography>
            <Typography as='span' weight='semibold'>
              Success rate
            </Typography>
            : {successRate}% (number of hires to total interviews)
            <br />
            <Typography as='span' weight='semibold'>
              Number of hires
            </Typography>
            : {approvedTrialsNumber}
            <br />
            <Typography as='span' weight='semibold'>
              Number of engagements
            </Typography>
            : {trialsNumber}
            <br />
            <Typography as='span' weight='semibold'>
              Accepted interviews
            </Typography>
            : {acceptedInterviewsNumber}
            <br />
            <Typography as='span' weight='semibold'>
              Total interviews
            </Typography>
            : {interviewsNumber}
          </Typography>
        }
        interactive
      >
        <Container as='span' left='xsmall' flex>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default TalentEngagementsRates
