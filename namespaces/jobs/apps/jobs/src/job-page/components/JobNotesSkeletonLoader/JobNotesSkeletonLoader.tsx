import React from 'react'
import { Container } from '@toptal/picasso'
import { NoteCardSkeletonLoader } from '@staff-portal/ui'

const JobNotesSkeletonLoader = () => (
  <>
    <Container bottom='small'>
      <NoteCardSkeletonLoader />
    </Container>
    <Container bottom='small'>
      <NoteCardSkeletonLoader />
    </Container>
    <Container bottom='small'>
      <NoteCardSkeletonLoader />
    </Container>
  </>
)

export default JobNotesSkeletonLoader
