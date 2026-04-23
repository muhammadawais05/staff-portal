import React, { useMemo } from 'react'
import { Container, Grid } from '@toptal/picasso'
import { getPerformedActionsPath } from '@staff-portal/routes'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { RecentActivities } from '@staff-portal/chronicles'

interface Props {
  userId: string
  order?: number
}

const RecentActivity = ({ userId, order }: Props) => {
  const feeds = useMemo(() => {
    const { type, id } = decodeEntityId(userId)

    return [[encodeGid(type, id)]]
  }, [userId])

  return (
    <Grid.Item small={6} style={{ order }} data-testid='recent-activity'>
      <Container bordered rounded padded='medium'>
        <RecentActivities
          feeds={feeds}
          showLinkToCommentDetails={false}
          fullHistoryUrl={getPerformedActionsPath()}
        />
      </Container>
    </Grid.Item>
  )
}

export default RecentActivity
