import React from 'react'
import { formatAmount } from '@toptal/picasso/utils'
import { LinkWrapper } from '@staff-portal/ui'

import { RoleUnallocatedMemorandumFragment } from '../../data/role-unallocated-memorandum-fragment'

export type Props = {
  unallocatedMemorandum: RoleUnallocatedMemorandumFragment['unallocatedMemorandum']
}

export const AccountField = ({ unallocatedMemorandum }: Props) => {
  const { totalAmount, webResource } = unallocatedMemorandum

  return (
    <LinkWrapper
      wrapWhen={Boolean(webResource.url)}
      href={webResource.url as string}
    >
      {formatAmount({ amount: Number(totalAmount) })}
    </LinkWrapper>
  )
}

export default AccountField
