import React, { ComponentPropsWithoutRef } from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { WebResourceLink } from '@staff-portal/ui'

const LinkOverflow = ({
  link,
  ...rest
}: ComponentPropsWithoutRef<typeof WebResourceLink>) => {
  return (
    <TypographyOverflow size='medium' tooltipContent={link.text}>
      <WebResourceLink link={link} {...rest} />
    </TypographyOverflow>
  )
}

export default LinkOverflow
