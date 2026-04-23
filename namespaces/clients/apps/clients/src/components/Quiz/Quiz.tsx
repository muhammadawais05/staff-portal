import React, { FC, memo } from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'

import QuizContent from './components/QuizContent'
import QuizSkeleton from './components/QuizSkeleton'
import { GetQuizDocument } from './data'
import { getIsQuizSectionDisplayed } from './utils'

interface Props {
  companyId: string
}

const Quiz: FC<Props> = memo(({ companyId }) => {
  const { data, loading, initialLoading } = useGetNode(GetQuizDocument)({
    clientId: companyId
  })
  const { referralPage, remoteQuizUrl, cumulativeStatus } = data || {}
  const quizItems = data?.quizItems?.nodes || []

  if (
    !initialLoading &&
    !getIsQuizSectionDisplayed({ quizItems, referralPage, remoteQuizUrl })
  ) {
    return null
  }

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<QuizSkeleton />}
    >
      <QuizContent
        sectionVariant='withHeaderBar'
        quizItems={quizItems}
        remoteQuizUrl={remoteQuizUrl}
        referralPage={referralPage}
        cumulativeStatus={cumulativeStatus}
      />
    </ContainerLoader>
  )
})

export default Quiz
