import React from 'react'
import { DetailedList as DL, WrapWithTooltip } from '@staff-portal/ui'
import { Typography, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { LabelRequiredPrefix } from '../../../../../../components'
import * as S from '../../../../../../styles'
import { useCandidateSendingContext } from '../../../../../../hooks'

type Props = {
  commitmentSettingsHoursOptions?: number[]
  commitmentSettingsApplicable?: boolean | null
}

const CommitmentCreateHoursItem = ({
  commitmentSettingsHoursOptions = [],
  commitmentSettingsApplicable
}: Props) => {
  const {
    stepsAttributes: { commitment }
  } = useCandidateSendingContext()

  if (!commitment || commitment !== EngagementCommitmentEnum.HOURLY) {
    return null
  }

  if (!commitmentSettingsApplicable) {
    return null
  }

  const commitmentCreateHoursOptions = commitmentSettingsHoursOptions.map(
    item => ({
      text: item.toString(),
      value: item
    })
  )

  return (
    <>
      <DL.Row css={S.centerItemAlign}>
        <DL.Item
          label={
            <>
              <LabelRequiredPrefix />
              {'Minimum Commitment'}
            </>
          }
        >
          <Container flex alignItems='center'>
            <WrapWithTooltip
              enableTooltip
              interactive={false}
              content={`Minimum Commitment is a fee charged to the client when a billing cycle
              has less than 5 hrs/week logged for an hourly engagement.
              It's different from the Estimated Weekly Hours, which is an estimate for the weekly workload`}
            >
              <Form.Select
                name='commitmentCreateHours'
                options={commitmentCreateHoursOptions}
                required
              />
            </WrapWithTooltip>

            <Container left='xsmall'>
              <Typography as='span'>hours per week</Typography>
            </Container>
          </Container>
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Minimum Commitment Change Reason' multilines>
          <Form.Input
            rows={4}
            name='commitmentComment'
            css={S.formFieldWidth}
            multiline
          />
        </DL.Item>
      </DL.Row>
    </>
  )
}

export default CommitmentCreateHoursItem
