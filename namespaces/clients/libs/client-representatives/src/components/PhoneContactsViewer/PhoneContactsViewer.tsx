import React from 'react'
import { Typography } from '@toptal/picasso'
import { EditableFieldArrayView } from '@staff-portal/editable'
import { PhoneCategory } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import PhoneContactViewItem from '../PhoneContactViewItem/PhoneContactViewItem'
import { AdditionalPhoneCategory } from '../../types'

type Props = {
  nodes?: {
    id: string
    note?: string | null
    value: string
    primary: boolean
    phoneCategory?: PhoneCategory | AdditionalPhoneCategory | null
  }[]
  nodeData?: { companyRepresentativeId: string; clientId?: string }
}

const PhoneContactsViewer = ({ nodes, nodeData }: Props) => {
  if (!nodes?.length) {
    return (
      <Typography data-testid='PhoneContactsViewer-text'>{NO_VALUE}</Typography>
    )
  }

  return (
    <EditableFieldArrayView
      nodes={nodes}
      viewer={PhoneContactViewItem}
      nodeData={nodeData}
    />
  )
}

export default PhoneContactsViewer
