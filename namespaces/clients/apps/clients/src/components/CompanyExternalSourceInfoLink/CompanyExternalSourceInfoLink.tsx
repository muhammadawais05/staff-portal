import React from 'react'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'

import CompanyExternalSourceInfo, {
  CompanyExternalSourceType
} from '../CompanyExternalSourceInfo'

interface InfoLinkProps {
  value?: string | number | null
  userValue?: string | number | null
  type: CompanyExternalSourceType
  url: string | null | undefined
}

const CompanyExternalSourceInfoLink = ({
  value,
  userValue,
  url,
  type
}: InfoLinkProps) => (
  <CompanyExternalSourceInfo
    value={value}
    formattedValue={
      <TypographyOverflowLink size='medium' as='span'>
        <Link href={url ?? ''} target='_blank' rel='noopener'>
          {value}
        </Link>
      </TypographyOverflowLink>
    }
    userValue={userValue}
    type={type}
  />
)

export default CompanyExternalSourceInfoLink
