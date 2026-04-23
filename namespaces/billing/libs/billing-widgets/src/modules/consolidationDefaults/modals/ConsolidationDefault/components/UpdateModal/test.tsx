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
  useUpdateConsolidationDefaultMutation: jest
    .fn()
    .mockImplementation(() => [jest.fn()]),
  useGetConsolidationDefaultQuery: jest.fn().mockImplementation(() => ({
    data: null,
    loading: false,
    initialLoading: false
  }))
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

describe('ConsolidationDefaultUpdateModal', () => {
  it('renders properly', () => {
    const { getByTestId } = render({
      options: {
        clientId: 'VjEtQ2xpZW50LTM3OTU4NA',
        consolidationDefaultId: 'VjEtQ29uc29saWRhdGlvbkRlZmF1bHQtMg',
        name: 'CD #1',
        engagementIds: [
          'VjEtRW5nYWdlbWVudC0yNjIwMzY',
          'VjEtRW5nYWdlbWVudC0yNjM2MzY'
        ]
      }
    })

    expect(getByTestId('ConsolidationDefaultModalForm')).toBeInTheDocument()
  })
})
