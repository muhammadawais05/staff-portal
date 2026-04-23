import React, { useMemo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { ProbabilityToConvertFeature } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { formatAsPercentage } from '@staff-portal/utils'

import { ProbabilityToConvertFragment } from '../../../../data'
import {
  JOB_PROBABILITY_TO_CONVERT_COLOR_MAPPING,
  JOB_PROBABILITY_TO_CONVERT_FEATURE_NAMES_TEXT_MAPPING
} from '../../../../config'

export interface Props {
  probabilityToConvertData: ProbabilityToConvertFragment
  estimatedRevenue?: string | null
  estimatedValue?: string | null
}

const getLabel = (
  features: ProbabilityToConvertFeature[],
  label: 'positive' | 'negative'
) => features?.map(item => ({ ...item, label: label })) ?? []

const ProbabilityToConvertTooltipContent = ({
  probabilityToConvertData: {
    positiveFeatures,
    negativeFeatures,
    category,
    score
  },
  estimatedRevenue,
  estimatedValue
}: Props) => {
  const mergedFeatures = useMemo(
    () => [
      ...getLabel(positiveFeatures, 'positive'),
      ...getLabel(negativeFeatures, 'negative')
    ],
    [negativeFeatures, positiveFeatures]
  )

  return (
    <>
      <Typography size='medium' weight='semibold'>
        Probability to convert
      </Typography>

      {score && (
        <Container
          flex
          justifyContent='space-between'
          data-testid='probability-to-convert-score'
        >
          <Typography size='xsmall'>
            Score:{' '}
            <Typography as='span' weight='semibold'>
              {formatAsPercentage(Number(score))}
            </Typography>
          </Typography>

          <Typography
            color={JOB_PROBABILITY_TO_CONVERT_COLOR_MAPPING[category]}
            size='xsmall'
            weight='semibold'
          >
            ({titleize(category)})
          </Typography>
        </Container>
      )}

      {!!mergedFeatures?.length && (
        <Container bottom='xsmall'>
          <Typography size='xsmall' weight='semibold'>
            Factors:
          </Typography>

          {mergedFeatures.map((feature, index) => (
            <Container
              key={feature.position}
              flex
              justifyContent='space-between'
            >
              <Typography size='xsmall'>
                {index + 1}.{' '}
                <Container
                  as='span'
                  right='xsmall'
                  data-testid={`probability-to-convert-${feature.label}-factor`}
                >
                  {JOB_PROBABILITY_TO_CONVERT_FEATURE_NAMES_TEXT_MAPPING[
                    feature.name
                  ] ?? titleize(feature.name)}
                  :
                </Container>
              </Typography>

              <Typography
                size='xsmall'
                weight='semibold'
                color={feature.label === 'positive' ? 'green' : 'red'}
              >
                {titleize(feature.value)}
              </Typography>
            </Container>
          ))}
        </Container>
      )}

      {(estimatedRevenue || estimatedValue) && (
        <>
          <Typography size='medium' weight='semibold'>
            Estimations
          </Typography>

          {estimatedRevenue && (
            <Typography
              size='xsmall'
              data-testid='probability-to-convert-revenue-estimation'
            >
              Estimated revenue:{' '}
              <Typography as='span' size='medium' weight='semibold'>
                {formatAmount({ amount: estimatedRevenue })}
              </Typography>
            </Typography>
          )}

          {estimatedValue && (
            <Typography
              size='xsmall'
              data-testid='probability-to-convert-value-estimation'
            >
              Estimated value:{' '}
              <Typography as='span' size='medium' weight='semibold'>
                {formatAmount({ amount: estimatedValue })}
              </Typography>
            </Typography>
          )}
        </>
      )}
    </>
  )
}

export default ProbabilityToConvertTooltipContent
