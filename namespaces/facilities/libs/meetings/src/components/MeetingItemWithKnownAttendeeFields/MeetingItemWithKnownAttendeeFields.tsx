import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { DetailedList as DL } from '@staff-portal/ui'

import { MeetingFragment } from '../../data/meeting-fragment'
import { MeetingAttendeeType } from './enums'
import MeetingScheduleField from '../MeetingScheduleField'
import MeetingStatusField from '../MeetingStatusField'
import MeetingConferenceLinkField from './components/MeetingConferenceLinkField'
import MeetingScheduledViaField from './components/MeetingScheduledViaField'
import MeetingWithField from './components/MeetingWithField'

interface Props {
  isOrganizer: boolean
  meeting: MeetingFragment
}

// This component supposed to be used for `Meetings` page.
// For usage at other places please take a look on `ScheduledMeetingItem`
const MeetingItemWithKnownAttendeeFields = ({
  isOrganizer,
  meeting
}: Props) => {
  const {
    attendee,
    scheduledAt,
    durationMinutes,
    status,
    outcome,
    comment,
    organizer,
    additionalInformation,
    conferenceLink,
    moderationUrl,
    relatedToRoleStep
  } = meeting
  const forTalent = attendee?.__typename === MeetingAttendeeType.TALENT
  const meetingWith = isOrganizer ? organizer : attendee

  return (
    <DL labelColumnWidth={11} defaultValue={NO_VALUE}>
      <DL.Row>
        <DL.Item label='With'>
          <MeetingWithField
            meetingWith={meetingWith}
            conferenceLink={conferenceLink}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Status'>
          <MeetingStatusField
            status={status}
            outcome={outcome}
            comment={comment}
            organizer={organizer}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Schedule'>
          <MeetingScheduleField
            scheduledAt={scheduledAt}
            durationMinutes={durationMinutes}
          />
        </DL.Item>
      </DL.Row>
      {conferenceLink && (
        <DL.Row>
          <DL.Item label='Conference Link'>
            <MeetingConferenceLinkField
              conferenceLink={conferenceLink}
              moderationUrl={moderationUrl}
            />
          </DL.Item>
        </DL.Row>
      )}
      <DL.Row>
        <DL.Item label='Scheduled Via'>
          <MeetingScheduledViaField meeting={meeting} />
        </DL.Item>
      </DL.Row>
      {forTalent && (
        <DL.Row>
          <DL.Item label='Related to Step'>
            <TypographyOverflow weight='semibold' size='medium'>
              {relatedToRoleStep?.title ?? NO_VALUE}
            </TypographyOverflow>
          </DL.Item>
        </DL.Row>
      )}
      {additionalInformation && (
        <DL.Row>
          <DL.Item
            label='Additional Information'
            value={additionalInformation}
          />
        </DL.Row>
      )}
    </DL>
  )
}

export default MeetingItemWithKnownAttendeeFields
