import React from 'react'
import { Section, Container, Typography } from '@toptal/picasso'
import { JobWorkType } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  AnswerWithComments,
  JobTimeZoneField,
  JOB_UPDATED,
  JOB_WORK_TYPE_TEXT_MAPPING,
  WHO_COVERS_TRAVEL_COSTS_TEXT_MAPPING
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import { GetJobSourcingRequestLocationDetailsDocument } from './data/get-job-sourcing-request-location-details'

const RequiresUpdate = ({
  'data-testid': dataTestId
}: {
  'data-testid'?: string
}) => (
  <Typography color='red' data-testid={dataTestId}>
    Requires Update
  </Typography>
)

export interface Props {
  jobId: string
}

// eslint-disable-next-line complexity
export const SourcingRequestTimeZoneLocationDetails = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestLocationDetailsDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!data && loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Time Zone & Location Details'
        columns={2}
        labelColumnWidth={14}
        items={3}
      />
    )
  }

  if (!data) {
    return null
  }

  const isJobWorkTypeOnsiteOrMixed = data.workType
    ? [JobWorkType.ONSITE, JobWorkType.MIXED].includes(data.workType)
    : false

  const isJobWorkTypeRemoteOrMixed = data.workType
    ? [JobWorkType.REMOTE, JobWorkType.MIXED].includes(data.workType)
    : false

  return (
    <Container top='medium'>
      <Section title='Time Zone & Location Details' variant='withHeaderBar'>
        <DL defaultValue={NO_VALUE} labelColumnWidth={20}>
          <DL.Row>
            <DL.Item
              label='Work Type'
              value={JOB_WORK_TYPE_TEXT_MAPPING[data.workType as JobWorkType]}
            />
          </DL.Row>

          {isJobWorkTypeOnsiteOrMixed && (
            <DL.Row>
              <DL.Item label='On-Site Location'>
                {data.sourcingRequest?.onSiteLocation ? (
                  data.sourcingRequest.onSiteLocation
                ) : (
                  <RequiresUpdate data-testid='onsite-location-requires-update' />
                )}
              </DL.Item>
            </DL.Row>
          )}

          {data.workType === JobWorkType.MIXED && (
            <DL.Row>
              <DL.Item label='On-Site Duration'>
                {data.sourcingRequest?.onSiteDuration ? (
                  data.sourcingRequest.onSiteDuration
                ) : (
                  <RequiresUpdate data-testid='onsite-duration-requires-update' />
                )}
              </DL.Item>
            </DL.Row>
          )}

          {isJobWorkTypeOnsiteOrMixed && (
            <DL.Row>
              <DL.Item
                label='Who will cover the travel costs?'
                multilines
                titleCaseLabels={false}
              >
                <Container data-testid='who-covers-travel-costs'>
                  {data.sourcingRequest?.whoCoversTravelCosts ? (
                    <AnswerWithComments
                      answer={
                        WHO_COVERS_TRAVEL_COSTS_TEXT_MAPPING[
                          data.sourcingRequest?.whoCoversTravelCosts
                        ]
                      }
                      comments={
                        data.sourcingRequest.whoCoversTravelCostsComment
                      }
                    />
                  ) : (
                    <RequiresUpdate data-testid='who-covers-travel-costs-requires-update' />
                  )}
                </Container>
              </DL.Item>
            </DL.Row>
          )}

          {isJobWorkTypeRemoteOrMixed && (
            <DL.Row>
              <DL.Item
                label='Does the client prefer a certain time zone range or location?'
                multilines
                titleCaseLabels={false}
              >
                {data.sourcingRequest?.timeZonePreference ||
                data.sourcingRequest?.timeZonePreferenceComment ? (
                  data.sourcingRequest?.timeZonePreference ? (
                    <AnswerWithComments
                      answer={
                        <Container inline flex>
                          <JobTimeZoneField
                            timeZonePreference={
                              data.sourcingRequest?.timeZonePreference
                            }
                            usePreferredHoursCheck={false}
                            hoursOverlap={data.sourcingRequest?.hoursOverlap}
                          />
                        </Container>
                      }
                      comments={data.sourcingRequest.timeZonePreferenceComment}
                    />
                  ) : (
                    <AnswerWithComments
                      answer='No'
                      comments={data.sourcingRequest?.timeZonePreferenceComment}
                    />
                  )
                ) : (
                  <RequiresUpdate data-testid='client-prefer-timezone-requires-update' />
                )}
              </DL.Item>
            </DL.Row>
          )}

          <DL.Row>
            <DL.Item
              label='Are there any citizenship or visa requirements?'
              multilines
              titleCaseLabels={false}
            >
              <AnswerWithComments
                data-testid='citizenship-requirements'
                answer={
                  data.sourcingRequest?.citizenshipRequirements ? 'Yes' : 'No'
                }
                comments={data.sourcingRequest?.citizenshipRequirementsComment}
              />
            </DL.Item>
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default SourcingRequestTimeZoneLocationDetails
