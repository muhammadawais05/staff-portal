import { Button, Container } from '@toptal/picasso'
import React from 'react'
import { Operation, OperationFragment } from '@staff-portal/operations'

import { useRestoreTalentActivationModal } from '../RestoreTalentActivationModal'
import { useResumeTalentApplicationModal } from '../ResumeTalentApplicationModal'

export interface Props {
  talent: {
    id: string
    operations: {
      restoreTalentActivation: OperationFragment
      resumeTalentApplication: OperationFragment
    }
  }
}

const RestoreApplicationButton = ({
  talent: {
    id: talentId,
    operations: { restoreTalentActivation, resumeTalentApplication }
  }
}: Props) => {
  const { showResumeTalentApplicationModal } = useResumeTalentApplicationModal({
    talentId
  })

  const { showModal: showRestoreTalentActivationModal } =
    useRestoreTalentActivationModal({
      talentId
    })

  return (
    <>
      <Operation
        operation={resumeTalentApplication}
        render={disabled => (
          <Container left='xsmall'>
            <Button
              size='small'
              variant='secondary'
              disabled={disabled}
              onClick={showResumeTalentApplicationModal}
              data-testid='resume-application-button'
            >
              Restore Application
            </Button>
          </Container>
        )}
      />

      <Operation
        operation={restoreTalentActivation}
        render={disabled => (
          <Container left='small'>
            <Button
              size='small'
              variant='secondary'
              disabled={disabled}
              onClick={showRestoreTalentActivationModal}
              data-testid='restore-application-button'
            >
              Restore Application
            </Button>
          </Container>
        )}
      />
    </>
  )
}

export default RestoreApplicationButton
