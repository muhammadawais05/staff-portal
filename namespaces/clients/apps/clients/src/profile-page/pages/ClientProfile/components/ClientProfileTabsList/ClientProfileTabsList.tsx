import React from 'react'
import { NavigationTabsList } from '@staff-portal/ui'
import { Badge } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  ClientTabValue,
  TOPSCREEN_FEATURE_ENABLED
} from '@staff-portal/clients'

import { useGetCompanyTabsInfo } from '../../data'

type Props = {
  clientId: string
  tabValues: typeof ClientTabValue
}

const ClientProfileTabsList = ({ clientId, tabValues }: Props) => {
  const { companyTabsInfo, loading, userPermissions, refetch } =
    useGetCompanyTabsInfo(clientId)

  useMessageListener(
    [TOPSCREEN_FEATURE_ENABLED],
    ({ clientId: messageClientId }) => clientId === messageClientId && refetch()
  )

  return (
    <NavigationTabsList loading={loading}>
      <NavigationTabsList.Tab label='Basic Info' value={tabValues.BASIC_INFO} />

      <NavigationTabsList.Tab
        label='Internal Data'
        value={tabValues.INTERNAL_DATA}
      />

      <NavigationTabsList.Tab label='Notes' value={tabValues.NOTES} />

      <NavigationTabsList.Tab
        label='Jobs'
        value={tabValues.COMPANY_JOBS}
        icon={
          <Badge
            content={companyTabsInfo?.jobs?.totalCount ?? 0}
            variant='white'
          />
        }
        hidden={!userPermissions?.canViewJob}
      />

      <NavigationTabsList.Tab
        label='Contacts'
        value={tabValues.CONTACTS}
        icon={
          <Badge
            variant='white'
            content={companyTabsInfo?.representatives.totalCount ?? 0}
          />
        }
      />

      <NavigationTabsList.Tab
        label='Web & Social'
        value={tabValues.WEB_AND_SOCIAL}
      />

      <NavigationTabsList.Tab label='Legal' value={tabValues.LEGAL} />

      <NavigationTabsList.Tab label='Billing' value={tabValues.BILLING} />

      <NavigationTabsList.Tab
        label='TopScreen'
        value={tabValues.TOPSCREEN}
        hidden={!companyTabsInfo?.topscreenClient}
      />
    </NavigationTabsList>
  )
}

export default ClientProfileTabsList
