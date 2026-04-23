import { Container, Tooltip, Typography } from '@toptal/picasso'
import { Form as PicassoForm } from '@toptal/picasso-forms'
import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { TOOLTIP_MAPPING } from '../../constants'
import { ApplyToDifferentVerticalStep } from '../../types'
import * as S from './styles'

interface Props<T> {
  label: string
  name: string
  steps: T[]
  selectedSteps?: Maybe<T[]>
  centralAlignment?: boolean
}

const ApplyToDifferentVerticalModalStepsColumn = <
  T extends ApplyToDifferentVerticalStep
>({
  label,
  name,
  steps,
  selectedSteps,
  centralAlignment
}: Props<T>) => (
  <Container css={centralAlignment ? S.centralAlignment : undefined}>
    <Container bottom='xsmall'>
      <Typography weight='semibold' size='medium'>
        {label}
      </Typography>
    </Container>
    <PicassoForm.CheckboxGroup name={name}>
      {steps.map(step => (
        <Tooltip key={step} content={TOOLTIP_MAPPING[step]} placement='top'>
          {/* span wrapper to prevent https://material-ui.com/guides/composition/#caveat-with-refs warning */}
          <span>
            <PicassoForm.Checkbox
              disabled={!selectedSteps?.includes(step)}
              label={titleize(step)}
              name={`${name}.${step}`}
              data-testid={step}
            />
          </span>
        </Tooltip>
      ))}
    </PicassoForm.CheckboxGroup>
  </Container>
)

export default ApplyToDifferentVerticalModalStepsColumn
