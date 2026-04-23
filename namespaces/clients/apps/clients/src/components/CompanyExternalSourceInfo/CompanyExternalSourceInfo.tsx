import React, { ReactElement } from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { isNotNullish } from '@staff-portal/utils'

import { CompanyExternalSourceType } from './config'
import { CompanyExternalSourceTooltip } from './CompanyExternalSourceTooltip'

interface InfoProps {
  value?: string | number | null
  formattedValue?: string | undefined | ReactElement
  userValue?: string | number | null
  type: CompanyExternalSourceType
}

const isExternalSourceValueAvailable = ({ value, userValue }: InfoProps) =>
  isNotNullish(value) && value !== '' && String(value) !== String(userValue)

const CompanyExternalSourceInfo = (props: InfoProps) => {
  if (isExternalSourceValueAvailable(props) === false) {
    return null
  }

  return (
    <Container
      flex
      alignItems='center'
      data-testid={`external-source-${props.type}`}
    >
      <TypographyOverflow size='medium'>
        {props.formattedValue ?? props.value}
      </TypographyOverflow>
      <CompanyExternalSourceTooltip type={props.type} />
    </Container>
  )
}

export default CompanyExternalSourceInfo
