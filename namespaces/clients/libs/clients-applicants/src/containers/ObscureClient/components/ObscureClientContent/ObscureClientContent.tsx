import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { DetailedList } from '@staff-portal/ui'
import { ClientFragment } from '@staff-portal/clients'

import { getObscureClientContentItems } from './services/get-obscure-client-content-items/get-obscure-client-content-items'

export interface Props {
  company: ClientFragment
}

const ObscureClientContent = ({ company }: Props) => {
  const currentUser = useGetCurrentUser()

  return (
    // eslint-disable-next-line @toptal/davinci/no-deprecated-props
    <DetailedList
      labelColumnWidth={10}
      items={getObscureClientContentItems(
        company,
        currentUser?.timeZone?.value
      )}
    />
  )
}

export default ObscureClientContent
