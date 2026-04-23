import React from 'react'
import { Section } from '@toptal/picasso'
import { ClientIcon } from '@staff-portal/clients'

import EngagementBadge from '../EngagementBadge'
import { useGetEngagementClient } from './data'
import {
  EngagementCompanyDetailedList,
  EngagementCompanySkeletonLoader
} from './components'

export interface Props {
  engagementId: string
  labelColumnWidth?: number
}

const EngagementCompany = ({ engagementId, labelColumnWidth }: Props) => {
  const { data: client, loading } = useGetEngagementClient(engagementId)

  if (!client) {
    return null
  }

  const {
    id,
    email,
    contact,
    billingPhone,
    timeZone,
    photo,
    fullName,
    webResource
  } = client

  if (loading) {
    return <EngagementCompanySkeletonLoader />
  }

  return (
    <Section
      title='Company'
      variant='withHeaderBar'
      data-testid='engagement-company-section'
    >
      <EngagementBadge
        fullName={fullName}
        photo={photo}
        profileLink={webResource}
        defaultAvatar={<ClientIcon />}
        data-testid='engagement-company-badge'
      />

      <EngagementCompanyDetailedList
        id={id}
        email={email}
        contact={contact}
        timeZone={timeZone}
        billingPhone={billingPhone}
        labelColumnWidth={labelColumnWidth}
      />
    </Section>
  )
}

export default EngagementCompany
