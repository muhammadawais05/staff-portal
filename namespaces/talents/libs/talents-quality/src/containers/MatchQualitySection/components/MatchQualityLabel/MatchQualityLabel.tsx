import { Container, QuestionMark16, Tooltip, Typography } from '@toptal/picasso'
import React from 'react'
import { LinkWrapper, MarkdownWithHtml } from '@staff-portal/ui'

interface Props {
  label: string
  labelTooltip: string
  link?: string | null
}

const MatchQualityLabel = ({ label, link, labelTooltip }: Props) => {
  return (
    <Container flex alignItems='center'>
      <Typography weight='semibold'>
        <LinkWrapper wrapWhen={Boolean(link)} href={link as string}>
          {label}
        </LinkWrapper>
      </Typography>
      <Tooltip
        content={
          <MarkdownWithHtml allowDangerousHtml linkProps={{ target: '_blank' }}>
            {labelTooltip}
          </MarkdownWithHtml>
        }
        interactive
      >
        <Container
          flex
          left='xsmall'
          data-testid='match-quality-label-tooltip-icon'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default MatchQualityLabel
