import { Container, Tag, TagProps } from '@toptal/picasso'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'

import { TalentSpecializationFieldFragment } from '../../data'

export type Props = {
  specializations: TalentSpecializationFieldFragment[]
}

const prepareSpecializations = (
  specializations: TalentSpecializationFieldFragment[],
  status: TalentSpecializationApplicationStatus
): string[] =>
  specializations
    .filter(specialization => specialization.status === status)
    .map(specialization => specialization.specialization?.title)
    .filter(isNotNullish)
    .sort()

const specializationToTag = (
  variant: TagProps['variant'],
  specialization: string
) => (
  <Tag key={specialization} data-testid='specialization-tag' variant={variant}>
    {specialization}
  </Tag>
)

const SpecializationsField = ({ specializations }: Props) => {
  const approved = prepareSpecializations(
    specializations,
    TalentSpecializationApplicationStatus.APPROVED
  )

  const pending = prepareSpecializations(
    specializations,
    TalentSpecializationApplicationStatus.PENDING
  )

  if (!approved.length && !pending.length) {
    return <>{NO_VALUE}</>
  }

  return (
    <Container data-testid='specializations-field'>
      <Tag.Group>
        {approved.map(tag => specializationToTag('blue', tag))}
        {pending.map(tag => specializationToTag('red', tag))}
      </Tag.Group>
    </Container>
  )
}

export default SpecializationsField
