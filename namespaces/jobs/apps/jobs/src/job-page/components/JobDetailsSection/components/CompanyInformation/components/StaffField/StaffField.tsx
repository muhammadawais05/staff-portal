import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

interface Props {
  url?: string | null
  fullName?: string
  testId?: string
}

const StaffField = ({ url, fullName, testId }: Props) => {
  const shouldWrap = Boolean(url)

  return (
    <LinkWrapper
      wrapWhen={shouldWrap}
      href={url as string}
      data-testid={testId}
    >
      <TypographyOverflow
        as='span'
        size='medium'
        weight='semibold'
        color={shouldWrap ? 'inherit' : 'dark-grey'}
      >
        {fullName}
      </TypographyOverflow>
    </LinkWrapper>
  )
}

export default StaffField
