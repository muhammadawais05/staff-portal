import { EmptyState, Section } from '@toptal/picasso'
import React, { memo, useMemo } from 'react'
import {
  asQueryParam,
  QueryParams,
  QueryParamsOptions,
  useQueryParamsState
} from '@staff-portal/query-params-state'
import { SubSection } from '@staff-portal/ui'

import { JobsFilterType } from '../../enums'
import JobsFilter, { JobsFiltersValues } from '../JobsFilter'
import JobItem from '../JobItem'
import JobItemSkeletonLoader from '../JobItemSkeletonLoader'
import { useGetTalentProfileJobs } from './data'

export interface Props {
  talentId: string
}

export const JobsFilterQueryParamOptions = asQueryParam({
  encode: (values: JobsFilterType[]): string[] =>
    values.map(value => value.toLowerCase()),
  decode: (values: string | string[]): JobsFilterType[] => {
    const normalizedValues = Array.isArray(values) ? values : [values]

    return normalizedValues.reduce<JobsFilterType[]>((decodedValues, value) => {
      const decodedValue =
        JobsFilterType[value.toUpperCase() as keyof typeof JobsFilterType] ??
        undefined

      if (decodedValue) {
        decodedValues.push(decodedValue)
      }

      return decodedValues
    }, [])
  }
})

export const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  jobs_filter: JobsFilterQueryParamOptions
}

interface JobQueryParams extends QueryParams {
  jobs_filter?: JobsFilterType[]
}

const JobsTab = ({ talentId }: Props) => {
  const [urlValues, setUrlValues, resolving] =
    useQueryParamsState<JobQueryParams>(QUERY_PARAMS_CONFIG)

  const { data, loading } = useGetTalentProfileJobs({
    talentId,
    jobsFilter: urlValues.jobs_filter,
    skip: resolving
  })

  const jobsFilterValues: JobsFiltersValues = useMemo(
    () => ({
      jobsFilter: urlValues.jobs_filter
    }),
    [urlValues.jobs_filter]
  )

  const content = useMemo(() => {
    if (loading) {
      return <JobItemSkeletonLoader />
    }

    if (!data) {
      return null
    }

    const engagements = data?.engagements.nodes || []

    return (
      <>
        {engagements.length > 0 ? (
          engagements.map((engagement, index) => (
            <SubSection
              key={engagement.id}
              last={index === engagements.length - 1}
            >
              <JobItem engagement={engagement} />
            </SubSection>
          ))
        ) : (
          <EmptyState.Collection>
            There are no jobs to be displayed.
          </EmptyState.Collection>
        )}
      </>
    )
  }, [data, loading])

  return (
    <>
      <JobsFilter
        values={jobsFilterValues}
        onChange={values =>
          setUrlValues({ jobs_filter: values.jobsFilter ?? [] })
        }
      />

      <Section title='Jobs' variant='withHeaderBar'>
        {content}
      </Section>
    </>
  )
}

export default memo(JobsTab)
