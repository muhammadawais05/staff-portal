import React, { ReactNode } from 'react'
import { Link } from '@staff-portal/navigation'

import TypographyOverflowLink from '../TypographyOverflowLink'

type Props = {
  href: string
  text?: ReactNode
}

const ExternalLink = ({ href, text }: Props) => (
  <TypographyOverflowLink>
    <Link href={href} target='_blank'>
      {text ?? href}
    </Link>
  </TypographyOverflowLink>
)

export default ExternalLink
