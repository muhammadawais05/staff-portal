import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

export type Props = {
  status: ClientEnterpriseAccountStatusEnum
}

const EnterpriseAccountStatusView = ({ status }: Props) => (
  <TypographyOverflow size='medium'>
    {titleize(status, { capitalizeAllWords: false })}
  </TypographyOverflow>
)

export default EnterpriseAccountStatusView
