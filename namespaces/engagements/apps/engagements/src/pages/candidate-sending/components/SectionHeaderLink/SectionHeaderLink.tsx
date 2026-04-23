import { LinkWrapper } from '@staff-portal/ui'
import { TypographyOverflow } from '@toptal/picasso'
import React from 'react'

interface Props {
  text: string
  url?: string | null
  newTab?: boolean
}

const SectionHeaderLink = ({ url, newTab, text }: Props) => (
  <LinkWrapper
    wrapWhen={Boolean(url)}
    href={url as string}
    target={newTab ? '_blank' : undefined}
    data-testid='section-header-link'
  >
    <TypographyOverflow
      size='inherit'
      weight='semibold'
      color='inherit'
      as='span'
    >
      {text}
    </TypographyOverflow>
  </LinkWrapper>
)

export default SectionHeaderLink
