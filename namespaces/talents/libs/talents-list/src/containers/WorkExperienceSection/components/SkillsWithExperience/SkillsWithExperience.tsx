import React from 'react'
import { Table, Tag } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { compareAlphabetically } from '@staff-portal/string'

import * as S from './styles'
import { TalentSkillSetFragment } from '../../data/get-talent-skills-with-experience/get-talent-skills-with-experience.staff.gql.types'

interface Props {
  skills?: TalentSkillSetFragment[]
}

const SkillsWithExperience = ({ skills }: Props) => {
  if (!skills) {
    return null
  }

  const sortedSkills = [...skills].sort((first, second) =>
    compareAlphabetically(first.skill.name, second.skill.name)
  )

  return (
    <Table css={S.table} variant='clear'>
      <Table.Body>
        {sortedSkills.map(({ skill, experience }) => (
          <Table.Row key={skill.id} css={S.tableRow}>
            <Table.Cell>
              <LinkWrapper
                wrapWhen={Boolean(skill.skillPage?.publicUrl)}
                href={skill.skillPage?.publicUrl as string}
                target='_blank'
                css={S.skill}
                data-testid='skill-link'
              >
                <Tag
                  titleCase={false}
                  css={[skill.skillPage?.publicUrl && S.skillLink]}
                >
                  {skill.name}
                </Tag>
              </LinkWrapper>
            </Table.Cell>
            <Table.Cell>{experience} years</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default SkillsWithExperience
