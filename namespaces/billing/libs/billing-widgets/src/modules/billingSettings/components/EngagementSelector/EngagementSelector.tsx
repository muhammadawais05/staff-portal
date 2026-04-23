import { Container, Select, Typography } from '@toptal/picasso'
import { Trans, useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'

import { mapEngagementToListOption } from '../../utils'
import { GetJobHeaderQuery } from '../../data/getJobHeader.graphql.types'

interface Props {
  engagement: string
  engagements: Exclude<
    GetJobHeaderQuery['node'],
    null | undefined
  >['engagements']
  handleOnChange: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: string
    }>
  ) => void
}

const EngagementSelector: FC<Props> = memo(
  ({ engagements, handleOnChange, engagement }) => {
    const { t: translate } = useTranslation('billingSettings')
    const options = mapEngagementToListOption(engagements)
    const name = options?.find(({ value }) => value === engagement)?.text

    return (
      <Container flex align='center' justifyContent='space-between'>
        <Typography data-testid='engagement-label' size='medium'>
          <Trans>{translate('engagement.subtitle', { name })}</Trans>
        </Typography>

        <Container flex align='center' justifyContent='space-evenly'>
          <Container right='small'>
            <Typography size='medium'>
              {translate('engagement.fields.changeEngagement.label')}
            </Typography>
          </Container>
          <Select
            size='small'
            value={engagement}
            data-testid='engagement-selector'
            onChange={handleOnChange}
            options={options}
            placeholder='Select an engagement'
            width='auto'
          />
        </Container>
      </Container>
    )
  }
)

export default EngagementSelector
