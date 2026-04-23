import React from 'react'
import { Container } from '@toptal/picasso'
import { NoSearchResultsMessage } from '@staff-portal/ui'
import { shouldShowPortfolio } from '@staff-portal/talents'

import * as S from './styles'
import PortfolioItems from './components/PortfolioItems/PortfolioItems'
import PortfolioItemsSkeletonLoader from '../../components/PortfolioItemsSkeletonLoader/PortfolioItemsSkeletonLoader'
import ResumePublications from './components/ResumePublications/ResumePublications'
import SkillsWithExperience from './components/SkillsWithExperience/SkillsWithExperience'
import WorkExperienceSectionSkeletonLoader from '../../components/WorkExperienceSectionSkeletonLoader/WorkExperienceSectionSkeletonLoader'
import useGetTalentWorkExperienceData from './data/get-talent-work-experience-data/get-talent-work-experience-data'

interface Props {
  talentId: string
  talentName: string
  talentType: string
}

// eslint-disable-next-line complexity
export const WorkExperienceSection = ({
  talentId,
  talentName,
  talentType
}: Props) => {
  const {
    isLoadingItems,
    hasItems,
    portfolioItems,
    resumePublications,
    skills
  } = useGetTalentWorkExperienceData(talentId)

  if (!isLoadingItems && !hasItems) {
    return (
      <NoSearchResultsMessage message='Work Experience is not available for this talent.' />
    )
  }

  const showOnlyPortfolio = shouldShowPortfolio(talentType)

  if (isLoadingItems) {
    return showOnlyPortfolio ? (
      <PortfolioItemsSkeletonLoader />
    ) : (
      <WorkExperienceSectionSkeletonLoader />
    )
  }

  return (
    <Container
      css={showOnlyPortfolio ? S.portfolioContainer : S.container}
      data-testid='work-experience-section'
    >
      {portfolioItems && (
        <Container
          bottom={showOnlyPortfolio ? undefined : 'large'}
          css={S.itemsContainer}
        >
          <PortfolioItems
            portfolioItems={portfolioItems}
            talentType={talentType}
            talentName={talentName}
            talentId={talentId}
          />
        </Container>
      )}
      {!showOnlyPortfolio && (
        <>
          {resumePublications && resumePublications.length > 0 && (
            <Container bottom='medium'>
              <ResumePublications publications={resumePublications} />
            </Container>
          )}
          <SkillsWithExperience skills={skills} />
        </>
      )}
    </Container>
  )
}

export default WorkExperienceSection
