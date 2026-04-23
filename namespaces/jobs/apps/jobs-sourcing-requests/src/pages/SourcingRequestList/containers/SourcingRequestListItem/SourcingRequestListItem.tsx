import React, { useMemo } from 'react'
import { Container, Section, Tag } from '@toptal/picasso'
import { DetailedList, LinkWrapper } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { JobCommitment } from '@staff-portal/graphql/staff'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import {
  CommitmentFormatter,
  JobClaimerField,
  JobSkillTag,
  JobSpecializationField,
  JobTypeField,
  JobWorkTypeField
} from '@staff-portal/jobs'
import {
  SourcingRequestBusinessTypeField,
  SourcingRequestLinkedTalentsCountField,
  SourcingRequestPositionsField,
  SourcingRequestSpecialistField,
  SourcingRequestStatusField
} from '@staff-portal/jobs-sourcing-requests'

import { getSourcingRequestSkills } from '../../../../utils/get-sourcing-request-skills/get-sourcing-request-skills'
import { SourcingRequestsListItemFragment } from '../../../../data/sourcing-requests-list-item-fragment/sourcing-requests-list-item-fragment.staff.gql.types'

export interface Props {
  sourcingRequest: SourcingRequestsListItemFragment
}

const renderLink = (text?: string | null, url?: string | null) => (
  <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
    {text}
  </LinkWrapper>
)

const SourcingRequestListItem = ({ sourcingRequest }: Props) => {
  const { mustHaveSkills, niceToHaveSkills } = useMemo(
    () => getSourcingRequestSkills(sourcingRequest),
    [sourcingRequest]
  )

  if (!sourcingRequest?.job) {
    return null
  }

  const {
    createdAt,
    claimedAt,
    clientPartner,
    id: sourcingRequestId,
    job,
    status,
    talentSpecialist,
    webResource
  } = sourcingRequest

  return (
    <Section
      variant='withHeaderBar'
      data-testid='sourcing-request-list-item'
      title={renderLink(webResource.text, webResource.url)}
    >
      <Container>
        <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10}>
          <DetailedList.Row>
            <DetailedList.Item
              label='Request Posted'
              value={createdAt && getDateDistanceFromNow(createdAt)}
            />

            <DetailedList.Item label='Status'>
              <SourcingRequestStatusField
                jobId={job.id}
                sourcingRequestId={sourcingRequestId}
                sourcingRequestStatus={status}
              />
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item
              label='Claimed at'
              value={claimedAt && getDateDistanceFromNow(claimedAt)}
            />

            <DetailedList.Item label='Talent Specialist'>
              <SourcingRequestSpecialistField
                jobId={job.id}
                talentSpecialistId={talentSpecialist?.id}
                sourcingRequestId={sourcingRequestId}
                talentSpecialistFullName={talentSpecialist?.webResource.text}
                talentSpecialistUrl={talentSpecialist?.webResource.url}
              />
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Client Partner'>
              {renderLink(
                clientPartner?.webResource.text,
                clientPartner?.webResource.url
              )}
            </DetailedList.Item>

            <DetailedList.Item label='Job Claimer'>
              <JobClaimerField
                claimer={job.claimer}
                claimerReplacement={job.claimerHandoff?.replacement}
              />
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Company'>
              {renderLink(
                job.client.webResource.text,
                job.client.webResource.url
              )}
            </DetailedList.Item>

            <DetailedList.Item label='Business Type'>
              <SourcingRequestBusinessTypeField
                businessType={job.client?.businessType}
                isEnterprise={!!job.client?.enterprise}
              />
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Work Type'>
              <JobWorkTypeField workType={job.workType} />
            </DetailedList.Item>

            <DetailedList.Item label='Job Type'>
              <JobTypeField jobType={job.jobType} />
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Desired Commitment'>
              {job.commitment && (
                <CommitmentFormatter
                  commitment={job.commitment.toUpperCase() as JobCommitment}
                />
              )}
            </DetailedList.Item>

            <DetailedList.Item label='Job Specialization'>
              <JobSpecializationField specialization={job.specialization} />
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Must-Have Skills' multilines>
              {!!mustHaveSkills?.length && (
                <Container inline>
                  <Tag.Group>
                    {mustHaveSkills?.map(skill => (
                      <JobSkillTag
                        enableTooltip={false}
                        showRequiredIcon={false}
                        skillSet={skill}
                        key={skill.id}
                      />
                    ))}
                  </Tag.Group>
                </Container>
              )}
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Nice-to-Have Skills' multilines>
              {!!niceToHaveSkills?.length && (
                <Container inline>
                  <Tag.Group>
                    {niceToHaveSkills?.map(skill => (
                      <JobSkillTag
                        enableTooltip={false}
                        showRequiredIcon={false}
                        skillSet={skill}
                        key={skill.id}
                      />
                    ))}
                  </Tag.Group>
                </Container>
              )}
            </DetailedList.Item>
          </DetailedList.Row>

          <DetailedList.Row>
            <DetailedList.Item label='Positions'>
              <SourcingRequestPositionsField
                positionsCount={sourcingRequest?.positions}
              />
            </DetailedList.Item>

            <DetailedList.Item label='Linked Talent'>
              <SourcingRequestLinkedTalentsCountField
                talentsCount={
                  sourcingRequest.sourcingRequestTalents?.totalCount
                }
              />
            </DetailedList.Item>
          </DetailedList.Row>
        </DetailedList>
      </Container>
    </Section>
  )
}

export default SourcingRequestListItem
