import React from 'react'
import { Container, Table, Typography } from '@toptal/picasso'
import { SectionProps } from '@toptal/picasso/Section'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { WatchQueryFetchPolicy } from '@staff-portal/data-layer-service'
import { SubSection } from '@staff-portal/ui'

import {
  BreakRowContent,
  EngagementBreaksSkeletonLoader,
  ScheduleBreakButton
} from './components'
import { useGetEngagementBreaks } from './data'
import { isSectionHidden } from './utils'
import { ENGAGEMENT_UPDATED } from '../../messages'

interface Props {
  engagementId: string
  sectionVariant?: SectionProps['variant']
  fetchPolicy?: WatchQueryFetchPolicy
}

const EngagementBreaks = ({
  engagementId,
  sectionVariant,
  fetchPolicy
}: Props) => {
  const { data, loading, refetch } = useGetEngagementBreaks(
    engagementId,
    fetchPolicy
  )

  useMessageListener(
    ENGAGEMENT_UPDATED,
    message => message.engagementId === engagementId && refetch()
  )

  if (loading) {
    return <EngagementBreaksSkeletonLoader sectionVariant={sectionVariant} />
  }

  if (
    isSectionHidden(data?.status) ||
    !data ||
    data?.engagementBreaks === null
  ) {
    return null
  }

  return (
    <SubSection
      variant={sectionVariant}
      title='Breaks'
      actions={
        <ScheduleBreakButton
          engagementId={engagementId}
          operation={data.operations.scheduleEngagementBreak}
          status={data.status}
        />
      }
      data-testid='engagement-breaks-section'
    >
      {data?.engagementBreaks?.nodes.length ? (
        <Table variant='bordered'>
          <Table.Body>
            {data.engagementBreaks.nodes.map(node => (
              <Table.Row key={node.id} data-testid='EngagementBreaks-row'>
                <BreakRowContent
                  engagementId={engagementId}
                  node={node}
                  engagementStatus={data.status}
                />
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Container
          padded='large'
          flex
          alignItems='center'
          justifyContent='center'
          data-testid='EngagementBreaks-empty-state'
        >
          <Typography size='medium'>
            There are no breaks scheduled for this engagement
          </Typography>
        </Container>
      )}
    </SubSection>
  )
}

export default EngagementBreaks
