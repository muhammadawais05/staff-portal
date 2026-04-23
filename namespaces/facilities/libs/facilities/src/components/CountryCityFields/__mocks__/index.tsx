import React from 'react'

import { CountryFragment } from '../../../data'

const MockComponent = ({
  countries,
  disabled,
  'data-testid': testId = 'testId',
  loading,
  placeholder,
  name,
  required
}: {
  countries: CountryFragment[]
  name?: string
  required?: boolean
  loading?: boolean
  disabled?: boolean
  placeholder?: string
  'data-testid': string
}) => (
  <div data-testid={testId}>
    <span data-testid={`${testId}-countries`}>{countries}</span>
    <span data-testid={`${testId}-disabled`}>{disabled}</span>
    <span data-testid={`${testId}-loading`}>{loading}</span>
    <span data-testid={`${testId}-placeholder`}>{placeholder}</span>
    <span data-testid={`${testId}-name`}>{name}</span>
    <span data-testid={`${testId}-required`}>{required}</span>
  </div>
)

export default MockComponent
