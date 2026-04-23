import React, { memo, Suspense, useState } from 'react'
import { Container, Tabs } from '@toptal/picasso'
import { lazy } from '@staff-portal/utils'
import {
  getWorkExperienceLabel,
  shouldShowPortfolio
} from '@staff-portal/talents'
import { StatsTabSkeletonLoader } from '@staff-portal/talents-stats'
import { WorkloadTabSkeletonLoader } from '@staff-portal/talents-workload'
import { QualityRatingsSectionSkeletonLoader } from '@staff-portal/talents-quality'

import GeneralSection from '../GeneralSection/GeneralSection'
import EmploymentsSectionSkeletonLoader from '../../components/EmploymentsSectionSkeletonLoader/EmploymentsSectionSkeletonLoader'
import {
  JobCandidateTalentListItemFragment,
  TalentListJobDataFragment
} from '../../data'
import { TalentListItemType } from '../../types'
import PortfolioItemsSkeletonLoader from '../../components/PortfolioItemsSkeletonLoader/PortfolioItemsSkeletonLoader'
import WorkExperienceSectionSkeletonLoader from '../../components/WorkExperienceSectionSkeletonLoader/WorkExperienceSectionSkeletonLoader'

const WorkloadSection = lazy(() => import('../WorkloadSection/WorkloadSection'))
const WorkExperienceSection = lazy(
  () => import('../WorkExperienceSection/WorkExperienceSection')
)
const StatsTab = lazy(
  () => import('@staff-portal/talents-stats/src/containers/StatsTab/StatsTab')
)
const QualityRatingsSection = lazy(
  () =>
    import(
      '@staff-portal/talents-quality/src/containers/QualityRatingsSection/QualityRatingsSection'
    )
)

const EmploymentsSection = lazy(
  () => import('../EmploymentsSection/EmploymentsSection')
)

type Props = {
  talent: TalentListItemType
  isBestMatchQueryEnabled: boolean
  jobData?: TalentListJobDataFragment | null
  jobCandidate?: JobCandidateTalentListItemFragment
}

enum TalentTab {
  GENERAL,
  WORKLOAD,
  STATS,
  EMPLOYMENTS,
  WORK_EXPERIENCE,
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
    case TalentTab.WORKLOAD:
      return (
        <Suspense fallback={<WorkloadTabSkeletonLoader />}>
          <WorkloadSection talentId={talent.id} />
        </Suspense>
      )
    case TalentTab.STATS:
      return (
        <Suspense fallback={<StatsTabSkeletonLoader />}>
          <StatsTab talentId={talent.id} />
        </Suspense>
      )
    case TalentTab.WORK_EXPERIENCE: {
      const skeletonLoader = shouldShowPortfolio(talent.type) ? (
        <PortfolioItemsSkeletonLoader />
      ) : (
        <WorkExperienceSectionSkeletonLoader />
      )

      return (
        <Suspense fallback={skeletonLoader}>
          <WorkExperienceSection
            talentId={talent.id}
            talentName={talent.fullName}
            talentType={talent.type}
          />
        </Suspense>
      )
    }
    case TalentTab.QUALITY_RATINGS:
      return (
        <Suspense fallback={<QualityRatingsSectionSkeletonLoader />}>
          <QualityRatingsSection talentId={talent.id} jobId={jobData?.id} />
        </Suspense>
      )
    case TalentTab.EMPLOYMENTS:
      return (
        <Suspense fallback={<EmploymentsSectionSkeletonLoader />}>
          <EmploymentsSection talentId={talent.id} />
        </Suspense>
      )
    default:
      throw new Error('Invalid tab identifier was provided')
  }
}

const TalentListItemContent = (props: Props) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(_, newValue) => setCurrentTab(newValue)}
        data-testid='talent-list-item-tabs'
      >
        <Tabs.Tab label='General' data-testid='general-tab' />
        <Tabs.Tab label='Workload' data-testid='workload-tab' />
        <Tabs.Tab label='Stats' data-testid='stats-tab' />
        <Tabs.Tab label='Employments' data-testid='employments-tab' />
        <Tabs.Tab
          label={getWorkExperienceLabel(props.talent.type)}
          data-testid='work-experience-tab'
        />
        <Tabs.Tab label='Quality & Ratings' data-testid='quality-ratings-tab' />
      </Tabs>
      <Container top='small'>{getTab(currentTab, props)}</Container>
    </>
  )
}

export default memo(TalentListItemContent)
