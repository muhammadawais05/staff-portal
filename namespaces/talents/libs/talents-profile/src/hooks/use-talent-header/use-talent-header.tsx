import React, { useCallback } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@staff-portal/error-handling'
import {
  TALENT_UPDATED,
  TalentHeader,
  TalentHeaderSkeleton
} from '@staff-portal/talents'
import { RoleFlags } from '@staff-portal/role-flags'

import { useTalentHeaderData } from '../use-talent-header-data'

const useTalentHeader = (talentId: string) => {
  const { showDevError } = useNotifications()

  const { data, loading, refetch } = useTalentHeaderData({
    talentId,
    onError: () => showDevError('Unable to fetch talent header data.')
  })

  useMessageListener(
    TALENT_UPDATED,
    ({ talentId: id }) => talentId === id && refetch()
  )

  const renderHeader = useCallback(() => {
    if (loading && !data) {
      return <TalentHeaderSkeleton />
    }

    if (!data?.node) {
      return null
    }

    const { fullName, photo, talentPartner } = data.node

    const talentPartnerName = talentPartner?.webResource?.text
    const talentPartnerUrl = talentPartner?.webResource?.url

    return (
      <TalentHeader
        fullName={fullName}
        photo={photo?.small}
        talentPartnerName={talentPartnerName}
        talentPartnerUrl={talentPartnerUrl}
        flags={<RoleFlags roleId={talentId} showTooltipActions />}
      />
    )
  }, [data, loading, talentId])

  return { renderHeader, talentName: data?.node?.fullName }
}

export default useTalentHeader
