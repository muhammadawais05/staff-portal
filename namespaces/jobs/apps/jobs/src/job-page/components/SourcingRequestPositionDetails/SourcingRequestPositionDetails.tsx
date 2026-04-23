import React, { useMemo } from 'react'
import { Section, TypographyOverflow, Container, Tag } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { useUserDateFormatter } from '@staff-portal/current-user'
import {
  AnswerWithComments,
  JobSkillTag,
  JOB_UPDATED,
  JobSkillSetFragment
} from '@staff-portal/jobs'
import { SourcingRequestPositionsField } from '@staff-portal/jobs-sourcing-requests'
import { NO_VALUE } from '@staff-portal/config'

import { GetJobSourcingRequestPositionDetailsDocument } from './data/get-job-sourcing-request-details'

const renderSkillTags = (skills?: JobSkillSetFragment[]) => (
  <Container inline>
    <Tag.Group>
      {skills?.map(skill => (
        <JobSkillTag
          enableTooltip={false}
          showRequiredIcon={false}
          skillSet={skill}
          key={skill.id}
        />
      ))}
    </Tag.Group>
  </Container>
)

interface Props {
  jobId: string
}

// eslint-disable-next-line complexity
export const SourcingRequestPositionDetails = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestPositionDetailsDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  const formatDateTime = useUserDateFormatter()
  const [mustHaveSkills, niceToHaveSkills] = useMemo(() => {
    const skillSets = data?.sourcingRequest?.skillSets?.nodes

    return [
      skillSets?.filter(skill => !skill.niceToHave),
      skillSets?.filter(skill => skill.niceToHave)
    ]
  }, [data?.sourcingRequest?.skillSets?.nodes])

  if (!data && loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Position Details'
        columns={2}
        labelColumnWidth={14}
        items={3}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container top='medium'>
      <Section title='Position Details' variant='withHeaderBar'>
        <DL defaultValue={NO_VALUE} labelColumnWidth={20}>
          <DL.Row>
            <DL.Item
              label='How many positions require sourcing?'
              multilines
              titleCaseLabels={false}
            >
              <SourcingRequestPositionsField
                positionsCount={data.sourcingRequest?.positions}
                positionsComment={data.sourcingRequest?.positionsComment}
              />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='Is there any extra information about the job description?'
              multilines
              titleCaseLabels={false}
            >
              <TypographyOverflow data-testid='sourcing-request-extrainfo'>
                {data.sourcingRequest?.extraInformation
                  ? data?.sourcingRequest.extraInformationComment
                  : 'No'}
              </TypographyOverflow>
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='What are the job selling points?'
              multilines
              titleCaseLabels={false}
              value={data.sourcingRequest?.sellingPoints}
            />
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='What are the must-have skills for this job?'
              multilines
              titleCaseLabels={false}
            >
              {(!!mustHaveSkills?.length ||
                data.sourcingRequest?.mustHaveSkillsComment) && (
                <AnswerWithComments
                  data-testid='sourcing-request-must-skills'
                  answer={
                    mustHaveSkills?.length
                      ? renderSkillTags(mustHaveSkills)
                      : null
                  }
                  comments={data.sourcingRequest?.mustHaveSkillsComment}
                />
              )}
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='What are the nice-to-have skills for this job?'
              multilines
              titleCaseLabels={false}
            >
              {(!!niceToHaveSkills?.length ||
                data.sourcingRequest?.niceToHaveSkillsComment) && (
                <AnswerWithComments
                  data-testid='sourcing-request-nice-skills'
                  answer={
                    niceToHaveSkills?.length
                      ? renderSkillTags(niceToHaveSkills)
                      : null
                  }
                  comments={data.sourcingRequest?.niceToHaveSkillsComment}
                />
              )}
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='What is the job start deadline?'
              multilines
              titleCaseLabels={false}
            >
              <AnswerWithComments
                data-testid='sourcing-request-deadline'
                answer={formatDateTime(data.sourcingRequest?.jobStartDeadline)}
                comments={data.sourcingRequest?.jobStartDeadlineComment}
              />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='Does the client require further qualification interviews?'
              multilines
              titleCaseLabels={false}
            >
              <AnswerWithComments
                data-testid='sourcing-request-qualification'
                answer={
                  data.sourcingRequest?.furtherQualificationInterviews
                    ? 'Yes'
                    : 'No'
                }
                comments={
                  data.sourcingRequest?.furtherQualificationInterviewsComment
                }
              />
            </DL.Item>
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default SourcingRequestPositionDetails
