import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { InternalTeamFragment } from '../../data'
import { useGetInternalTeamItems } from '../../utils'

export interface Props {
  data: InternalTeamFragment
}

const InternalTeam = ({ data }: Props) => {
  const listItems = useGetInternalTeamItems({ data })

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList
      defaultValue={NO_VALUE}
      labelColumnWidth={10}
      items={listItems}
    />
  )
}

export default InternalTeam
