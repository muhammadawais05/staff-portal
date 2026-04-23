import React, { useMemo, memo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { shouldShowPortfolio, VettedSkillsFields } from '@staff-portal/talents'

import PortfolioItems from './components/PortfolioItems/PortfolioItems'
import TalentDetails from './components/TalentDetails/TalentDetails'
import { TalentListItemType } from '../../types'
import {
  JobCandidateTalentListItemFragment,
  TalentListJobDataFragment
} from '../../data'

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
  const highlightedSkillIds = useMemo(
    () => jobData?.skillSets?.nodes.map(ss => ss.skill.id),
    [jobData?.skillSets?.nodes]
  )

  return (
    <Container data-testid='general-section'>
      <TalentDetails
        talent={talent}
        jobCandidate={jobCandidate}
        jobData={jobData}
        isBestMatchQueryEnabled={isBestMatchQueryEnabled}
      />
      {!!talent.skillSets?.nodes?.length && (
        <Container data-testid='skill-sets-list-general-section'>
          <Container top='small' bottom='small' left='xsmall'>
            <Typography variant='heading' color='black' size='medium'>
              Skills
            </Typography>
          </Container>
          <VettedSkillsFields
            talentType={talent.type}
            skills={talent.skillSets.nodes}
            highlightedSkillIds={highlightedSkillIds}
          />
        </Container>
      )}
      {isPortfolioVisible && (
        <Container data-testid='portfolio-items-general-section' top='small'>
          <PortfolioItems talentName={talent.fullName} talentId={talent.id} />
        </Container>
      )}
    </Container>
  )
}

export default memo(GeneralSection)
