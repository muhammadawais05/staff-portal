import {
  Button,
  Container,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Table,
  Typography,
  SkeletonLoader
} from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'

import { RecentActivityListItem } from '../../components'
import { usePerformedActionsQuery } from '../../data'
import { SearchChroniclesVariables } from '../../types'
import * as S from './styles'

const NoResultMessage = () => (
  <Container padded='medium' flex direction='column' alignItems='center'>
    <Typography variant='heading' size='medium'>
      No recent activity
    </Typography>
  </Container>
)

const Loader = () => (
  <Container>
    <Container
      css={S.widgetHeader}
      flex
      alignItems='center'
      justifyContent='space-between'
    >
      <Container>
        <SkeletonLoader.Typography />
      </Container>

      <SkeletonLoader.Button size='small' />
    </Container>

    <Table css={S.widgetTable}>
      <Table.Body>
        {[...new Array(5)].map((_, index) => (
          // Skeleton loader, no unique identifier
          // eslint-disable-next-line react/no-array-index-key
          <Table.Row key={index}>
            <Table.Cell>
              <SkeletonLoader.Typography />
              <SkeletonLoader.Typography />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Container>
)

export interface Props extends SearchChroniclesVariables {
  fullHistoryUrl: string
  showLinkToCommentDetails?: boolean
}

const RecentActivities = ({
  limit = 5,
  fullHistoryUrl,
  showLinkToCommentDetails,
  ...variables
}: Props) => {
  const {
    data: entries,
    error,
    loading,
    hasMore
  } = usePerformedActionsQuery({
    limit,
    ...variables
  })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <Container padded='medium'>
        <Typography size='medium'>
          Recent activity is temporarily unable to load. Please try again later.
        </Typography>
      </Container>
    )
  }

  const content = entries.length ? (
    <Table css={S.widgetTable}>
      <Table.Body>
        {entries.map(entry => (
          <Table.Row key={entry.performedAction.id}>
            <Table.Cell>
              <RecentActivityListItem
                showLinkToCommentDetails={showLinkToCommentDetails}
                entry={entry}
                fullHistoryUrl={fullHistoryUrl}
                contentFontSize='inherit'
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ) : (
    <NoResultMessage />
  )

  return (
    <Container>
      <Container
        css={S.widgetHeader}
        flex
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography weight='semibold' size='medium' color='black'>
          Recent Activity
        </Typography>

        {hasMore && (
          <Container>
            <Button
              as={Link as typeof PicassoLink}
              size='small'
              variant='secondary'
              fullWidth
              href={fullHistoryUrl}
            >
              Show Full History
            </Button>
          </Container>
        )}
      </Container>

      {content}
    </Container>
  )
}

RecentActivities.displayName = 'RecentActivities'

export default RecentActivities
