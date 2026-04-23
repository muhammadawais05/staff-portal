import React, { useMemo, memo } from 'react'
import { Container } from '@toptal/picasso'

import SkillTagWithAsyncTooltip from '../SkillTagWithAsyncTooltip'
import { SkillSetSkeletonLoader } from '../SkillSetSkeletonLoader'
import prioritizeHighlightedSkillsInsideGroups from '../../utils/prioritize-highlighted-skills-inside-groups'
import type { SkillSets } from '../../types'
import * as S from './styles'

type Props = {
  talentType: string
  skills?: SkillSets
  highlightedSkillIds?: string[]
  hideVettingInformation?: boolean
  loading?: boolean
}

const SkillSetField = ({
  talentType,
  skills = [],
  highlightedSkillIds = [],
  hideVettingInformation,
  loading
}: Props) => {
  const prioritizedSkills = useMemo(
    () => prioritizeHighlightedSkillsInsideGroups(skills, highlightedSkillIds),
    [skills, highlightedSkillIds]
  )

  if (loading) {
    return <SkillSetSkeletonLoader />
  }

  if (!prioritizedSkills.length) {
    return null
  }

  return (
    <Container css={S.container}>
      {prioritizedSkills.map(
        ({ id: skillSetId, connections, rating, skill: { id, name } }) => (
          <SkillTagWithAsyncTooltip
            key={skillSetId}
            skillSetId={skillSetId}
            name={name}
            rating={rating}
            connectionsCount={connections?.totalCount}
            highlighted={!!highlightedSkillIds.includes(id)}
            talentType={talentType}
            hideVettingInformation={hideVettingInformation}
          />
        )
      )}
    </Container>
  )
}

export default memo(SkillSetField)
