import { Button, Container } from '@toptal/picasso'
import React from 'react'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationFragment } from '@staff-portal/operations'

import ResumeTalentModal from '../ResumeTalentModal'

export interface Props {
  talent: {
    id: string
    operations: {
      resumeTalent: OperationFragment
    }
  }
}

const ResumeTalentButton = ({
  talent: {
    id: talentId,
    operations: { resumeTalent }
  }
}: Props) => {
  const { showModal } = useModal(ResumeTalentModal, {
    talentId
  })

  return (
    <Operation
      operation={resumeTalent}
      render={disabled => (
        <Container left='xsmall'>
          <Button
            size='small'
            variant='secondary'
            disabled={disabled}
            onClick={showModal}
            data-testid='resume-talent-button'
          >
            Resume Application
          </Button>
        </Container>
      )}
    />
  )
}

export default ResumeTalentButton
