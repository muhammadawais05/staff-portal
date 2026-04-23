import React, { FocusEventHandler, useMemo, useState } from 'react'
import { Accordion, Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { getApplicableTalentPool } from '../../utils/get-applicable-talent-pool/get-applicable-talent-pool'
import { JobSkillSet } from '../../..'
import { useGetMaxHourlyRateEnhancementsExperiments } from './data/get-max-hourly-rate-enabled/get-max-hourly-rate-enabled.staff.gql'
import { useGetAggregatedTalentClientHourlyRates } from './data/get-aggregated-talent-client-hourly-rates/get-aggregated-talent-client-hourly-rates.staff.gql'
import TalentPoolProgressBar from './TalentPoolProgressBar/TalentPoolProgressBar'
import JobMaxHourlyRateSlider from './JobMaxHourlyRateSlider/JobMaxHourlyRateSlider'
import JobMaxHourlyRateChart from './JobMaxHourlyRateChart'
import * as S from './styles'
import { HourlyRateRange } from './utils/inRange'

type SkillSetType = Pick<JobSkillSet, 'destroy' | 'niceToHave'> & {
  skill: Pick<JobSkillSet['skill'], 'id'>
}

export interface Props {
  expanded: boolean
  skillSets?: SkillSetType[] | null
  verticalId?: string
  jobCommitment?: string
  maxHourlyRate?: HourlyRateRange
  fieldOptions?: React.ReactNode
  onSliderChange?: (maxHourlyRate: number) => void
  edit?: boolean
  className?: string
  children: React.ReactNode
  growField?: boolean
}

const JobMaxHourlyRateWidgets = ({
  children,
  expanded,
  skillSets,
  verticalId,
  jobCommitment,
  maxHourlyRate,
  fieldOptions,
  onSliderChange,
  edit,
  className,
  growField
}: Props) => {
  const { experiments, loading } = useGetMaxHourlyRateEnhancementsExperiments()

  const [focused, setFocused] = useState(false)
  const showAccordion = () => setFocused(true)
  const hideAccordion = () => setFocused(false)

  const stopPropagation: FocusEventHandler<HTMLInputElement> = event =>
    event.stopPropagation()

  const requiredSkillIds = useMemo(() => {
    if (!skillSets) {
      return []
    }

    return skillSets.reduce<string[]>((acc, jobSkillSet) => {
      if (
        !jobSkillSet.destroy &&
        !jobSkillSet.niceToHave &&
        jobSkillSet.skill.id
      ) {
        acc.push(jobSkillSet.skill.id)
      }

      return acc
    }, [])
  }, [skillSets])

  const {
    data: { rates1, rates5 }
  } = useGetAggregatedTalentClientHourlyRates({
    verticalId: verticalId as string,
    requiredSkillIds,
    jobCommitment: jobCommitment as EngagementCommitmentEnum,
    skip: !verticalId || !jobCommitment
  })

  const applicableTalentPool = useMemo(
    () => getApplicableTalentPool(rates1, maxHourlyRate),
    [rates1, maxHourlyRate]
  )

  const fieldTestId = 'job-max-hourly-rate-widgets-field'

  const experimentEnabled = experiments?.maxHourlyRateEnhancements?.enabled

  const showExperiment = experimentEnabled || loading

  return (
    <Container
      onFocus={showAccordion}
      onBlur={hideAccordion}
      className={className}
    >
      {!showExperiment && <div data-testid={fieldTestId}>{children}</div>}

      {showExperiment && (
        <Container alignItems='center' css={S.fieldContainer}>
          <div data-testid={fieldTestId} css={S.field(!!growField)}>
            {children}
          </div>
          <div css={S.progressBarContainer}>
            {loading ? (
              <SkeletonLoader.Typography />
            ) : (
              <TalentPoolProgressBar
                isVisible={!edit || focused}
                applicableTalentPool={applicableTalentPool}
              />
            )}
          </div>
        </Container>
      )}

      <Grid spacing={16} alignItems='center'>
        <Grid.Item small={12}>
          <div
            onFocus={stopPropagation}
            onBlur={hideAccordion}
            data-testid='job-max-hourly-rate-widgets-field-options'
          >
            {fieldOptions}
          </div>
        </Grid.Item>
      </Grid>

      {showExperiment &&
        (loading ? (
          <SkeletonLoader.Media variant='image' width='30rem' height='9rem' />
        ) : (
          <Accordion
            content={
              <Grid>
                <Grid.Item css={!edit ? S.chart : undefined}>
                  <JobMaxHourlyRateChart
                    maxHourlyRate={maxHourlyRate}
                    rates={rates5}
                  />
                </Grid.Item>
                {edit && (
                  <Grid.Item css={S.sliderGrid}>
                    <JobMaxHourlyRateSlider
                      onFocus={showAccordion}
                      onChange={value => onSliderChange?.(value)}
                      maxHourlyRate={maxHourlyRate as number}
                    />
                  </Grid.Item>
                )}
              </Grid>
            }
            expanded={!edit || (focused && expanded)}
            borders='none'
          />
        ))}
    </Container>
  )
}

export default JobMaxHourlyRateWidgets
