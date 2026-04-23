import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { PaginationParams } from '@staff-portal/filters'
import { QueryParams } from '@staff-portal/query-params-state'
import { ApplicantSkillRating } from '@staff-portal/graphql/staff'

import JobSkillsFilterItem from './components/JobSkillsFilterItem'
import useGetJobSkills from './hooks/use-get-job-skills'
import useJobSkillsFilter from './hooks/use-job-skills-filter'

export interface Props {
  jobId: string
  filterValues: QueryParams
  handleFilterChange: (values: PaginationParams) => void
  ratingOverride?: ApplicantSkillRating
}

export const JobSkillsFilter = ({
  jobId,
  filterValues,
  handleFilterChange,
  ratingOverride
}: Props) => {
  const { data } = useGetJobSkills(jobId)
  const { selectedSkills, handleSkillDeselect, handleSkillSelect } =
    useJobSkillsFilter({ filterValues, handleFilterChange })

  const skillSets = data?.skillSets?.nodes
  const webResource = data?.webResource

  if (!skillSets?.length) {
    return null
  }

  // TODO: use Helpbox component once this issue is resolved:
  // https://toptal-core.atlassian.net/browse/FX-1824
  return (
    <Container
      variant='blue'
      rounded
      padded='medium'
      bottom='medium'
      data-testid='job-skills-filter'
    >
      <Container bottom='small'>
        <Typography variant='heading' size='small'>
          Search Modified
        </Typography>
      </Container>
      <Container bottom='xsmall'>
        {webResource && (
          <Typography size='medium' variant='body' color='black'>
            This search was initiated from the job{' '}
            <LinkWrapper
              target='_blank'
              wrapWhen={Boolean(webResource.url)}
              href={webResource.url as string}
            >
              {webResource.text}
            </LinkWrapper>{' '}
            with the following required skills:
          </Typography>
        )}
      </Container>
      <Container>
        {skillSets.map(skillSet => (
          <JobSkillsFilterItem
            key={skillSet.id}
            ratingOverride={ratingOverride}
            skillSet={skillSet}
            selectedSkills={selectedSkills}
            onSkillSelect={handleSkillSelect}
            onSkillDeselect={handleSkillDeselect}
          />
        ))}
      </Container>
      <Typography size='xsmall'>
        You can select skills which must be present on the talent profile (by
        default we look for similar skills).
      </Typography>
    </Container>
  )
}

export default JobSkillsFilter
