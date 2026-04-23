import React from 'react'
import { Container, Tag } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getTalentsIndustriesPath } from '@staff-portal/routes'

import { IndustryFragment } from '../../data'
import * as S from './styles'

interface Props {
  industries?: IndustryFragment[]
}

const IndustriesField = ({ industries }: Props) => {
  if (!industries?.length) {
    return null
  }

  return (
    <Tag.Group data-testid='industries-list'>
      {industries.map(industry => (
        <Link
          key={industry.id}
          href={getTalentsIndustriesPath(industry.name)}
          noUnderline
          data-testid='industry-tag-link'
        >
          <Tag variant='blue' css={S.industryField} titleCase={false}>
            <Container css={S.industryName}>{industry.name}</Container>
          </Tag>
        </Link>
      ))}
    </Tag.Group>
  )
}

export default IndustriesField
