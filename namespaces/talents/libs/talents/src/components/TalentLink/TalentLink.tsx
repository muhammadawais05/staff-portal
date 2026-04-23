import { TypographyOverflow } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import React, { ComponentProps } from 'react'
import { LinkWrapper } from '@staff-portal/ui'

interface Props {
  fullName: Maybe<string>
  url: Maybe<string>
  target?: string
  size?: ComponentProps<typeof TypographyOverflow>['size']
  weight?: ComponentProps<typeof TypographyOverflow>['weight']
  'data-testid'?: string
}

const TalentLink = ({
  fullName,
  url,
  target,
  size = 'medium',
  weight = 'regular',
  'data-testid': dataTestId
}: Props) => (
  <LinkWrapper
    href={url as string}
    wrapWhen={Boolean(url)}
    target={target}
    noUnderline
  >
    <TypographyOverflow
      size={size}
      color='inherit'
      weight={weight}
      data-testid={dataTestId}
    >
      {fullName}
    </TypographyOverflow>
  </LinkWrapper>
)

export default TalentLink
