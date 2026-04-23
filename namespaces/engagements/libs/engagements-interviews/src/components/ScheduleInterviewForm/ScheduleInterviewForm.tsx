import { Form, OnChange, useForm, useFormState } from '@toptal/picasso-forms'
import React, { useCallback, useMemo } from 'react'
import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'
import { TimeZoneFragment } from '@staff-portal/date-time-utils'
import { isMaxLength } from '@staff-portal/validators'

import {
  COMMENT_FIELD_NAME,
  INTERVIEW_COMMUNICATION_FIELD_NAME,
  INTERVIEW_INITIATOR_FIELD_NAME
} from '../../config'
import { useGetInterviewTimeSlotsForTimeZone } from '../../data'
import { ScheduleEngagementFragment } from '../../data/fragments/schedule-engagement-fragment'
import { ScheduleInterviewFragment } from '../../data/fragments/schedule-interview-fragment'
import { ContactType, ScheduleInterviewFormValues } from '../../types'
import { getScheduleInterviewEventDescription } from '../../utils'
import FormInterviewCommunicationSelect from '../FormInterviewCommunicationSelect'
import FormInterviewContacts from '../FormInterviewContacts'
import FormInterviewInitiatorSelect from '../FormInterviewInitiatorSelect'
import FormInterviewTimeSlots from '../FormInterviewTimeSlots'
import FormInterviewTimeSlotSelect from '../FormInterviewTimeSlotSelect'
import FormInterviewTypeSelect from '../FormInterviewTypeSelect'
import { adjustComment } from '../ScheduleGenericInterviewModalContent/utils'
import ScheduleInterviewEventDescriptionField from '../ScheduleInterviewEventDescriptionField'
import ScheduleInterviewGoogleForm from '../ScheduleInterviewGoogleForm'
import FormInterviewPreferredDurationSelect from '../FormInterviewPreferredDurationSelect'

export const GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME = 'gcDescription'
export const TIME_SLOT_DATE_FIELD_NAME = 'date'
export const TIME_SLOT_TIME_FIELD_NAME = 'time'

const getCommentHint = (
  isClassic: boolean,
  isNew: boolean,
  isInternal: boolean
) =>
  isClassic && isNew && !isInternal
    ? "Share anything else you'd like the candidate to know before the interview. For example, the candidate may need a specific environment set up beforehand or be prepared to discuss a specific technical aspect of your project."
    : undefined

const getCommunicationHint = (
  isClassic: boolean,
  isNew: boolean,
  isInternal: boolean
) =>
  isClassic && isNew && !isInternal
    ? 'Once the interview time is confirmed, you will receive all needed contact information.'
    : undefined

export interface Props {
  isClassic: boolean
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
  timezones: TimeZoneFragment[]
  zoomExperimentEnabled: boolean
  isNew?: boolean
}

