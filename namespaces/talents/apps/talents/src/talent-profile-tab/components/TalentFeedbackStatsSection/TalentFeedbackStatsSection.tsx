import React, { memo } from 'react'
import { SkeletonLoader } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'

import useGetTalentFeedbackStats from './data/get-talent-feedback-stats'
import TalentFeedbackStatsEntry from './components/TalentFeedbackStatsEntry'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentFeedbackStatsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { showError } = useNotifications()
  const {
    data: feedbackStatsEntries,
    loading,
    refetch
  } = useGetTalentFeedbackStats({
    talentId,
    onError: () => {
      showError('Unable to fetch feedback stats.')
    }
  })

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )

  if (loading) {
    return <SkeletonLoader.Typography />
  }

  return feedbackStatsEntries && feedbackStatsEntries?.length > 0 ? (
    <Section
      title='Feedback Stats'
      variant={sectionVariant}
      data-testid='talent-feedback-stats-section'
    >
      {feedbackStatsEntries.map(entry => (
        <TalentFeedbackStatsEntry key={entry.roleTitle} entry={entry} />
      ))}
    </Section>
  ) : null
}

export default memo(TalentFeedbackStatsSection)
