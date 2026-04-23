import React from 'react'

import AvailableReferrals from './components/AvailableReferrals/AvailableReferrals'
import ReferralsSectionLoader from './components/ReferralsSectionLoader/ReferralsSectionLoader'
import ReferringSteps from './components/ReferringSteps/ReferringSteps'
import { useGetReferrals } from './data/get-referrals/get-referrals.staff.gql'

const ReferralsSection = () => {
  const { data, loading } = useGetReferrals()

  if (loading && !data) {
    return <ReferralsSectionLoader />
  }

  if (!data) {
    return null
  }

  const { recentlyReferredRoles, ...restData } = data
  const referrals = recentlyReferredRoles?.edges

  if (referrals?.length) {
    return (
      <AvailableReferrals
        referrals={referrals}
        hasMore={data.recentlyReferredRoles?.hasMore}
      />
    )
  }

  return <ReferringSteps {...restData} />
}

export default ReferralsSection
