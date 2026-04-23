import { Typography, Container } from '@toptal/picasso'
import { FormTimeZoneSelect } from '@staff-portal/forms'
import { DetailedList as DL } from '@staff-portal/ui'
import React from 'react'
import { getRoleTypeText } from '@staff-portal/facilities'

import { useCandidateSendingContext } from '../../../../../../hooks'
import { LabelRequiredPrefix } from '../../../../../../components'
import * as S from '../../../../../../styles'

type Props = {
  talentType: string
}

const TimeZoneNameItem = ({ talentType }: Props) => {
  const { stepsAttributes } = useCandidateSendingContext()
  const roleTypeText = getRoleTypeText(talentType)

  if (!stepsAttributes.hasPendingAssignment) {
    return null
  }

  return (
    <>
      <DL.Row>
        <DL.Item
          multilines
          label={
            <>
              <LabelRequiredPrefix />
              {'What time zone start date is defined in?'}
            </>
          }
        >
          <Container css={S.formFieldWidth}>
            <FormTimeZoneSelect name='timeZoneName' required />
            <Container top='xsmall'>
              <Typography size='xxsmall' as='div'>
                {`You can specify time zone to point out that ${roleTypeText} started on the morning of that time zone`}
              </Typography>
            </Container>
          </Container>
        </DL.Item>
      </DL.Row>
    </>
  )
}

export default TimeZoneNameItem
