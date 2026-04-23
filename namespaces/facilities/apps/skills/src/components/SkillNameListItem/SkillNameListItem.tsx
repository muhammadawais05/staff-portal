import React from 'react'
import {
  ArrowDownMinor16,
  ArrowUpMinor16,
  Button,
  Table,
  TypographyOverflow
} from '@toptal/picasso'

import {
  SkillNameActions,
  SkillNameVerticalsList,
  SkillNameVerticalsCell,
  SkillNameSwitch
} from '..'
import * as TableStyles from '../../styles'
import { VerticalWithSkillCategoriesFragment } from '../../data/get-verticals-with-categories'
import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'

export interface Props {
  skillName: SkillNamesListItemFragment
  stripeEven?: boolean
  isExpanded?: boolean
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
  skillPageSlugs: string[]
  expandCollapse?: (skillNameId: string) => void
}

const SkillNameListItem = ({
  skillName,
  stripeEven,
  isExpanded,
  verticalsWithCategories,
  skillPageSlugs,
  expandCollapse
}: Props) => {
  const { id, name, skills } = skillName
  const toggleExpandRow = () => expandCollapse?.(id)

  return (
    <Table.ExpandableRow
      content={<SkillNameVerticalsList skills={skills} />}
      expanded={isExpanded}
      stripeEven={stripeEven}
    >
      <Table.Cell css={TableStyles.skillColumn}>
        <TypographyOverflow>{name}</TypographyOverflow>
      </Table.Cell>
      <Table.Cell css={TableStyles.verticalsColumn}>
        <SkillNameVerticalsCell skills={skills} />
      </Table.Cell>
      <Table.Cell css={TableStyles.expandingColumn}>
        {skills.length > 0 && (
          <Button.Circular
            title={isExpanded ? 'Hide Verticals' : 'Show Verticals'}
            data-testid='expand-verticals-button'
            variant='flat'
            icon={isExpanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
            onClick={toggleExpandRow}
          />
        )}
      </Table.Cell>
      <Table.Cell css={TableStyles.checkColumn}>
        <SkillNameSwitch type='editor' skillName={skillName} />
      </Table.Cell>
      <Table.Cell css={TableStyles.checkColumn}>
        <SkillNameSwitch type='vertical' skillName={skillName} />
      </Table.Cell>
      <Table.Cell>
        <SkillNameActions
          skillName={skillName}
          verticalsWithCategories={verticalsWithCategories}
          skillPageSlugs={skillPageSlugs}
        />
      </Table.Cell>
    </Table.ExpandableRow>
  )
}

export default SkillNameListItem
