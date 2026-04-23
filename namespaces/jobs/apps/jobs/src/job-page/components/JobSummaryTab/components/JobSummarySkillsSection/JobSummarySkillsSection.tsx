import React, { useMemo } from 'react'
import {
  Section,
  CheckSolid16,
  Container,
  ExclamationSolid16,
  Typography
} from '@toptal/picasso'
import { FieldCheckResult } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import {
  DetailedList as DL,
  DescriptionFormatter,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { IndustriesField, getJobSkillSetFields } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import { GetJobSummarySkillsDocument } from './data/get-job-skills.staff.gql.types'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

interface Props {
  jobId: string
}

const JobSummarySkillsSection = ({ jobId }: Props) => {
  const { data, loading } = useGetNode(GetJobSummarySkillsDocument)({ jobId })

  const skillSetFields = useMemo(
    () => getJobSkillSetFields(data?.skillSets?.nodes),
    [data?.skillSets?.nodes]
  )

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Skills'
        columns={2}
        labelColumnWidth={10}
        items={10}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        title={
          <>
            <Container inline right='small'>
              Skills
            </Container>
            {data.fieldCheck?.skills === FieldCheckResult.COMPLETE ? (
              <CheckSolid16
                color='green'
                data-testid='SummaryField-green-icon'
              />
            ) : (
              <ExclamationSolid16
                color='red'
                data-testid='SummaryField-red-icon'
              />
            )}
          </>
        }
      >
        <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
          {skillSetFields.map(field => (
            <DL.Row key={field.label}>
              <DL.Item label={field.label} value={field.value} />
            </DL.Row>
          ))}

          <DL.Row>
            <DL.Item label='Industries'>
              <IndustriesField industries={data.industries?.nodes} />
            </DL.Item>
          </DL.Row>
        </DL>

        {data.description && (
          <Container left='small' top='small'>
            <Typography size='medium' as='div'>
              <DescriptionFormatter
                blockSpacing='small'
                text={data.description}
              />
            </Typography>
          </Container>
        )}
      </Section>
    </Container>
  )
}

export default JobSummarySkillsSection
