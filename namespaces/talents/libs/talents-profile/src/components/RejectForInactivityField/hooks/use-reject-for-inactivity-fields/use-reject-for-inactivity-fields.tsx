import React from 'react'
import { Scalars, StepStatus } from '@staff-portal/graphql/staff'
import { DetailedListItem } from '@staff-portal/ui'

import { TalentRejectForInactivityFragment } from '../../data/talent-reject-for-inactivity-fragment/talent-reject-for-inactivity-fragment.staff.gql.types'
import {
  hasOngoingActivation,
  hasOngoingScreening,
  INACTIVITY_DEADLINE_LABEL_MAP
} from '../../utils'
import RejectForInactivityField from '../../RejectForInactivityField'
import { Deadline } from '../../types'
import { ActivationTypes } from '../../config'

export type Props = {
  rejectForInactivityData?: TalentRejectForInactivityFragment | null
  timeZone?: string
  talentId: string
}

const DEFAULT_LABEL = 'Reject for inactivity'

const generateFields = (
  deadlines: Deadline[],
  talentId: string,
  timeZone?: string
): DetailedListItem[] =>
  deadlines.map(deadline => ({
    label: deadline.label,
    value: (
      <RejectForInactivityField
        deadline={deadline}
        talentId={talentId}
        timeZone={timeZone}
      />
    )
  }))

const generateActivationDeadlines = (
  data: TalentRejectForInactivityFragment,
  talentId: string,
  ongoingActivation: boolean
): Deadline[] => {
  if (!ongoingActivation) {
    return []
  }

  const currentActivationStep = data.activation?.steps.nodes.filter(
    step => step.status === StepStatus.PENDING_APPLICANT_ACTION
  )[0]

  return [
    {
      id: currentActivationStep?.id || '',
      // TODO: use helper to convert Scalars['Date'] to Scalars['Time']
      date: currentActivationStep?.deadlineAt as Scalars['Time'],
      operation: data.operations.changeTalentActivationDeadline,
      label: DEFAULT_LABEL,
      type: ActivationTypes.ACTIVATION
    }
  ]
}

const generateScreeningDeadlines = (
  data: TalentRejectForInactivityFragment,
  ongoingScreening: boolean
): Deadline[] => {
  if (!ongoingScreening) {
    return []
  }

  const currentInactivityDeadlines = data.inactivityRejectionDeadlines?.nodes

  if (!currentInactivityDeadlines?.length) {
    return [{ label: DEFAULT_LABEL } as Deadline]
  }

  return currentInactivityDeadlines?.map(deadline => ({
    id: deadline.id,
    // TODO: use helper to convert Scalars['Date'] to Scalars['Time']
    date: deadline.date as Scalars['Time'],
    operation: deadline.operations.updateInactivityRejectionDeadline,
    label: `${DEFAULT_LABEL} (${
      INACTIVITY_DEADLINE_LABEL_MAP[deadline.identifier]
    })`,
    type: ActivationTypes.SCREENING
  }))
}

export const generateDeadlines = ({
  rejectForInactivityData,
  talentId
}: Props) => {
  if (!rejectForInactivityData) {
    return null
  }

  const {
    activation,
    cumulativeStatus,
    specializationApplications,
    ofacStatus
  } = rejectForInactivityData

  const ongoingActivation = hasOngoingActivation(activation)

  const ongoingScreening = hasOngoingScreening(
    cumulativeStatus,
    specializationApplications,
    ofacStatus
  )

  if (ongoingActivation) {
    return generateActivationDeadlines(
      rejectForInactivityData,
      talentId,
      ongoingActivation
    )
  }

  return generateScreeningDeadlines(rejectForInactivityData, ongoingScreening)
}

export const useRejectForInactivityFields = ({
  rejectForInactivityData,
  talentId,
  timeZone
}: Props) => {
  const deadlines = generateDeadlines({ rejectForInactivityData, talentId })

  return deadlines ? generateFields(deadlines, talentId, timeZone) : []
}
