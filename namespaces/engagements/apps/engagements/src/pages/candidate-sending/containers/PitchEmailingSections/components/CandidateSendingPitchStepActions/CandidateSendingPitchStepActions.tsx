import { useGetCurrentUser } from '@staff-portal/current-user'
import { useForm } from '@toptal/picasso-forms'
import React from 'react'

import CandidateSendingDraftButton from '../CandidateSendingDraftButton'
import CandidateSendingPendingApprovalButton from '../CandidateSendingPendingApprovalButton'
import CandidateSendingSendButton from '../CandidateSendingSendButton'

export interface Props {
  draftStakeholderId?: string | null
  engagementId?: string | null
  hasPendingAssignment: boolean
  talentType?: string | null
  toptalProjects?: boolean | null
  enterprise?: boolean | null
}

const CandidateSendingPitchStepActions = ({
  draftStakeholderId,
  engagementId,
  hasPendingAssignment,
  talentType,
  toptalProjects,
  enterprise
}: Props) => {
  const { submit } = useForm()
  const currentUser = useGetCurrentUser()
  const isCurrentUserDraftStakeholder = currentUser?.id === draftStakeholderId

  const showAdditionalButtons = !!toptalProjects || !!enterprise

  const handleSubmit = () => {
    submit()
  }

  return (
    <>
      {showAdditionalButtons && (
        <>
          <CandidateSendingDraftButton
            engagementId={engagementId}
            onClick={handleSubmit}
          />

          {!isCurrentUserDraftStakeholder && (
            <CandidateSendingPendingApprovalButton
              engagementId={engagementId}
              onClick={handleSubmit}
            />
          )}
        </>
      )}

      <CandidateSendingSendButton
        hasPendingAssignment={hasPendingAssignment}
        talentType={talentType}
        onClick={handleSubmit}
      />
    </>
  )
}

export default CandidateSendingPitchStepActions
