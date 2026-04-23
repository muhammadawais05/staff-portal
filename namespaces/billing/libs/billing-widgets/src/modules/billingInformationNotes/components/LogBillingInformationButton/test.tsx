import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import LogBillingInformationNotes from '.'

const mockHandleSubmit = jest.fn()
const mockHandleOnSuccess = jest.fn()

jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleSubmit: () => mockHandleSubmit,
  handleOnSubmissionError: jest.fn()
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: mockHandleOnSuccess
  })
)
jest.mock('../../data/getClientDefaultNoteAnswers.graphql.types', () => ({
  useGetClientDefaultNoteAnswersLazyQuery: () => [
    jest.fn(),
    { loading: false, data: {} }
  ]
}))
jest.mock('../../data/setLogClientBillingInformation.graphql.types', () => ({
  useSetLogClientBillingInformationMutation: () => [
    jest.fn(),
    { loading: false, data: {} }
  ]
}))

const render = (props: ComponentProps<typeof LogBillingInformationNotes>) =>
  renderComponent(<LogBillingInformationNotes {...props} />)

describe('LogBillingInformationButton', () => {
  it('renders a button', () => {
    const { getByTestId } = render({
      formContainer: { current: null },
      clientId: 'VjEtQ29tcGFueS0xMjM0NQ',
      variant: 'secondary'
    })

    expect(getByTestId('LogBillingInformationButton')).toBeInTheDocument()
  })
})
