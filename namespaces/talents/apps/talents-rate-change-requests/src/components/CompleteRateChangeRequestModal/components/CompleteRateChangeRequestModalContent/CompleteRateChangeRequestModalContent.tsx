import React from 'react'
import { Container, Grid, Typography } from '@toptal/picasso'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import { RateChangeRequestFragment } from '../../../../data'
import { RateLabel } from '../'

type Props = Pick<
  RateChangeRequestFragment,
  'requestTypeEnumValue' | 'currentRate' | 'desiredRate' | 'talentComment'
>

const CompleteRateChangeRequestModalContent = ({
  requestTypeEnumValue,
  currentRate,
  desiredRate,
  talentComment
}: Props) => {
  const isConsultation =
    requestTypeEnumValue === RateChangeRequestTypeEnum.CONSULTATION

  return (
    <Container bottom='small'>
      <Grid>
        <Grid.Item small={6}>
          <RateLabel label='Current Hourly Rate' amount={currentRate} />
        </Grid.Item>

        {!isConsultation && (
          <Grid.Item small={6}>
            <RateLabel label='Desired Hourly Rate' amount={desiredRate} />
          </Grid.Item>
        )}
      </Grid>

      <Container top='small'>
        <Typography size='medium'>Comment from talent:</Typography>
        <Typography size='medium'>{talentComment ?? NO_VALUE}</Typography>
      </Container>
    </Container>
  )
}

export default CompleteRateChangeRequestModalContent
