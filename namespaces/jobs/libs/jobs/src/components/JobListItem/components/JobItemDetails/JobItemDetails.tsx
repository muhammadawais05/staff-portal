/* eslint-disable complexity */
import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { isNotNullish } from '@staff-portal/utils'
import { NO_VALUE } from '@staff-portal/config'
import { DetailedList } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'

import {
  JobFulfillmentStatus,
  JobStatus,
  JobTimeZoneField,
  JobContactsField,
  JobSpecializationField,
  ReadonlySkillList,
  IndustriesField,
  ClientLinkField,
  TalentField,
  UpdateInvoiceNoteModal,
  CommitmentField,
  JobTypeField
} from '../../../../components'
import {
  showJobFulfillmentStatus,
  shouldRenderCommitment
} from '../../../../utils'
import * as S from './styles'
import { JobListItemFragment } from '../../data'

interface Props {
  job: JobListItemFragment
}

export const JobItemDetails = ({ job }: Props) => {
  const {
    client,
    contacts,
    claimedAt,
    isSpecializable,
    specialization,
    talentCount,
    engagements,
    status,
    postedAt,
    hasPreferredHours,
    timeZonePreference,
    hoursOverlapEnum,
    jobType,
    skillSets,
    industries,
    invoiceNote,
    currentEngagement
  } = job

  const shouldRenderCommitmentField = shouldRenderCommitment({
    talentCount,
    jobStatus: status,
    currentEngagement
  })

  const shouldShowJobFulfillmentStatus = showJobFulfillmentStatus(
    talentCount,
    status
  )

  const canEditInvoiceNote = isOperationEnabled(
    job?.operations.editJobInvoiceNote
  )

  return (
    <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10}>
      <DetailedList.Row>
        <DetailedList.Item
          label='Job Posted'
          value={postedAt && getDateDistanceFromNow(postedAt)}
        />
        <DetailedList.Item
          label={
            shouldShowJobFulfillmentStatus ? 'Fulfillment Status' : 'Status'
          }
        >
          {shouldShowJobFulfillmentStatus ? (
            <JobFulfillmentStatus job={job} />
          ) : (
            <JobStatus job={job} />
          )}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Company'>
          <ClientLinkField client={client} />
        </DetailedList.Item>
        <DetailedList.Item
          label={
            shouldRenderCommitmentField ? 'Commitment' : 'Desired Commitment'
          }
        >
          <CommitmentField job={job} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Job Contacts'>
          <JobContactsField contacts={contacts?.nodes} />
        </DetailedList.Item>
        <DetailedList.Item
          label='Claim Time'
          value={
            isNotNullish(claimedAt)
              ? getDateDistanceFromNow(claimedAt)
              : undefined
          }
        />
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Job Time Zone'>
          <JobTimeZoneField
            timeZonePreference={timeZonePreference}
            hasPreferredHours={hasPreferredHours}
            hoursOverlap={hoursOverlapEnum}
          />
        </DetailedList.Item>
        <DetailedList.Item label='Job Type'>
          <JobTypeField jobType={jobType} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Talent'>
          <TalentField
            talentCount={talentCount}
            jobEngagements={engagements?.nodes}
          />
        </DetailedList.Item>
        {isSpecializable && (
          <DetailedList.Item label='Job Specialization'>
            <JobSpecializationField specialization={specialization} />
          </DetailedList.Item>
        )}
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Skills'>
          <ReadonlySkillList skillSets={skillSets?.nodes} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Industries'>
          {!!industries?.nodes.length && (
            <IndustriesField industries={industries.nodes} />
          )}
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label='Invoice Note'>
          <Container flex alignItems='center' justifyContent='space-between'>
            <TypographyOverflow css={S.dontHideEditButton}>
              {invoiceNote ?? NO_VALUE}
            </TypographyOverflow>
            {canEditInvoiceNote ? <UpdateInvoiceNoteModal job={job} /> : null}
          </Container>
        </DetailedList.Item>
      </DetailedList.Row>
    </DetailedList>
  )
}

export default JobItemDetails
