import React, { memo } from 'react'
import { Section } from '@toptal/picasso'
import { useGetCreateTaskOperation } from '@staff-portal/tasks'

import CoachingItems from './../CoachingItems'
import InfractionsSkeleton from '../InfractionsSkeleton'
import { useGetTalentCoachingEngagements } from '../../data'

export interface Props {
  talentId: string
}

const Coaching = ({ talentId }: Props) => {
  const { data: createTaskOperation } = useGetCreateTaskOperation()
  const { data, error, networkLoading } =
    useGetTalentCoachingEngagements(talentId)

  const engagements = data?.coachingEngagements?.nodes ?? []

  if (error) {
    throw error
  }

  return (
    <Section
      variant='withHeaderBar'
      title='Coaching'
      data-testid='coaching-section'
    >
      {networkLoading ? (
        <InfractionsSkeleton />
      ) : (
        <CoachingItems
          engagements={engagements}
          createTaskOperation={createTaskOperation}
        />
      )}
    </Section>
  )
}

export default memo(Coaching)
