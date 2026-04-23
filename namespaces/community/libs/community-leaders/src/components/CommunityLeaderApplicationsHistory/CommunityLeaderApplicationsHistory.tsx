import React from 'react'
import { Container, Grid, SkeletonLoader, Typography } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { DEFAULT_FULL_DATE_FORMAT } from '@staff-portal/date-time-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { useGetCommunityLeaderApplicationsHistory } from '../../data/get-community-leader-applications-history/get-community-leader-applications-history.staff.gql'
import { getCommunityLeaderType } from '../../services/get-community-leader-type'

interface Props {
  communityLeaderId: string
}

const CommunityLeaderApplicationsHistory = ({ communityLeaderId }: Props) => {
  const userDateFormatter = useUserDateFormatter()
  const { data, loading } = useGetCommunityLeaderApplicationsHistory({
    id: communityLeaderId
  })

  if (loading && !data) {
    return (
      <Container top='medium' data-testid='applicationHistoryLoader'>
        {[...Array(8)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Container top='small' key={index}>
            <SkeletonLoader.Typography />
          </Container>
        ))}
      </Container>
    )
  }

  if (!data || data.length === 0) {
    return <Typography>Could not find application history.</Typography>
  }

  return (
    <Grid dir='column' data-testid='applicationsHistoryContent'>
      {data.map(application => (
        <Grid.Item key={application.id}>
          <Container bordered rounded>
            {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
            <DetailedList
              defaultValue='—'
              labelColumnWidth={10}
              items={[
                {
                  label: 'Status',
                  value: application.status
                },
                {
                  label: 'Type',
                  value: application.type
                    ? getCommunityLeaderType(application.type)
                    : null
                },
                {
                  label: 'Is Committed?',
                  value: application.commitment ? 'Yes' : 'No'
                },
                {
                  label: 'Initial Ideas',
                  value: application.initialIdeas
                },
                {
                  label: 'Slack Channel of Interest',
                  value: application.slackChannel
                },
                {
                  label: 'Created At',
                  value: application.createdAt
                    ? userDateFormatter(
                        application.createdAt,
                        DEFAULT_FULL_DATE_FORMAT
                      )
                    : null
                },
                {
                  label: 'Updated At',
                  value: application.updatedAt
                    ? userDateFormatter(
                        application.updatedAt,
                        DEFAULT_FULL_DATE_FORMAT
                      )
                    : null
                },
                {
                  label: 'Comments About Application',
                  value: application.performerComment
                }
              ]}
            />
          </Container>
        </Grid.Item>
      ))}
    </Grid>
  )
}

export default CommunityLeaderApplicationsHistory
