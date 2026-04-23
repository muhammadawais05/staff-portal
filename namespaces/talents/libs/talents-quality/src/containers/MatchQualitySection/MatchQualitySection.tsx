import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { Section, Container } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Maybe } from '@staff-portal/graphql/staff'

import * as S from './styles'
import MatchQualitySkeletonLoader from '../../components/MatchQualitySkeletonLoader/MatchQualitySkeletonLoader'
import MatchQualitySubSection from './components/MatchQualitySubSection/MatchQualitySubSection'
import { useGetMatchQualitySectionWithJob } from './data/get-match-quality-section-with-job/get-match-quality-section-with-job.staff.gql'
import { useGetMatchQualitySection } from './data/get-match-quality-section/get-match-quality-section.staff.gql'
import {
  talentJobMatchNames,
  talentProfileNames,
  talentPastPerformanceNames
} from '../../constants'

interface Props {
  talentId: string
  jobId?: string
  hideTitle?: boolean
}

const getJobMatchTitle = (
  jobId?: string,
  webResource?: { text: string; url?: Maybe<string> }
) => {
  const DEFAULT_TITLE = 'Job Match'

  if (!jobId || !webResource) {
    return DEFAULT_TITLE
  }

  return (
    <span>
      {`${DEFAULT_TITLE} - `}
      <Link href={webResource.url || ''}>{`${webResource.text}`}</Link>
    </span>
  )
}

// eslint-disable-next-line complexity
const MatchQualitySection = ({ talentId, jobId, hideTitle }: Props) => {
  const { showError } = useNotifications()
  const onError = () => showError('Unable to fetch match quality.')

  const { metrics, loading, error } = useGetMatchQualitySection({
    talentId,
    onError,
    skip: Boolean(jobId)
  })

  const {
    metrics: metricsJob,
    job,
    loading: loadingWithJob,
    error: errorJob
  } = useGetMatchQualitySectionWithJob({
    talentId,
    jobId: jobId || '',
    onError,
    skip: !jobId
  })

  const hasError = error || errorJob
  const isLoading = loading || loadingWithJob

  const currentMetrics = jobId ? metricsJob : metrics
  const qualityMetrics = currentMetrics?.matchQualityMetrics?.nodes

  if (hasError && !qualityMetrics) {
    return null
  }

  const title = hideTitle ? '' : 'Match Quality'

  if (isLoading || !qualityMetrics) {
    return (
      <Section title={title} css={S.container}>
        <MatchQualitySkeletonLoader />
      </Section>
    )
  }

  return (
    <Section
      title={title}
      data-testid='match-quality-section'
      css={S.container}
    >
      <Container>
        {jobId && (
          <MatchQualitySubSection
            fieldNames={talentJobMatchNames}
            metrics={qualityMetrics}
            title={getJobMatchTitle(jobId, job?.webResource)}
          />
        )}
        <MatchQualitySubSection
          fieldNames={talentProfileNames}
          metrics={qualityMetrics}
          title='Profile'
        />
        <MatchQualitySubSection
          fieldNames={talentPastPerformanceNames}
          metrics={qualityMetrics}
          title='Past Performance'
        />
      </Container>
    </Section>
  )
}

export default MatchQualitySection
