import { Container, Typography } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { Maybe } from '@toptal/picasso/utils'
import React, { useCallback } from 'react'
import { ApolloQueryResult } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import { MeetingListContext } from '../../../../contexts'
import { REFRESH_MEETING_LIST } from '../../../../messages'
import ScheduledMeetingItem from '../ScheduledMeetingItem'
import ScheduleMeetingOnBehalfButton from '../ScheduleMeetingOnBehalfButton'
import * as S from './styles'

export interface Props<T> {
  type: string
  roleTitle?: string
  fullName: string
  scheduleMeetingUrl: Maybe<string>
  scheduledMeetings: MeetingFragment[]
  loading: boolean
  refetch: (variables?: { id: string }) => Promise<ApolloQueryResult<T>>
  sectionVariant?: SectionProps['variant']
}

const ScheduledMeetings = <T,>({
  type,
  roleTitle,
  fullName,
  scheduleMeetingUrl,
  scheduledMeetings,
  loading,
  refetch,
  sectionVariant = 'default'
}: Props<T>) => {
  const refreshMeetingList = useCallback(() => {
    refetch()
  }, [refetch])

  useMessageListener(REFRESH_MEETING_LIST, refreshMeetingList)

  if (loading || !scheduledMeetings) {
    return null
  }

  const hasMeetings = scheduledMeetings.length

  return (
    <Section
      title='Scheduled Meetings'
      actions={
        <ScheduleMeetingOnBehalfButton
          type={type}
          roleTitle={roleTitle}
          scheduleMeetingUrl={scheduleMeetingUrl as string}
        />
      }
      variant={sectionVariant}
      data-testid='scheduled-meetings-section'
    >
      {hasMeetings ? (
        <MeetingListContext.Provider value={{ refreshMeetingList }}>
          {scheduledMeetings.map(meeting => (
            <Container
              key={meeting.id}
              bottom='medium'
              css={S.meetingItemWrapper}
            >
              <ScheduledMeetingItem meeting={meeting} />
            </Container>
          ))}
        </MeetingListContext.Provider>
      ) : (
        <Typography size='medium'>
          There are no meetings with {fullName}.
        </Typography>
      )}
    </Section>
  )
}

export default ScheduledMeetings
