import { SectionProps } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { ClientQuizContent } from '@staff-portal/clients'

import QuizSection from '../QuizSection'
import { getIsQuizSectionCollapsedByDefault } from '../../utils'
import { GetQuizQuery } from '../../data'

type QuizNode = Exclude<GetQuizQuery['node'], undefined | null>

interface Props {
  quizItems: Exclude<QuizNode['quizItems'], undefined | null>['nodes']
  referralPage?: QuizNode['referralPage']
  cumulativeStatus?: QuizNode['cumulativeStatus']
  remoteQuizUrl?: QuizNode['remoteQuizUrl']
  sectionVariant?: SectionProps['variant']
}

const QuizContent = ({
  quizItems,
  referralPage,
  cumulativeStatus,
  remoteQuizUrl,
  sectionVariant
}: Props) => {
  const isSectionCollapsedByDefault = useMemo(
    () => getIsQuizSectionCollapsedByDefault(cumulativeStatus),
    [cumulativeStatus]
  )

  return (
    <QuizSection
      defaultCollapsed={isSectionCollapsedByDefault}
      sectionVariant={sectionVariant}
    >
      <ClientQuizContent
        quizItems={quizItems}
        referralPage={referralPage}
        remoteQuizUrl={remoteQuizUrl}
      />
    </QuizSection>
  )
}

export default QuizContent
