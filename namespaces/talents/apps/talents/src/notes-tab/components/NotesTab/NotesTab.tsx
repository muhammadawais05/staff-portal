import { Container } from '@toptal/picasso'
import React, { memo, useCallback, useRef } from 'react'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { ActivityType } from '@staff-portal/graphql/staff'
import { Notes } from '@staff-portal/notes'
import { ACTIVITY_UPDATED, AddActivityButton } from '@staff-portal/activities'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { Operation } from '@staff-portal/operations'
import { useUpdateTalentTabsCounters } from '@staff-portal/talents'

import { GetTalentNotesQuery } from './data/get-talent-notes'
import AddEnglishCallNoteButton from '../AddEnglishCallNoteButton'
import AddFeedbackCallNoteButton from '../AddFeedbackCallNoteButton'
import AddSuspiciousActivityNoteButton from '../AddSuspiciousActivityNoteButton'
import AddNoteButton from '../AddNoteButton'
import AddPrescreeningNoteButton from '../AddPrescreeningNoteButton'
import AddSourcingCallNoteButton from '../AddSourcingCallNoteButton'
import AddOnlineTestNoteButton from '../AddOnlineTestNoteButton'
import AddTechnicalOneCallNoteButton from '../AddTechnicalOneCallNoteButton'
import AddTechnicalTwoCallNoteButton from '../AddTechnicalTwoCallNoteButton'
import NoteTabSkeletonLoader from '../NoteTabSkeletonLoader'
import { useGetTalentNotes } from './data'

const HEADER_TITLE = 'Notes'

export interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

interface ContentProps {
  talent: NonNullable<GetTalentNotesQuery['node']>
  refetchNotes: () => void
  sectionVariant?: SectionProps['variant']
}

const NoteTabContent = ({
  talent,
  refetchNotes,
  sectionVariant
}: ContentProps) => {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const verticalId = talent?.vertical?.id as string

  return (
    <Section
      title={HEADER_TITLE}
      variant={sectionVariant}
      actions={
        <Container
          flex
          justifyContent='flex-end'
          data-testid='notes-section-actions'
        >
          <AddPrescreeningNoteButton
            talent={talent}
            prescreeningRecordingUrl={
              talent.prescreeningRecordingUrl || undefined
            }
            createPrescreeningNoteOperation={
              talent.operations.createPrescreeningTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddOnlineTestNoteButton
            talent={talent}
            verticalId={verticalId}
            createOnlineTestNote={talent?.operations.createOnlineTestTalentNote}
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddTechnicalOneCallNoteButton
            talent={talent}
            verticalId={verticalId}
            createTechnicalOneCallNote={
              talent?.operations.createTechnicalOneCallTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddTechnicalTwoCallNoteButton
            talent={talent}
            verticalId={verticalId}
            createTechnicalTwoCallNote={
              talent?.operations.createTechnicalTwoCallTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddEnglishCallNoteButton
            talent={talent}
            verticalId={verticalId}
            createEnglishCallNote={
              talent?.operations.createEnglishCallTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddSourcingCallNoteButton
            talent={talent}
            verticalId={verticalId}
            createSourcingCallNoteOperation={
              talent?.operations.createSourcingCallTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddSuspiciousActivityNoteButton
            talent={talent}
            onComplete={refetchNotes}
            addTalentSuspiciousActivityReportNoteOperation={
              talent?.operations.addTalentSuspiciousActivityReportNote
            }
            formContainer={formContainerRef}
          />

          <AddFeedbackCallNoteButton
            talent={talent}
            createFeedbackCallNoteOperation={
              talent?.operations.createFeedbackCallTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <AddNoteButton
            talent={talent}
            createNoteOperation={
              talent?.operations.createGeneralInformationTalentNote
            }
            onComplete={refetchNotes}
            formContainer={formContainerRef}
          />

          <Operation
            operation={talent?.operations.createActivity}
            render={disabled => (
              <AddActivityButton
                subjectId={talent.id}
                type={ActivityType.TALENT_RELATED}
                disabled={disabled}
              />
            )}
          />
        </Container>
      }
    >
      <div ref={formContainerRef} />

      <Notes
        notes={talent.activitiesAndNotes?.nodes}
        verticalId={talent?.vertical?.id}
        refetchNotes={refetchNotes}
      />
    </Section>
  )
}

const NotesTab = ({ talentId, sectionVariant = 'default' }: Props) => {
  const {
    data,
    networkLoading,
    refetch: refetchNotes
  } = useGetTalentNotes(talentId)
  const updateTabsCounters = useUpdateTalentTabsCounters()

  const handleRefetchNotes = useCallback(() => {
    refetchNotes()
    updateTabsCounters()
  }, [updateTabsCounters, refetchNotes])

  useMessageListener(ACTIVITY_UPDATED, handleRefetchNotes)

  if (networkLoading) {
    return (
      <NoteTabSkeletonLoader
        title={HEADER_TITLE}
        sectionVariant={sectionVariant}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <NoteTabContent
      talent={data}
      refetchNotes={handleRefetchNotes}
      sectionVariant={sectionVariant}
    />
  )
}

export default memo(NotesTab)
