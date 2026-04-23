import React, { memo, Suspense, useState } from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { lazy } from '@staff-portal/utils'
import {
  JobCandidateTalentListItemFragment,
  TalentListItemType,
  TalentListJobDataFragment
} from '@staff-portal/talents-list'
import { QualityRatingsSectionSkeletonLoader } from '@staff-portal/talents-quality'

import GeneralSection from '../GeneralSection/GeneralSection'

const QualityRatingsSection = lazy(
  () =>
    import(
      '@staff-portal/talents-quality/src/containers/QualityRatingsSection/QualityRatingsSection'
    )
)

type Props = {
  talent: TalentListItemType
  isBestMatchQueryEnabled: boolean
  jobData?: TalentListJobDataFragment | null
  jobCandidate?: JobCandidateTalentListItemFragment
}

enum TalentTab {
  GENERAL,
  QUALITY_RATINGS
}

const getTab = (
  currentTab: TalentTab,
  { talent, jobCandidate, isBestMatchQueryEnabled, jobData }: Props
) => {
  switch (currentTab) {
    case TalentTab.GENERAL:
      return (
        <GeneralSection
          talent={talent}
          jobCandidate={jobCandidate}
          jobData={jobData}
          isBestMatchQueryEnabled={isBestMatchQueryEnabled}
        />
      )
    case TalentTab.QUALITY_RATINGS:
      return (
        <Suspense fallback={<QualityRatingsSectionSkeletonLoader />}>
          <QualityRatingsSection talentId={talent.id} jobId={jobData?.id} />
        </Suspense>
      )
    default:
      throw new Error('Invalid tab identifier was provided')
  }
}

const CandidateListItemContent = (props: Props) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(_, newValue) => setCurrentTab(newValue)}
      >
        <Tabs.Tab label='General' />
        <Tabs.Tab label='Quality & Ratings' />
      </Tabs>
      <Container top='small'>{getTab(currentTab, props)}</Container>
    </>
  )
}

export default memo(CandidateListItemContent)
