import React, { memo } from 'react'
import { Section } from '@toptal/picasso'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import {
  TopShieldSkill,
  TopShieldStatus,
  TopShieldSegment,
  TopShieldStartDate,
  TopShieldOutreachStatus,
  TopShieldOutreachStage,
  TopShieldInterviewCompletedOn,
  TopShieldContractSignedDate,
  TopShieldInitialPitchDate,
  TopShieldScheduledEndDate,
  TalentTopShieldFragment
} from '@staff-portal/talents-top-shield'
import { isOperationDisabled } from '@staff-portal/operations'
import { TopShieldApplicationStatus } from '@staff-portal/graphql/staff'

export interface Props {
  talentId: string
  topShieldApplication: TalentTopShieldFragment['topShieldApplication']
  loading: boolean
}

const TopShieldDetails = ({
  talentId,
  topShieldApplication,
  loading
}: Props) => {
  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='TopShield Details'
        columns={2}
        items={10}
      />
    )
  }

  if (!topShieldApplication) {
    return null
  }

  const showOutreachFields = [
    TopShieldApplicationStatus.PROSPECTIVE_CANDIDATE,
    TopShieldApplicationStatus.NOT_A_FIT,
    TopShieldApplicationStatus.FORMER
  ].includes(topShieldApplication.status)

  return (
    <Section
      variant='withHeaderBar'
      title='TopShield Details'
      data-testid='top-shield-details-section'
    >
      <DL labelColumnWidth={12}>
        <DL.Row>
          <DL.Item label='Status'>
            <TopShieldStatus
              applicationId={topShieldApplication.id}
              talentId={talentId}
              status={topShieldApplication.status}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateStatus
              )}
            />
          </DL.Item>
          <DL.Item label='Segment'>
            <TopShieldSegment
              applicationId={topShieldApplication.id}
              talentId={talentId}
              segment={topShieldApplication.segment}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateSegment
              )}
            />
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Initial Pitch Date'>
            <TopShieldInitialPitchDate
              talentId={talentId}
              applicationId={topShieldApplication.id}
              date={topShieldApplication.initialPitchDate}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateInitialPitchDate
              )}
            />
          </DL.Item>
          <DL.Item label='Interview Completed On'>
            <TopShieldInterviewCompletedOn
              talentId={talentId}
              applicationId={topShieldApplication.id}
              date={topShieldApplication.interviewCompletedDate}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateInterviewCompletedDate
              )}
            />
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Contract Signed Date'>
            <TopShieldContractSignedDate
              talentId={talentId}
              applicationId={topShieldApplication.id}
              date={topShieldApplication.contractSignedDate}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateContractSignedDate
              )}
            />
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='TopShield Start Date'>
            <TopShieldStartDate
              talentId={talentId}
              applicationId={topShieldApplication.id}
              date={topShieldApplication.startDate}
              endDate={topShieldApplication.scheduledEndDate}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateStartDate
              )}
            />
          </DL.Item>

          <DL.Item label='Scheduled End Date'>
            <TopShieldScheduledEndDate
              talentId={talentId}
              applicationId={topShieldApplication.id}
              date={topShieldApplication.scheduledEndDate}
              startDate={topShieldApplication.startDate}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateScheduledEndDate
              )}
            />
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='TopShield Skill'>
            <TopShieldSkill
              talentId={talentId}
              applicationId={topShieldApplication.id}
              skill={topShieldApplication.skill}
              operationDisabled={isOperationDisabled(
                topShieldApplication.operations.updateSkill
              )}
            />
          </DL.Item>
        </DL.Row>
        {showOutreachFields && (
          <DL.Row>
            <DL.Item label='Outreach Stage'>
              <TopShieldOutreachStage
                applicationId={topShieldApplication.id}
                talentId={talentId}
                outreachStage={topShieldApplication.outreachStage}
                operationDisabled={isOperationDisabled(
                  topShieldApplication.operations
                    .updateTopShieldApplicationOutreachStage
                )}
              />
            </DL.Item>
            <DL.Item label='Outreach Status'>
              <TopShieldOutreachStatus
                applicationId={topShieldApplication.id}
                talentId={talentId}
                outreachStatus={topShieldApplication.outreachStatus}
                operationDisabled={isOperationDisabled(
                  topShieldApplication.operations
                    .updateTopShieldApplicationOutreachStatus
                )}
              />
            </DL.Item>
          </DL.Row>
        )}
      </DL>
    </Section>
  )
}

export default memo(TopShieldDetails)
