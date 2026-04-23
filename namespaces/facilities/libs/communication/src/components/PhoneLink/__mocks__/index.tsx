import React from 'react'

interface Props {
  'data-testid': string
  roleId: string
  phoneContactId: string
  phoneContactValue?: string
}

const MockedComponent = ({
  roleId,
  phoneContactId,
  phoneContactValue,
  'data-testid': testId = 'PhoneLink'
}: Props) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-roleId`}>{roleId}</div>
    <div data-testid={`${testId}-phoneContactId`}>{phoneContactId}</div>
    <div data-testid={`${testId}-phoneContactValue`}>{phoneContactValue}</div>
  </div>
)

export default MockedComponent
