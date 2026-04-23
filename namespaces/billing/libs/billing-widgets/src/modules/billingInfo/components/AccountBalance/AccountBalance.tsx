import React from 'react'
import { Link } from '@topkit/react-router'
import { Amount, Typography } from '@toptal/picasso'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

type Props = {
  accountBalance?: string | null
  accountBalanceUrl?: string | null
}

const AccountBalance = ({ accountBalance, accountBalanceUrl }: Props) => {
  if (!accountBalance) {
    return (
      <Typography data-testid='AccountBalance-empty-data'>
        {EMPTY_DATA}
      </Typography>
    )
  }

  const accountBalanceAmount = (
    <Amount
      data-testid='AccountBalance-accountBalanceAmount'
      color={accountBalanceUrl ? 'inherit' : undefined}
      amount={accountBalance}
      weight='semibold'
      size='medium'
    />
  )

  if (accountBalanceUrl) {
    return (
      <Link href={accountBalanceUrl} data-testid='AccountBalance-link'>
        {accountBalanceAmount}
      </Link>
    )
  }

  return accountBalanceAmount
}

export default AccountBalance
