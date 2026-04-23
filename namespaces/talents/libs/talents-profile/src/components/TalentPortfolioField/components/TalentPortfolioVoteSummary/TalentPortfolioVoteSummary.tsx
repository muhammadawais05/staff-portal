import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { LazyTooltip } from '@staff-portal/ui'
import { lazy } from '@staff-portal/utils'

import { TalentPortfolioVoteFragment } from '../../data/talent-portfolio-fragment'
import * as S from './styles'

type TalentPortfolioVoteSummaryProps = {
  votes: TalentPortfolioVoteFragment[]
}

type VoteProps = {
  vote: TalentPortfolioVoteFragment
  votePosition: number
}

const TooltipContent = lazy(
  () => import('../TalentPortfolioSummaryTooltipContent')
)

const Vote = ({ vote, votePosition }: VoteProps) => {
  const voteTestId = `vote-${votePosition + 1}`

  if (!vote || vote.vote === null) {
    return <span data-testid={voteTestId}>-</span>
  }

  const tooltipContent = (
    <TooltipContent
      voterName={vote.voter.fullName}
      voterComment={vote.comment}
    />
  )

  return (
    <LazyTooltip content={tooltipContent}>
      <Typography
        size='medium'
        weight='semibold'
        data-testid={voteTestId}
        underline='dashed'
        css={S.vote}
      >
        {vote.vote ? 'Yes' : 'No'}
      </Typography>
    </LazyTooltip>
  )
}

const TalentPortfolioVoteSummary = ({
  votes
}: TalentPortfolioVoteSummaryProps) => {
  if (!votes.length) {
    return null
  }

  const voteList = [votes[0], votes[1], votes[2]]
  const separator = (
    <Container as='span' left={0.25} right={0.25}>
      /
    </Container>
  )

  return (
    <Container as='span' data-testid='vote-summary'>
      <Container flex>
        {voteList.map((vote, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Container flex inline key={index} alignItems='center'>
            <Vote
              vote={vote}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              votePosition={index}
            />
            {index < 2 ? separator : null}
          </Container>
        ))}
      </Container>
    </Container>
  )
}

export default TalentPortfolioVoteSummary
