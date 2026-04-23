import { Typography } from '@toptal/picasso'
import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { ClientFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { getClientContentItems } from '../../utils'
import { ClientCardType } from '../../utils/get-clients-configuration'

export interface Props {
  client: ClientFragment
  type: ClientCardType
  timeZone?: string
}

export const ClientCardContent = ({ client, timeZone, type }: Props) => {
  return (
    <Typography as='div' size='medium'>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        labelColumnWidth={10}
        defaultValue={NO_VALUE}
        columns={2}
        items={getClientContentItems(client, type, timeZone)}
      />
    </Typography>
  )
}
