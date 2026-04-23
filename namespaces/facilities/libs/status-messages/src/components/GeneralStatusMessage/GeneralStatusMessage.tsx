import { StatusMessageTag } from '@staff-portal/graphql/staff'
import React from 'react'

import { StatusMessageFragment } from '../../data/status-message-fragment'
import GeneralStatusMessageDefault from '../GeneralStatusMessageDefault/GeneralStatusMessageDefault'
import GeneralStatusMessageHandoff from '../GeneralStatusMessageHandoff/GeneralStatusMessageHandoff'
import GeneralStatusMessageTimezone from '../GeneralStatusMessageTimezone/GeneralStatusMessageTimezone'

interface Props {
  data: StatusMessageFragment
  onClose: Function
}

const GeneralStatusMessage = ({ data, onClose }: Props) => {
  switch (data.tag) {
    case StatusMessageTag.WRONG_TIME_ZONE:
      return (
        <GeneralStatusMessageTimezone statusMessage={data} onClose={onClose} />
      )
    case StatusMessageTag.HANDOFF_FINISHED:
      return <GeneralStatusMessageHandoff />
    default:
      return (
        <GeneralStatusMessageDefault statusMessage={data} onClose={onClose} />
      )
  }
}

export default GeneralStatusMessage
