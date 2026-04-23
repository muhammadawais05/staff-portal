import React, { memo } from 'react'
import { Section } from '@toptal/picasso'
import { DetailedList as DL } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { AvailabilityStatus } from '@staff-portal/talents'

import TalentActiveJobs from '../../components/TalentActiveJobs/TalentActiveJobs'
import TalentAverageWorkingHours from '../../components/TalentAverageWorkingHours/TalentAverageWorkingHours'
import TalentWorkingPeriods from '../../components/TalentWorkingPeriods/TalentWorkingPeriods'
import WorkloadTabSkeletonLoader from '../../components/WorkloadTabSkeletonLoader/WorkloadTabSkeletonLoader'
import TalentAllocatedHours from '../TalentAllocatedHours/TalentAllocatedHours'
import { useGetTalentWorkload } from './data/get-talent-workload/get-talent-workload.staff.gql'

const HEADER_TITLE = 'Workload'

interface Props {
  talentId: string
  section?: boolean | null
}

const WorkloadTab = ({ talentId, section }: Props) => {
  const { data, error, networkLoading } = useGetTalentWorkload(talentId)

  if (error) {
    throw error
  }

  if (networkLoading) {
    return section ? (
      <Section title={HEADER_TITLE} variant='withHeaderBar'>
        <WorkloadTabSkeletonLoader />
      </Section>
    ) : (
      <WorkloadTabSkeletonLoader />
    )
  }

  if (!data) {
    return null
  }

  const {
    id,
    type,
    roleTitle,
    allocatedHours,
    averageWorkingHours,
    engagements: { nodes: engagements },
    allocatedHoursAvailability,
    allocatedHoursAvailabilityIncludingEndingEngagements,
    availableHours,
    availableHoursIncludingEndingEngagements,
    allocatedHoursConfirmedAt,
    associatedRoles,
    endingEngagements,
    preliminarySearchSetting,
    workingPeriods,
    operations: {
      updateTalentAllocatedHours: updateTalentAllocatedHoursOperation
    }
  } = data

  const detailedList = (
    <DL defaultValue={NO_VALUE} labelColumnWidth={10}>
      <DL.Row>
        <DL.Item label='Active jobs'>
          <TalentActiveJobs engagements={engagements} />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Allocated hours'>
          <TalentAllocatedHours
            allocatedHours={allocatedHours}
            talentId={id}
            operation={updateTalentAllocatedHoursOperation}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Availability'>
          <AvailabilityStatus
            talentAvailability={{
              id,
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
            mode='detailed'
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Avg working hours'>
          <TalentAverageWorkingHours hours={averageWorkingHours} />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Active hours'>
          <TalentWorkingPeriods workingPeriods={workingPeriods?.nodes} />
        </DL.Item>
      </DL.Row>
    </DL>
  )

  if (!section) {
    return detailedList
  }

  return (
    <Section title={HEADER_TITLE} variant='withHeaderBar'>
      {detailedList}
    </Section>
  )
}

export default memo(WorkloadTab)
