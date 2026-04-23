import React, { RefObject } from 'react'
import { ActivityFragment } from '@staff-portal/activities'
import { Notes, NoteFragment } from '@staff-portal/notes'

import JobNotesSkeletonLoader from '../JobNotesSkeletonLoader'

export interface Props {
  refetchNotes: () => void
  loading: boolean
  hidden: boolean
  formContainerRef: RefObject<HTMLDivElement>
  notes?: (ActivityFragment | NoteFragment)[]
}

const JobNotesContent = ({
  refetchNotes,
  loading,
  hidden,
  formContainerRef,
  notes
}: Props) => {
  if (hidden) {
    return null
  }

  if (loading) {
    return <JobNotesSkeletonLoader />
  }

  return (
    <>
      <div ref={formContainerRef} />
      <Notes
        notes={notes}
        refetchNotes={refetchNotes}
        notFoundMessage='Currently, there are no notes or activities logged.'
      />
    </>
  )
}

export default JobNotesContent
