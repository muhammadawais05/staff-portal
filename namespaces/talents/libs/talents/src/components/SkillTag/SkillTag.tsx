import React, { memo } from 'react'
import {
  Container,
  Indicator,
  Link16,
  Tag,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { SkillRating } from '@staff-portal/graphql/staff'
import { getTalentsSearchPathBySkill } from '@staff-portal/routes'

import * as S from './styles'

const RANK_STYLE = {
  [SkillRating.COMPETENT]: S.rank1,
  [SkillRating.STRONG]: S.rank2,
  [SkillRating.EXPERT]: S.rank3
}

export interface Props {
  name: string
  rating?: SkillRating
  connectionsCount?: number
  hasLink?: boolean
  highlighted?: boolean
}

const SkillTag = ({
  name,
  rating = SkillRating.COMPETENT,
  connectionsCount = 0,
  highlighted = false,
  hasLink = true
}: Props) => (
  <Tag
    forwardedAs={hasLink ? Link : 'div'}
    css={[S.skillTag, RANK_STYLE[rating]]}
    {...(hasLink ? { noUnderline: true } : {})}
    href={hasLink ? getTalentsSearchPathBySkill(name, rating) : undefined}
    data-testid='skill-tag-link'
  >
    <Container as='span' flex alignItems='center'>
      {highlighted && (
        <Container as='span' right='xsmall'>
          <Indicator color='green' />
        </Container>
      )}

      <Container inline css={S.skillName}>
        <TypographyOverflow color='inherit'>{name}</TypographyOverflow>
      </Container>

      {connectionsCount > 0 && (
        <>
          <Link16 css={S.connectionsIcon} />
          <Typography as='span' color='inherit' size='medium'>
            {connectionsCount}
          </Typography>
        </>
      )}
    </Container>
  </Tag>
)

export default memo(SkillTag)
