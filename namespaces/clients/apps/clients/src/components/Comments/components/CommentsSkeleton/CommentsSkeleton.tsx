import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'

import CommentsSection from '../CommentsSection'

const CommentsSkeleton = () => {
  return (
    <CommentsSection sectionVariant='withHeaderBar'>
      <SkeletonLoader.Typography rows={1} />
    </CommentsSection>
  )
}

export default CommentsSkeleton
