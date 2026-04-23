import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import { useRepresentativeListItems } from '../../services/use-representative-list-items'

type Props = {
  representative: RepresentativeFragment
}

const ProfileDetails = ({ representative }: Props) => {
  const items = useRepresentativeListItems(representative)

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList
      items={items}
      columns={1}
      labelColumnWidth={12}
      defaultValue={NO_VALUE}
    />
  )
}

export default ProfileDetails
