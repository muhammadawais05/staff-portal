import React, { useState, useMemo } from 'react'
import pluralize from 'pluralize'
import {
  Accordion,
  Button,
  Container,
  ArrowDownMinor16,
  ArrowUpMinor16
} from '@toptal/picasso'

import SkillSetField from '../SkillSetField'
import type { SkillSets } from '../../types'
import * as S from './styles'

const INITIAL_VISIBLE_ITEMS = 20

type CollapsibleSkillSetFieldProps = {
  skills?: SkillSets
  talentType: string
  initialVisibleItems?: number
}

const CollapsibleSkillSetField = ({
  skills = [],
  talentType,
  initialVisibleItems = INITIAL_VISIBLE_ITEMS
}: CollapsibleSkillSetFieldProps) => {
  const [showAdditionalSkills, setShowAdditionalSkills] = useState(false)
  const shownSkills = useMemo(() => skills.slice(0, initialVisibleItems), [])
  const hiddenSkills = useMemo(
    () =>
      shownSkills.length === initialVisibleItems
        ? skills.slice(shownSkills.length, skills.length)
        : [],
    []
  )

  return (
    <Container>
      <SkillSetField talentType={talentType} skills={shownSkills} />
      {hiddenSkills.length > 0 && (
        <Container top='xsmall'>
          <Accordion
            content={
              <SkillSetField talentType={talentType} skills={hiddenSkills} />
            }
            expanded={showAdditionalSkills}
            borders='none'
            data-testid='collapsible-skills'
          />
          <Button.Action
            onClick={() => setShowAdditionalSkills(!showAdditionalSkills)}
            icon={
              showAdditionalSkills ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />
            }
            iconPosition='right'
            css={S.showMoreSkillsButton}
            data-testid='collapsible-skill-set-field-toggle-button'
          >
            {showAdditionalSkills
              ? 'View less'
              : `View ${hiddenSkills.length} more ${pluralize(
                  'skill',
                  hiddenSkills.length
                )}`}
          </Button.Action>
        </Container>
      )}
    </Container>
  )
}

export default CollapsibleSkillSetField
