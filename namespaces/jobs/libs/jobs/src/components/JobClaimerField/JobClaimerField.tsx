import React from 'react'
import {
  Container,
  ExclamationSolid16,
  Tooltip,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { WebResourceFragment } from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'

interface Props {
  claimer?: WebResourceFragment | null
  claimerReplacement?: WebResourceFragment | null
}

const JobClaimerField = ({ claimer, claimerReplacement }: Props) => {
  const currentClaimer = claimerReplacement ?? claimer

  const currentClaimerLink = currentClaimer?.webResource?.url ?? ''
  const currentClaimerName = currentClaimer?.webResource?.text ?? NO_VALUE

  const shouldWrapWithLink = Boolean(currentClaimerLink)

  return (
    <Container flex alignItems='center' css={S.minWidth}>
      {claimer && claimerReplacement && (
        <Tooltip
          interactive
          maxWidth='none'
          content={
            <Container>
              <Typography color='inherit'>
                {`Temporary Recruiter: ${claimerReplacement.webResource.text}`}
              </Typography>
              <Typography color='inherit'>
                {`Primary Recruiter: ${claimer.webResource.text} (On vacation)`}
              </Typography>
            </Container>
          }
        >
          <Container flex alignItems='center' right='xsmall'>
            <ExclamationSolid16
              color='blue'
              data-testid='JobClaimerField-tooltip-icon'
            />
          </Container>
        </Tooltip>
      )}

      <LinkWrapper
        wrapWhen={shouldWrapWithLink}
        href={currentClaimerLink}
        data-testid='JobClaimerField-link'
        css={S.minWidth}
      >
        <TypographyOverflow
          size='medium'
          weight='semibold'
          color={shouldWrapWithLink ? 'inherit' : 'dark-grey'}
        >
          {currentClaimerName}
        </TypographyOverflow>
      </LinkWrapper>
    </Container>
  )
}

export default JobClaimerField
