import React from 'react'
import { Tag, TypographyOverflow } from '@toptal/picasso'
import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'

import { TalentSpecializationsFragment } from '../../../../data/talent-fragment'
import * as S from './styles'

type TalentSpecializationColor = 'light-grey' | 'green' | 'yellow' | 'red'

const SPECIALIZATION_APPLICATION_COLOR: Record<
  TalentSpecializationApplicationStatus,
  TalentSpecializationColor
> = {
  [TalentSpecializationApplicationStatus.PENDING]: 'yellow',
  [TalentSpecializationApplicationStatus.APPROVED]: 'green',
  [TalentSpecializationApplicationStatus.REJECTED]: 'red',
  [TalentSpecializationApplicationStatus.REJECTED_INACTIVE]: 'red',
  [TalentSpecializationApplicationStatus.CANCELLED]: 'light-grey'
}

export const getTalentSpecializations = ({
  specializationApplications
}: TalentSpecializationsFragment) => {
  const nodes = specializationApplications?.nodes ?? []

  const specializations = nodes.filter(({ specialization }) =>
    Boolean(specialization?.title)
  )

  if (!specializations.length) {
    return
  }

  return (
    <Tag.Group css={S.tagGroup}>
      {specializations.map(({ id, status, specialization }) => {
        if (!status) {
          return null
        }

        return (
          <Tag
            key={id}
            variant={SPECIALIZATION_APPLICATION_COLOR[status]}
            css={S.tag}
            data-testid='talent-specialization'
          >
            <TypographyOverflow color='inherit'>
              {specialization?.title}
            </TypographyOverflow>
          </Tag>
        )
      })}
    </Tag.Group>
  )
}
