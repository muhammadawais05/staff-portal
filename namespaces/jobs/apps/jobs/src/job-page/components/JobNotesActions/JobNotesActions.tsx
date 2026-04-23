import React, { RefObject } from 'react'
import { ActivityType } from '@staff-portal/graphql/staff'
import { AddActivityButton } from '@staff-portal/activities'
import { Operation } from '@staff-portal/operations'

import { JobNoteFragment } from '../NotesSection/data/get-job-notes'
import AddNoteButton from '../AddNoteButton'
import AddMatchingNoteButton from '../AddMatchingNoteButton'

export interface Props {
  job?: JobNoteFragment | null
  refetchNotes: () => void
  formContainerRef: RefObject<HTMLDivElement>
  onOpenNoteForm: () => void
  onCloseNoteForm: () => void
}

const JobNotesActions = ({
  job,
  refetchNotes,
  formContainerRef,
  onOpenNoteForm,
  onCloseNoteForm
}: Props) => {
  if (!job) {
    return null
  }

  return (
    <>
      <AddMatchingNoteButton
        jobId={job.id}
        operation={job.operations?.addJobMatchingNote}
        questions={job.matchingNoteQuestions?.nodes}
        formContainer={formContainerRef}
        onComplete={refetchNotes}
        onOpenNoteForm={onOpenNoteForm}
        onCloseNoteForm={onCloseNoteForm}
      />

      <AddNoteButton
        job={job}
        createNoteOperation={job?.notes?.operations.createNote}
        onComplete={refetchNotes}
        formContainer={formContainerRef}
        onOpenNoteForm={onOpenNoteForm}
        onCloseNoteForm={onCloseNoteForm}
      />

      <Operation
        operation={job.operations?.createActivity}
        render={disabled => (
          <AddActivityButton
            subjectId={job.id}
            type={ActivityType.JOB_RELATED}
            disabled={disabled}
          />
        )}
      />
    </>
  )
}

export default JobNotesActions
