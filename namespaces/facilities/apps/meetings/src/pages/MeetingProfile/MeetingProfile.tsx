import { useGetNode } from '@staff-portal/data-layer-service'
import { ErrorType, ErrorView } from '@staff-portal/error-handling'
import { MeetingActions } from '@staff-portal/meetings'
import ContentWrapper from '@staff-portal/page-wrapper'
import { DetailedListSkeleton } from '@staff-portal/ui'
import { Section } from '@toptal/picasso'
import React, { ComponentProps, useMemo } from 'react'

import MeetingItemContent from '../../components/MeetingItemContent/MeetingItemContent'
import { GetMeetingDocument } from './data/get-meeting.staff.gql.types'
import { useGetMeetingId } from './hooks/use-get-meeting-id'

const MeetingProfile = () => {
  const { meetingId } = useGetMeetingId()

  const { data: meeting, loading } = useGetNode(GetMeetingDocument)(
    { meetingId },
    { throwOnError: true }
  )

  const content = useMemo(() => {
    const sectionProps: ComponentProps<typeof Section> = {
      title: 'Meeting details',
      variant: 'withHeaderBar'
    }

    if (loading && !meeting) {
      return (
        <Section {...sectionProps}>
          <DetailedListSkeleton striped divided columns={1} items={6} />
        </Section>
      )
    }

    if (!meeting) {
      return <ErrorView errorType={ErrorType.NOT_FOUND} />
    }

    return (
      <Section {...sectionProps}>
        <MeetingItemContent meeting={meeting} />
      </Section>
    )
  }, [loading, meeting])

  return (
    <ContentWrapper
      title={meeting?.subject}
      titleLoading={loading}
      actions={<MeetingActions loading={loading} meeting={meeting} />}
    >
      {content}
    </ContentWrapper>
  )
}

export default MeetingProfile
