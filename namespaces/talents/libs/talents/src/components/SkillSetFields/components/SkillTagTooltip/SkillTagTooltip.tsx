import React from 'react'
import {
  BackMinor16,
  Button,
  ChevronMinor16,
  Container,
  Typography
} from '@toptal/picasso'

import { TalentSkillSetConnectionsFragment } from '../../../../data/talent-skill-set-connections-fragment'
import { generateSkillConnectionsSections } from './utils'
import { SkillConnectionPage, VettingPage } from './components'
import { useSkillTagTooltipPagesNavigation } from './hooks'
import * as S from './styles'

interface Props {
  talentType: string
  skillSet: TalentSkillSetConnectionsFragment
  hideVettingInformation?: boolean
}

const SkillTagTooltip = ({
  talentType,
  skillSet,
  hideVettingInformation
}: Props) => {
  const skillConnectionsSections = generateSkillConnectionsSections(
    talentType,
    skillSet
  )
  const skillConnectionsCount = skillSet.connections?.totalCount ?? 0
  const {
    title,
    isSkillConnectionsPageActive,
    isVettingPageActive,
    navigateToSkillConnectionPage,
    navigateToVettingPage,
    showNavigationButtons
  } = useSkillTagTooltipPagesNavigation(
    skillSet.rating,
    skillConnectionsCount,
    hideVettingInformation
  )
  const { vettedResult } = skillSet

  return (
    <Container padded='xsmall' css={S.tooltipContainer}>
      <Container
        flex
        alignItems='center'
        justifyContent={showNavigationButtons ? 'space-between' : 'center'}
        bottom='small'
      >
        {showNavigationButtons && (
          <Button.Action
            icon={<BackMinor16 />}
            disabled={isSkillConnectionsPageActive}
            onClick={navigateToSkillConnectionPage}
          />
        )}
        <Typography variant='heading' size='small' align='center' inline>
          {title}
        </Typography>
        {showNavigationButtons && (
          <Button.Action
            icon={<ChevronMinor16 />}
            disabled={isVettingPageActive}
            onClick={navigateToVettingPage}
          />
        )}
      </Container>
      {isSkillConnectionsPageActive && (
        <SkillConnectionPage sections={skillConnectionsSections} />
      )}
      {isVettingPageActive && <VettingPage vettedResult={vettedResult} />}
    </Container>
  )
}

export default SkillTagTooltip
