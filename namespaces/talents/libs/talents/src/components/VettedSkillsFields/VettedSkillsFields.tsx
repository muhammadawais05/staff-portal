import React, { memo, useMemo } from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { VettedSkillResult } from '@staff-portal/graphql/staff'
import { DetailedList as DL } from '@staff-portal/ui'

import { SkillSetField, SkillSets } from '../SkillSetFields'
import VettedSkillsLabel from '../VettedSkillsLabel/VettedSkillsLabel'

export type Props = {
  talentType: string
  skills?: SkillSets
  loading?: boolean
  highlightedSkillIds?: string[]
}

const groupSkillSets = (skillSets: SkillSets = []) =>
  skillSets.reduce(
    (groupedSkillSets, skillSet) => {
      switch (skillSet.vettedResult?.result) {
        case VettedSkillResult.EXPERT:
          groupedSkillSets.confirmedExpertSkills.push(skillSet)
          break
        case VettedSkillResult.MAYBE:
          groupedSkillSets.maybeExpertSkills.push(skillSet)
          break
        case VettedSkillResult.NO:
          groupedSkillSets.notExpertSkills.push(skillSet)
          break
        default:
          groupedSkillSets.notVettedSkills.push(skillSet)
      }

      return groupedSkillSets
    },
    {
      confirmedExpertSkills: [],
      maybeExpertSkills: [],
      notExpertSkills: [],
      notVettedSkills: []
    } as Record<string, SkillSets>
  )

const VettedSkillsFields = ({
  talentType,
  skills,
  highlightedSkillIds,
  loading
}: Props) => {
  const {
    confirmedExpertSkills,
    maybeExpertSkills,
    notExpertSkills,
    notVettedSkills
  } = useMemo(() => groupSkillSets(skills), [skills])

  return (
    <DL
      data-testid='vetted-skills-fields'
      defaultValue={NO_VALUE}
      labelColumnWidth={12}
    >
      {!loading && confirmedExpertSkills.length > 0 && (
        <DL.Row>
          <DL.Item
            label={
              <VettedSkillsLabel
                label='Confirmed Expert'
                tooltipContent='Data confirms talent is a top expert in the network.'
              />
            }
          >
            <SkillSetField
              talentType={talentType}
              skills={confirmedExpertSkills}
              highlightedSkillIds={highlightedSkillIds}
              loading={loading}
            />
          </DL.Item>
        </DL.Row>
      )}
      {!loading && maybeExpertSkills.length > 0 && (
        <DL.Row>
          <DL.Item
            label={
              <VettedSkillsLabel
                label='Confirmation Needed'
                tooltipContent='Data shows meaningful experience, but manual vetting needed to confirm.'
              />
            }
          >
            <SkillSetField
              talentType={talentType}
              skills={maybeExpertSkills}
              highlightedSkillIds={highlightedSkillIds}
              loading={loading}
            />
          </DL.Item>
        </DL.Row>
      )}
      {!loading && notExpertSkills.length > 0 && (
        <DL.Row>
          <DL.Item
            label={
              <VettedSkillsLabel
                label='Lower Confidence'
                tooltipContent='Data suggests expertise but more uncertainty; verify before allocating talent.'
              />
            }
          >
            <SkillSetField
              talentType={talentType}
              skills={notExpertSkills}
              highlightedSkillIds={highlightedSkillIds}
              loading={loading}
            />
          </DL.Item>
        </DL.Row>
      )}
      {!loading && notVettedSkills.length > 0 && (
        <DL.Row>
          <DL.Item
            label={
              <VettedSkillsLabel
                label='Standard Vetting'
                tooltipContent='Algorithm vetting not applied; additional verification of skills needed before allocating talent.'
              />
            }
          >
            <SkillSetField
              talentType={talentType}
              skills={notVettedSkills}
              highlightedSkillIds={highlightedSkillIds}
              loading={loading}
            />
          </DL.Item>
        </DL.Row>
      )}
    </DL>
  )
}

export default memo(VettedSkillsFields)