const ScheduleInterviewForm = ({
  isClassic,
  scheduleEngagement,
  scheduleInterview,
  timezones,
  zoomExperimentEnabled,
  isNew = false
}: Props) => {
  const { client } = scheduleEngagement
  const {
    kind,
    availableContacts: rawAvailableContacts,
    interviewContacts: rawInterviewContacts,
    id
  } = scheduleInterview

  const {
    values: {
      timeZoneName,
      preferredDuration,
      communication: communicationType,
      initiator = InterviewInitiator.INTERVIEWER,
      comment
    }
  } = useFormState<ScheduleInterviewFormValues>()

  const { change } = useForm()
  const { timeSlots, timeSlotsLoading } = useGetInterviewTimeSlotsForTimeZone({
    timeZoneName,
    preferredDuration,
    interviewId: id,
    skipCondition: isClassic
  })

  const handleTimeZoneOrPreferredDurationChange = useCallback(() => {
    change(TIME_SLOT_DATE_FIELD_NAME)
    change(TIME_SLOT_TIME_FIELD_NAME)
  }, [change])

  const handleInitiatorChange = useCallback(
    (value: InterviewInitiator) => {
      change(
        GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
        getScheduleInterviewEventDescription({
          kind,
          initiator: value,
          communicationType,
          scheduleEngagement
        })
      )
    },
    [change, communicationType, kind, scheduleEngagement]
  )

  const handleCommunicationTypeChange = useCallback(
    (value: InterviewCommunicationType) => {
      change(
        COMMENT_FIELD_NAME,
        adjustComment({
          communication: value,
          comment
        })
      )
      change(
        GOOGLE_INVITATION_DESCRIPTION_FIELD_NAME,
        getScheduleInterviewEventDescription({
          kind,
          initiator,
          communicationType: value,
          scheduleEngagement
        })
      )
    },
    [change, comment, initiator, kind, scheduleEngagement]
  )

  const isInternal = kind === InterviewKind.INTERNAL
  const commentHint = getCommentHint(isClassic, isNew, isInternal)
  const communicationHint = getCommunicationHint(isClassic, isNew, isInternal)

  const timezoneOptions = useMemo(
    () =>
      timezones.map(({ name, value }) => ({
        value: value,
        text: name
      })),
    [timezones]
  )

  const availableContacts: ContactType[] = useMemo(
    () => rawAvailableContacts?.nodes ?? [],
    [rawAvailableContacts]
  )
  const interviewContacts: ContactType[] = useMemo(
    () => rawInterviewContacts?.edges.map(({ node }) => node) ?? [],
    [rawInterviewContacts]
  )

  const isZoomSupported = zoomExperimentEnabled

  return (
    <>
      <Form.Select
        required
        autoFocus
        name='timeZoneName'
        label='Time Zone'
        options={timezoneOptions}
        width='full'
        data-testid='ScheduleInterviewForm-time-zone'
      />

      {isClassic ? (
        <FormInterviewTimeSlots />
      ) : (
        <>
          {isInternal && (
            <>
              <OnChange name='preferredDuration'>
                {handleTimeZoneOrPreferredDurationChange}
              </OnChange>
              <FormInterviewPreferredDurationSelect />
            </>
          )}

          <OnChange name='timeZoneName'>
            {handleTimeZoneOrPreferredDurationChange}
          </OnChange>
          <FormInterviewTimeSlotSelect
            dateFieldName={TIME_SLOT_DATE_FIELD_NAME}
            timeFieldName={TIME_SLOT_TIME_FIELD_NAME}
            timeSlotsLoading={timeSlotsLoading}
            timeSlots={timeSlots}
          />
        </>
      )}

      <OnChange name={INTERVIEW_COMMUNICATION_FIELD_NAME}>
        {handleCommunicationTypeChange}
      </OnChange>
      <FormInterviewCommunicationSelect
        required
        name={INTERVIEW_COMMUNICATION_FIELD_NAME}
        isZoomSupported={isZoomSupported}
        label='Method of Communication'
        width='full'
        hint={communicationHint}
      />

      <OnChange name={INTERVIEW_INITIATOR_FIELD_NAME}>
        {handleInitiatorChange}
      </OnChange>
      <FormInterviewInitiatorSelect
        required
        name={INTERVIEW_INITIATOR_FIELD_NAME}
        kind={kind}
        label='Call Initiator'
        width='full'
      />

      <FormInterviewContacts
        availableContacts={availableContacts}
        interviewContacts={interviewContacts}
      />

      <FormInterviewTypeSelect
        required
        name='interviewType'
        label='Interview Type'
        width='full'
      />

      {isClassic && (
        <Form.Checkbox
          name='acceptForTalent'
          label='Accept Interview for Talent'
          data-testid='ScheduleInterviewForm-accept-interview-for-talent'
        />
      )}

      {Boolean(client?.enterprise) && !isInternal && (
        <Form.Checkbox
          name='disableCompanyNotifications'
          label='Disable Company Notifications'
          data-testid='ScheduleInterviewForm-disable-company-notification'
        />
      )}

      {!isInternal ? (
        <>
          <Form.Checkbox
            name='sendGoogleCalendarInvitation'
            label='Send Google Calendar Invitation'
            data-testid='ScheduleInterviewForm-send-google-calendar-invitation'
          />

          <ScheduleInterviewGoogleForm
            isClassic={isClassic}
            scheduleEngagement={scheduleEngagement}
          />
        </>
      ) : (
        <ScheduleInterviewEventDescriptionField />
      )}

      <Form.Input
        multiline
        name={COMMENT_FIELD_NAME}
        label='Comment'
        width='full'
        rows={4}
        validate={isMaxLength}
        hint={commentHint}
        data-testid='ScheduleInterviewForm-comment'
      />
    </>
  )
}

export default ScheduleInterviewForm
