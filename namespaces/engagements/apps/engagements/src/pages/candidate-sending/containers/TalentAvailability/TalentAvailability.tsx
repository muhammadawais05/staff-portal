import { getRoleTypeText } from '@staff-portal/facilities'
import { DetailedList } from '@staff-portal/ui'
import { Section } from '@toptal/picasso'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { AvailabilityStatus } from '@staff-portal/talents'
import { TalentAllocatedHours } from '@staff-portal/talents-workload'

import { CalendarAvailability } from '../../components'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../data/get-availability-step-talent-availability-data'
import getRequiredJobHoursVerbose from '../../utils/get-required-job-hours-verbose'

export interface Props {
  availabilityData: AvailabilityStepTalentAvailabilityDataFragment
}

const TalentAvailability = ({
  availabilityData: { talent, job, talentCalendarAvailability }
}: Props) => {
  if (!talent || !job) {
    return null
  }

  const {
    id: talentId,
    type,
    allocatedHours,
    roleTitle,
    allocatedHoursAvailability,
    availableHours,
    availableHoursIncludingEndingEngagements,
    allocatedHoursAvailabilityIncludingEndingEngagements,
    allocatedHoursConfirmedAt,
    endingEngagements,
    preliminarySearchSetting,
    associatedRoles,
    operations: {
      updateTalentAllocatedHours: updateTalentAllocatedHoursOperation
    }
  } = talent

  const { commitment, expectedWeeklyHours } = job

  const roleType = getRoleTypeText(type)
  const requiredJobHours = getRequiredJobHoursVerbose({
    commitment,
    expectedWeeklyHours
  })

  return (
    <Section
      variant='withHeaderBar'
      title={`${roleType} Availability`}
      data-testid='talent-availability'
    >
      <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10}>
        <DetailedList.Row>
          <DetailedList.Item label='Allocated hours'>
            <TalentAllocatedHours
              allocatedHours={allocatedHours}
              talentId={talentId}
              operation={updateTalentAllocatedHoursOperation}
            />
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Current availability'>
            <AvailabilityStatus
              hideAllocatedHours
              talentAvailability={{
                id: talentId,
                type,
                roleTitle,
                allocatedHoursAvailability,
                availableHours,
                availableHoursIncludingEndingEngagements,
                allocatedHours,
                allocatedHoursAvailabilityIncludingEndingEngagements,
                allocatedHoursConfirmedAt,
                endingEngagements,
                preliminarySearchSetting
              }}
              associatedRoles={associatedRoles?.nodes}
              mode='default'
            />
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Required for this job'>
            {requiredJobHours}
          </DetailedList.Item>
        </DetailedList.Row>

        {talentCalendarAvailability &&
          Boolean(talentCalendarAvailability?.length) && (
            <DetailedList.Row>
              <DetailedList.Item label='Calendar Availability'>
                <CalendarAvailability
                  talentCalendarAvailability={talentCalendarAvailability}
                />
              </DetailedList.Item>
            </DetailedList.Row>
          )}
      </DetailedList>
    </Section>
  )
}

export default TalentAvailability
