import React from 'react'
import { Container } from '@toptal/picasso'
import { DetailedListValueViewOptions } from '@staff-portal/ui'
import { StatusField, TalentInvestigation } from '@staff-portal/talents'

import { getSpecializationApplication } from './utils/get-specialization-application'
import { TalentStatusFragment } from './data/get-talent-status/get-talent-status.staff.gql.types'
import EditableRejectionReason from './components/EditableRejectionReason/EditableRejectionReason'

export interface Props {
  talentId: string
  investigations?: { nodes: TalentInvestigation[] } | null
  talentStatus?: TalentStatusFragment | null
  options?: DetailedListValueViewOptions
}

const StatusFieldWithRejectionReason = ({
  talentId,
  talentStatus,
  options,
  investigations
}: Props) => {
  if (!talentStatus) {
    return null
  }

  const { cumulativeStatus, specializationApplications, newcomer, topShield } =
    talentStatus
  const specialization = getSpecializationApplication(
    specializationApplications?.nodes || []
  )

  return (
    <Container>
      <StatusField
        cumulativeStatus={cumulativeStatus}
        investigations={investigations}
        newcomer={!!newcomer}
        topShield={topShield}
        options={options}
      />
      {specialization && (
        <EditableRejectionReason
          talentId={talentId}
          specializationApplication={specialization}
        />
      )}
    </Container>
  )
}

export default StatusFieldWithRejectionReason
