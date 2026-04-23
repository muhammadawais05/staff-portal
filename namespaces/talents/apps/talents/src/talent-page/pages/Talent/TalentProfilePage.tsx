import React, { useMemo, useEffect } from 'react'
import {
  useParams,
  navigateExternallyTo,
  Redirect
} from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { getTalentProfilePath, getDashboardPath } from '@staff-portal/routes'
import { PageLoader } from '@staff-portal/ui'

import { useGetTalentWebResource } from './data/get-talent-web-resource'
import TalentProfileContent from './TalentProfileContent'

const TalentProfilePage = () => {
  const { id: talentLegacyId } = useParams<{ id: string }>()
  const talentId = useMemo(
    () => encodeEntityId(talentLegacyId, 'Talent'),
    [talentLegacyId]
  )

  const { data, loading } = useGetTalentWebResource(talentId)

  const webResourceUrl = data?.webResource?.url

  useEffect(() => {
    if (
      !loading &&
      webResourceUrl &&
      !webResourceUrl.includes(getTalentProfilePath(talentLegacyId))
    ) {
      // redirect to talent resume page
      return navigateExternallyTo(webResourceUrl as string)
    }

    return
  }, [loading, webResourceUrl, talentLegacyId])

  if (!loading && !webResourceUrl) {
    return <Redirect to={getDashboardPath()} />
  }

  if (
    !loading &&
    webResourceUrl &&
    webResourceUrl.includes(getTalentProfilePath(talentLegacyId))
  ) {
    return (
      <TalentProfileContent
        talentId={talentId}
        talentLegacyId={talentLegacyId}
      />
    )
  }

  return <PageLoader />
}

export default TalentProfilePage
