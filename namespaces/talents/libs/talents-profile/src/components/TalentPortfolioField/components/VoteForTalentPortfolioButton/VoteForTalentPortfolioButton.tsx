import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import VoteForTalentPortfolioModal from '../VoteForTalentPortfolioModal'

export interface Props {
  talentId: string
  talentName: string
  portfolioFileId: string
  specializationApplicationId?: string
  operation: OperationType
}

const VoteForTalentPortfolioButton = ({
  talentId,
  talentName,
  portfolioFileId,
  specializationApplicationId,
  operation
}: Props) => {
  const { showModal } = useModal(VoteForTalentPortfolioModal, {
    talentId,
    talentName,
    portfolioFileId,
    specializationApplicationId
  })

  return (
    <Container as='span'>
      <Operation
        operation={operation}
        render={disabled => (
          <Button
            size='small'
            variant='secondary'
            onClick={showModal}
            disabled={disabled}
            data-testid='vote-button'
          >
            Vote
          </Button>
        )}
      />
    </Container>
  )
}

export default VoteForTalentPortfolioButton
