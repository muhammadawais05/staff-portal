import {
  CheckSolid16,
  Container,
  ExclamationSolid16,
  Typography
} from '@toptal/picasso'
import React from 'react'
import { MatchQualityMetricValue } from '@staff-portal/graphql/staff'
import { MarkdownWithHtml, WrapWithTooltip } from '@staff-portal/ui'

import * as S from './styles'

interface Props {
  tooltipContent?: string | null
  value: MatchQualityMetricValue
}

const VALUE_MAPPER = {
  [MatchQualityMetricValue.PASSED]: (
    <CheckSolid16 color='green' data-testid='match-quality-passed' />
  ),
  [MatchQualityMetricValue.FAILED]: (
    <ExclamationSolid16 color='red' data-testid='match-quality-failed' />
  ),
  [MatchQualityMetricValue.NOT_AVAILABLE]: (
    <Typography size='medium' data-testid='match-quality-not-available'>
      N/A
    </Typography>
  )
}

const MatchQualityValue = ({ value, tooltipContent }: Props) => {
  const icon = VALUE_MAPPER[value]
  const isNA = value === MatchQualityMetricValue.NOT_AVAILABLE
  const iconWithWrapper = (
    <Container
      css={isNA ? S.notAvailableAlignment : undefined}
      data-testid='match-quality-value-tooltip-icon'
    >
      {icon}
    </Container>
  )

  return (
    <Container flex justifyContent='flex-end' right='medium'>
      <WrapWithTooltip
        enableTooltip={!!tooltipContent}
        content={
          <MarkdownWithHtml allowDangerousHtml linkProps={{ target: '_blank' }}>
            {tooltipContent}
          </MarkdownWithHtml>
        }
      >
        {iconWithWrapper}
      </WrapWithTooltip>
    </Container>
  )
}

export default MatchQualityValue
