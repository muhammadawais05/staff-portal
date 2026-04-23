import React from 'react'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'

interface Props {
  accountPlan?: string | null
}

const AccountPlan = ({ accountPlan }: Props) => {
  if (!accountPlan) {
    return null
  }

  return (
    <TypographyOverflowLink size='medium'>
      <Link data-testid='account-plan' target='_blank' href={accountPlan}>
        View plan
      </Link>
    </TypographyOverflowLink>
  )
}

export default AccountPlan
