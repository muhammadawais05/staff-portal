import React, { useState, useEffect, useCallback } from 'react'
import { Button, Tag } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import {
  useMessageEmitter,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import {
  JOB_FAVORITE_TALENTS_CLEARED,
  JOB_FAVORITE_TALENTS_UPDATED
} from '@staff-portal/jobs'

import SidebarWidget from '../SidebarWidget'
import JobFavoriteCandidateItem from '../JobFavoriteCandidateItem'
import { useGetJobFavoriteTalents } from './data/get-job-favorite-talents.staff.gql'
import { useClearJobFavoriteTalents } from './data/clear-job-favorite-talents.staff.gql'
import * as S from './styles'

export interface Props {
  jobId: string
}

const JobFavoriteCandidatesWidgetContent = ({ jobId }: Props) => {
  const [totalCount, setTotalCount] = useState(0)
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()

  const { data, refetch } = useGetJobFavoriteTalents({ jobId })
  const [clearJobFavoriteTalents, { loading: clearJobFavoriteTalenstLoading }] =
    useClearJobFavoriteTalents({
      onCompleted: () => emitMessage(JOB_FAVORITE_TALENTS_CLEARED, { jobId }),
      onError: () => showError('Cannot clear job favorite talents.')
    })

  useMessageListener(
    JOB_FAVORITE_TALENTS_UPDATED,
    ({ jobId: updatedJobId }) => jobId === updatedJobId && refetch()
  )

  useEffect(() => setTotalCount(data?.length ?? 0), [data?.length])

  const decrementTotalCount = useCallback(
    () => setTotalCount(prevCount => prevCount - 1),
    [setTotalCount]
  )

  if (!data?.length || !totalCount) {
    return null
  }

  return (
    <SidebarWidget
      title='Favorites For This Job'
      testIds={{ widget: 'job-favorites' }}
    >
      <Tag.Group css={S.jobCandidatesWrapper}>
        {data.map(talent => (
          <JobFavoriteCandidateItem
            key={talent.id}
            talent={talent}
            jobId={jobId}
            onItemRemoved={decrementTotalCount}
          />
        ))}
      </Tag.Group>

      <SidebarWidget.BottomContainer>
        <Button
          variant='secondary'
          loading={clearJobFavoriteTalenstLoading}
          size='small'
          onClick={() => clearJobFavoriteTalents({ variables: { jobId } })}
        >
          Clear All
        </Button>
      </SidebarWidget.BottomContainer>
    </SidebarWidget>
  )
}

export default JobFavoriteCandidatesWidgetContent
