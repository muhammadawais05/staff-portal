import React, { ComponentProps } from 'react'

import SubmittedField from '../SubmittedField'

const MockComponent = ({
  answeredAt
}: ComponentProps<typeof SubmittedField>) => (
  <div data-testid='SubmittedField'>
    <div data-testid='SubmittedField-answeredAt'>{answeredAt}</div>
  </div>
)

export default MockComponent
