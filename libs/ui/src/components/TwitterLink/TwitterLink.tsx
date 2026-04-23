import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

type Props = {
  url: string
  text: string
}

const TwitterLink = ({ url, text }: Props) => (
  <Link data-testid='twitter-link-link' target='_blank' href={url}>
    <TypographyOverflow data-testid='twitter-link-text' color='inherit'>
      {text}
    </TypographyOverflow>
  </Link>
)

export default TwitterLink
