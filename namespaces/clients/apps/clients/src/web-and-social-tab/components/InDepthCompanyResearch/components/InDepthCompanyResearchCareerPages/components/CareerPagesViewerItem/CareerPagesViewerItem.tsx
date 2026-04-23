import React from 'react'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'

import { CareerPageFragment } from '../../../../../../data'

const CareerPagesViewerItem = ({ url }: CareerPageFragment) => (
  <TypographyOverflowLink size='medium'>
    <Link href={url || ''}>{url}</Link>
  </TypographyOverflowLink>
)

export default CareerPagesViewerItem
