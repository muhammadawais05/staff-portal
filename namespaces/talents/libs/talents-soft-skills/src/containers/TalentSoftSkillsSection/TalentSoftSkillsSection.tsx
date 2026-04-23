import React, { memo } from 'react'
import { Table } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { ItemsTable, TableSkeleton } from '@staff-portal/ui'
import { TALENT_UPDATED } from '@staff-portal/talents'

import * as S from './styles'
import { useGetTalentSoftSkills } from '../../data/get-talent-soft-skills/get-talent-soft-skills.staff.gql'
import TalentSoftSkill from './components/TalentSoftSkill/TalentSoftSkill'
import { skeletonCols } from '../../constants'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const renderHeader = () => (
  <Table.Row>
    <Table.Cell css={S.fullWidth}>Skill</Table.Cell>
    <Table.Cell>Rating</Table.Cell>
    <Table.Cell css={S.noWrap}>Number of Ratings</Table.Cell>
    <Table.Cell>Actions</Table.Cell>
  </Table.Row>
)

const TalentSoftSkillsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const {
    softSkills,
    talentFullName,
    createTalentSoftSkillRatingOperation,
    refetch,
    loading,
    error
  } = useGetTalentSoftSkills(talentId)

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => talentId === id && refetch()
  )

  if (error) {
    throw error
  }

  if (loading || !createTalentSoftSkillRatingOperation) {
    return (
      <Section title='Soft Skills' variant={sectionVariant}>
        <TableSkeleton rows={3} cols={skeletonCols} />
      </Section>
    )
  }

  return (
    <Section
      title='Soft Skills'
      variant={sectionVariant}
      data-testid='talent-soft-skills-section'
    >
      <ItemsTable
        data={softSkills}
        renderHeader={renderHeader}
        renderRow={(softSkill, index) => (
          <TalentSoftSkill
            key={softSkill.id}
            stripeEven={Boolean(index % 2)}
            softSkill={softSkill}
            talentName={talentFullName as string}
            talentId={talentId}
            createTalentSoftSkillRatingOperation={
              createTalentSoftSkillRatingOperation
            }
          />
        )}
      />
    </Section>
  )
}

export default memo(TalentSoftSkillsSection)
