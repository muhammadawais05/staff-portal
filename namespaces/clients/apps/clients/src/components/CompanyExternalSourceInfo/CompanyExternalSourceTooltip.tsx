import { Container, QuestionMark16, Tooltip } from '@toptal/picasso'
import React from 'react'

import {
  CompanyExternalSourceType,
  CompanyExternalSourceTypeDescription
} from './config'

export const CompanyExternalSourceTooltip = ({
  type
}: {
  type: CompanyExternalSourceType
}) => (
  <Tooltip content={CompanyExternalSourceTypeDescription[type]}>
    <Container flex alignItems='center' left='xsmall'>
      <QuestionMark16 color='dark-grey' />
    </Container>
  </Tooltip>
)

export default CompanyExternalSourceTooltip
