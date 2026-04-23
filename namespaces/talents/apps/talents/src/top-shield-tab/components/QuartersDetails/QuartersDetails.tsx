import React, { memo } from 'react'
import { Container, EmptyState, Section, Typography } from '@toptal/picasso'
import {
  DetailedList,
  SectionWithDetailedListSkeleton,
  SubSection
} from '@staff-portal/ui'
import { TalentTopShieldFragment } from '@staff-portal/talents-top-shield'
import { TopShieldApplicationStatus } from '@staff-portal/graphql/staff'
import { formatDate } from '@staff-portal/date-time-utils'
import { NO_VALUE } from '@staff-portal/config'

import { AddQuarterButton, UpdateQuarterButton } from './components'
import { getQuarterName } from './utils'

export interface Props {
  topShieldApplication: TalentTopShieldFragment['topShieldApplication'] | null
  loading: boolean
}

const QuartersDetails = ({ topShieldApplication, loading }: Props) => {
  const isHidden =
    topShieldApplication &&
    [
      TopShieldApplicationStatus.NOT_A_FIT,
      TopShieldApplicationStatus.PROSPECTIVE_CANDIDATE
    ].includes(topShieldApplication.status)

  const quarters = topShieldApplication?.quarters

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Quarters Details'
        columns={2}
        items={4}
      />
    )
  }

  if (!topShieldApplication || isHidden) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        title='Quarters Details'
        data-testid='quarters-details-section'
        actions={
          <AddQuarterButton
            id={topShieldApplication.id}
            operation={
              topShieldApplication.operations.createTopShieldApplicationQuarter
            }
          />
        }
      >
        {quarters?.nodes?.length === 0 ? (
          <EmptyState.Collection>There are no quarters.</EmptyState.Collection>
        ) : (
          quarters?.nodes?.map((quarter, index, { length }) => (
            <SubSection
              key={quarter.id}
              last={index === length - 1}
              hideBorder
              title={getQuarterName(quarter)}
              titleSize='small'
              actions={
                <UpdateQuarterButton
                  operation={
                    quarter.operations.updateTopShieldApplicationQuarter
                  }
                  {...quarter}
                />
              }
            >
              <DetailedList labelColumnWidth={12}>
                <DetailedList.Row>
                  <DetailedList.Item label='Eligible Date Period'>
                    <Typography weight='semibold' size='medium'>
                      <Container as='span' flex alignItems='center'>
                        {quarter.startDate && quarter.endDate
                          ? `${formatDate(
                              new Date(quarter.startDate)
                            )} to ${formatDate(new Date(quarter.endDate))}`
                          : NO_VALUE}
                      </Container>
                    </Typography>
                  </DetailedList.Item>
                </DetailedList.Row>
                <DetailedList.Row>
                  <DetailedList.Item label='Eligible Payment End Date'>
                    <Typography weight='semibold' size='medium'>
                      <Container as='span' flex alignItems='center'>
                        {quarter.paymentEndDate
                          ? formatDate(new Date(quarter.paymentEndDate))
                          : NO_VALUE}
                      </Container>
                    </Typography>
                  </DetailedList.Item>
                </DetailedList.Row>
              </DetailedList>
            </SubSection>
          ))
        )}
      </Section>
    </Container>
  )
}

export default memo(QuartersDetails)
