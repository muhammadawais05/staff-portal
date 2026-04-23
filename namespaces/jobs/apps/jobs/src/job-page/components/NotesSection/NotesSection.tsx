import React, { useRef, useState } from 'react'
import { Section, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { checkIfFieldIsForbidden } from '@staff-portal/data-layer-service'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { ACTIVITY_UPDATED } from '@staff-portal/activities'

import JobNotesActions from '../JobNotesActions'
import JobNotesContent from '../JobNotesContent'
import { useGetJobNotes } from './data'

interface Props {
  jobId: string
}

export const NotesSection = ({ jobId }: Props) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const notesRef = useRef<HTMLDivElement>(null)
  const { data, error, notes, networkLoading, loading, refetch } =
    useGetJobNotes(jobId)

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener([ENGAGEMENT_UPDATED, ACTIVITY_UPDATED], () => refetch())

  const handleOpenNoteForm = () => setNoteFormOpen(true)
  const handleCloseNoteForm = () => {
    setNoteFormOpen(false)
  }

  if (checkIfFieldIsForbidden('notes', error)) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        title='Notes'
        variant='withHeaderBar'
        actions={
          <JobNotesActions
            job={data}
            refetchNotes={refetch}
            formContainerRef={formContainerRef}
            onOpenNoteForm={handleOpenNoteForm}
            onCloseNoteForm={handleCloseNoteForm}
          />
        }
        data-testid='NotesSection'
      >
        <Container ref={formContainerRef}>
          <> </>
        </Container>
        <Container ref={notesRef}>
          <JobNotesContent
            notes={notes}
            refetchNotes={refetch}
            loading={loading || networkLoading}
            hidden={isNoteFormOpen}
            formContainerRef={notesRef}
          />
        </Container>
      </Section>
    </Container>
  )
}

export default NotesSection
