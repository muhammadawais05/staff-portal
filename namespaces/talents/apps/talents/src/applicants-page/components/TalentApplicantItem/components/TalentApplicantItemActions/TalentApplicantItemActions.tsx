import { Operation } from '@staff-portal/operations'
import { Button, Container } from '@toptal/picasso'
import React from 'react'
import { useModal } from '@staff-portal/modals-service'

import {
  PauseApplicationModal,
  RejectApplicationButton,
  RestoreApplicationButton,
  ResumeTalentButton
} from '../../../../../talent-page/components'
import { TalentApplicantItemFragment } from '../../data/get-talent-applicant-item'

export interface Props {
  talent: TalentApplicantItemFragment
}

const TalentApplicantItemActions = ({ talent }: Props) => {
  const { showModal: showPauseApplicationModal } = useModal(
    PauseApplicationModal,
    { talentId: talent?.id as string }
  )

  const { id: talentId, specializationApplications } = talent || {}
  const specializationApplication = specializationApplications?.nodes[0]

  return (
    <Container flex alignItems='flex-end' gap='xsmall'>
      {specializationApplication && (
        <RejectApplicationButton
          talentId={talentId}
          specializationApplicationId={specializationApplication.id}
          operation={
            specializationApplication.operations.rejectSpecializationApplication
          }
          variant='negative'
        />
      )}

      <Operation
        operation={talent.operations.pauseTalent}
        render={disabled => (
          <Button
            size='small'
            variant='secondary'
            disabled={disabled}
            onClick={showPauseApplicationModal}
            data-testid='pause-application-button-talent-applicants-page'
          >
            Pause Application
          </Button>
        )}
      />

      {talent.eligibleForAutomaticRestore && (
        <>
          <RestoreApplicationButton talent={talent} />
          <ResumeTalentButton talent={talent} />
        </>
      )}
    </Container>
  )
}

export default TalentApplicantItemActions
