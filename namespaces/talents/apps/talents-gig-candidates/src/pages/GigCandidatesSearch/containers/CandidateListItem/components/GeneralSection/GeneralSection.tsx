import React, { memo, useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { shouldShowPortfolio } from '@staff-portal/talents'
import {
  JobCandidateTalentListItemFragment,
  TalentListItemType,
  TalentListJobDataFragment,
  PortfolioItems,
  TalentDetails
} from '@staff-portal/talents-list'

import JobsSection from '../../../JobsSection/JobsSection'
import TalentProfileSection from '../../../TalentProfileSection/TalentProfileSection'

interface Props {
  talent: TalentListItemType
  isBestMatchQueryEnabled: boolean
  jobData?: TalentListJobDataFragment | null
  jobCandidate?: JobCandidateTalentListItemFragment
}

const GeneralSection = ({
  talent,
  jobCandidate,
  jobData,
  isBestMatchQueryEnabled
}: Props) => {
  const isPortfolioVisible = shouldShowPortfolio(talent?.type)
  const talentSkills = useMemo(
    () =>
      talent.skillSets?.nodes.map(skillSet => ({
        rating: skillSet.rating,
        name: skillSet.skill.name
      })) || [],
    [talent.skillSets]
  )

  return (
    <>
      <TalentDetails
        talent={talent}
        jobCandidate={jobCandidate}
        jobData={jobData}
        isBestMatchQueryEnabled={isBestMatchQueryEnabled}
      />
      {isPortfolioVisible && (
        <Container data-testid='portfolio-items-general-section' top='small'>
          <PortfolioItems talentName={talent.fullName} talentId={talent.id} />
        </Container>
      )}
      <JobsSection talentId={talent.id} talentSkills={talentSkills} />
      <TalentProfileSection talentId={talent.id} talentSkills={talentSkills} />
    </>
  )
}

export default memo(GeneralSection)
