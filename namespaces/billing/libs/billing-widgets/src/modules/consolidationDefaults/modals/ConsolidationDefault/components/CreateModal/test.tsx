import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ConsolidationDefaultCreateModal from '.'

jest.mock('../ModalForm')

jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: mockHandleOnSuccess
  })
)

jest.mock('../../data', () => ({
  useGetDataForConsolidationDefaultModalQuery: jest
    .fn()
    .mockImplementation(() => ({
      data: null,
      loading: false,
      initialLoading: false
    })),
  useCreateConsolidationDefaultMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn()])
}))

jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleSubmit: () => mockHandleSubmit,
  handleOnSubmissionError: jest.fn()
}))

const mockHandleSubmit = jest.fn()
const mockHandleOnSuccess = jest.fn()

const render = (
  props: ComponentProps<typeof ConsolidationDefaultCreateModal>
) => renderComponent(<ConsolidationDefaultCreateModal {...props} />)

describe('ConsolidationDefaultCreateModal', () => {
  it('renders properly', () => {
    const { getByTestId } = render({
      options: {
        clientId: 'VjEtQ2xpZW50LTM3OTU4NA'
      }
    })

    expect(getByTestId('ConsolidationDefaultModalForm')).toBeInTheDocument()
  })
})
