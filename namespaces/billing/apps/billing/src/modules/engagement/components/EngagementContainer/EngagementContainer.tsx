import React, { FC, memo } from 'react'
import PageLoader from '@staff-portal/billing/src/components/PageLoader'
import { EngagementContext } from '@staff-portal/billing-widgets/src/modules/engagement/context'
import { useGetEngagement } from '@staff-portal/billing-widgets/src/modules/engagement/data'

const displayName = 'EngagementContainer'

interface Props {
  engagementId: string
}

const EngagementContainer: FC<Props> = memo(({ children, engagementId }) => {
  const { data: engagement, loading } = useGetEngagement(engagementId)

  if (loading) {
    return <PageLoader />
  }

  if (!engagement) {
    return null
  }

  return (
    <EngagementContext.Provider value={engagement}>
      {children}
    </EngagementContext.Provider>
  )
})

EngagementContainer.displayName = displayName

export default EngagementContainer
