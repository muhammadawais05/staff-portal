import React from 'react'
import { Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { isOperationEnabled } from '@staff-portal/operations'

import VoteForTalentPortfolioButton from '../VoteForTalentPortfolioButton'
import { GetTalentPortfolioQuery } from '../../data/get-talent-portfolio'
import { TalentPortfolioVoteFragment } from '../../data/talent-portfolio-fragment'
import TalentPortfolioVoteSummary from '../TalentPortfolioVoteSummary'
import TalentPortfolioDescription from '../TalentPortfolioDescription'
import { sortPortfoliosByDate } from './utils'

type Props = {
  portfolioData?: GetTalentPortfolioQuery['node']
  specializationApplicationId?: string
}

const checkIfUserHasNotVoted = (
  userId: string,
  votes: TalentPortfolioVoteFragment[]
) => votes.some(vote => vote.voter.id === userId && vote.vote === null)

const TalentPortfolioField = ({
  portfolioData,
  specializationApplicationId
}: Props) => {
  const user = useGetCurrentUser()

  if (!portfolioData?.portfolio) {
    return null
  }

  const { id, fullName, portfolio } = portfolioData

  const portfolios = portfolio?.files.nodes

  if (!portfolios || !portfolios.length) {
    return <>{NO_VALUE}</>
  }

  return (
    <Container data-testid='portfolio-field'>
      {[...portfolios].sort(sortPortfoliosByDate).map(portfolioItem => {
        const votes = portfolioItem?.votes?.nodes || []
        const operation = portfolioItem.operations.voteForTalentPortfolioFile
        const isVoteEnabled =
          isOperationEnabled(operation) &&
          checkIfUserHasNotVoted(user?.id || '', votes)

        return (
          <TalentPortfolioDescription
            file={portfolioItem}
            key={portfolioItem.id}
          >
            {isVoteEnabled ? (
              <VoteForTalentPortfolioButton
                talentId={id}
                talentName={fullName}
                portfolioFileId={portfolioItem.id}
                specializationApplicationId={specializationApplicationId}
                operation={operation}
              />
            ) : (
              <TalentPortfolioVoteSummary votes={votes} />
            )}
          </TalentPortfolioDescription>
        )
      })}
    </Container>
  )
}

export default TalentPortfolioField
