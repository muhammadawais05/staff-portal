import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'

import QuizSection from '../QuizSection'

const QuizSkeleton = () => {
  return (
    <QuizSection sectionVariant='withHeaderBar'>
      <SkeletonLoader.Typography rows={1} />
    </QuizSection>
  )
}

export default QuizSkeleton
