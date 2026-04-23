import React from 'react'
import { Container, Tag, Typography, Image, Grid } from '@toptal/picasso'
import { TalentWorkExperiencePortfolioItemFragment } from '@staff-portal/talents'

import * as S from './styles'
import ConditionalWrapSkillTag from '../ConditionalWrapSkillTag/ConditionalWrapSkillTag'

interface Props {
  item: TalentWorkExperiencePortfolioItemFragment
  hasTalentDesignerRole: boolean
  onClick?: () => void
}

const PortfolioItemWithImage = ({
  item,
  hasTalentDesignerRole,
  onClick
}: Props) => {
  return (
    <Grid.Item css={S.itemWrapper} small={4}>
      <Container
        bordered
        bottom='xsmall'
        padded='xsmall'
        css={S.imageWrapper}
        onClick={onClick}
      >
        {item?.coverPhoto?.coverUrl && (
          <Image
            src={item?.coverPhoto?.coverUrl}
            alt={item.title}
            title={item.title}
            css={S.image}
            data-testid='portfolio-cover-image'
          />
        )}
        <Container
          css={[
            S.itemOverlay,
            hasTalentDesignerRole
              ? S.itemOverlayDesigner
              : S.itemOverlayFinanceExpert
          ]}
        >
          <Typography
            variant='heading'
            size='medium'
            invert
            css={[S.itemTitle, !hasTalentDesignerRole && S.itemTitleVisible]}
            id='portfolio-title'
            data-testid='portfolio-title'
          >
            {item.title}
          </Typography>
        </Container>
      </Container>

      <Tag.Group css={S.skillsList}>
        {item.skills.nodes.map(({ id, name, skillPage }) => (
          <ConditionalWrapSkillTag
            key={id}
            data-testid='skill-tag-link'
            skillPage={skillPage?.publicUrl}
          >
            <Tag
              data-testid='skill-tag'
              css={[S.skill, skillPage?.publicUrl && S.skillLink]}
              key={id}
            >
              {name}
            </Tag>
          </ConditionalWrapSkillTag>
        ))}
      </Tag.Group>
    </Grid.Item>
  )
}

export default PortfolioItemWithImage
