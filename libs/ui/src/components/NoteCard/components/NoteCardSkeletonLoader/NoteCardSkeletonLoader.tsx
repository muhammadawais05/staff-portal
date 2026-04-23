import { SkeletonLoader } from '@toptal/picasso'
import React from 'react'

import NoteCard from '../../NoteCard'

const NoteCardSkeletonLoader = () => (
  <NoteCard loading>
    <NoteCard.Body>
      <SkeletonLoader.Typography rows={3} />
    </NoteCard.Body>
  </NoteCard>
)

export default NoteCardSkeletonLoader
