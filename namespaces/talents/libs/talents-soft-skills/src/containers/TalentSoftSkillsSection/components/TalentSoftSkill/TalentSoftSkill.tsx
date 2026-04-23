import React, { useState } from 'react'
import { Table, Container, Button, OverviewBlock } from '@toptal/picasso'
import { ArrowDownMinor16, ArrowUpMinor16 } from '@toptal/picasso/Icon'
import { Operation } from '@staff-portal/graphql/staff'

import TalentSoftSkillRating, {
  getRatingNode
} from '../TalentSoftSkillRating/TalentSoftSkillRating'
import { TalentSoftSkills } from '../../../../types'
import CreateTalentSoftSkillRatingButton from '../CreateTalentSoftSkillRatingButton'

interface Props {
  softSkill: TalentSoftSkills
  talentName: string
  talentId: string
  createTalentSoftSkillRatingOperation: Operation
  stripeEven?: boolean
}

const TalentSoftSkill = ({
  softSkill,
  talentName,
  createTalentSoftSkillRatingOperation,
  talentId,
  stripeEven
}: Props) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const { name, ratings, cumulativeRating, id } = softSkill

  const handleExpandableClick = () => {
    setIsRowExpanded(!isRowExpanded)
  }

  return (
    <Table.ExpandableRow
      key={id}
      stripeEven={stripeEven}
      content={
        <Container padded='small' top='xsmall'>
          <Container bottom='medium'>
            <OverviewBlock.Group>
              <OverviewBlock
                label='Rating'
                value={getRatingNode(cumulativeRating, {
                  semibold: true,
                  as: 'span'
                })}
              />
              <OverviewBlock label='Number of ratings' value={ratings.length} />
            </OverviewBlock.Group>
          </Container>
          {ratings.map(rating => (
            <TalentSoftSkillRating
              rating={rating}
              talentId={talentId}
              talentName={talentName}
              key={rating.id}
              softSkillName={name}
            />
          ))}
        </Container>
      }
      expanded={isRowExpanded}
    >
      <Table.Cell titleCase>{name}</Table.Cell>
      <Table.Cell data-testid='rating'>
        {getRatingNode(cumulativeRating)}
      </Table.Cell>
      <Table.Cell data-testid='rating-count'>{ratings.length}</Table.Cell>
      <Table.Cell>
        <Container flex>
          <CreateTalentSoftSkillRatingButton
            talentId={talentId}
            talentName={talentName}
            softSkill={softSkill}
            operation={createTalentSoftSkillRatingOperation}
          />
          <Button.Circular
            title='expand rating'
            data-testid='expand-soft-skill-button'
            variant='flat'
            icon={isRowExpanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
            onClick={handleExpandableClick}
          />
        </Container>
      </Table.Cell>
    </Table.ExpandableRow>
  )
}

export default TalentSoftSkill
