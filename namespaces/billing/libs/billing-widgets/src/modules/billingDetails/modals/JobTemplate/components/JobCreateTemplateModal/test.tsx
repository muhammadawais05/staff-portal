import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobCreateTemplateModal from '../JobCreateTemplateModal'
import JobTemplateModalForm from '../JobTemplateModalForm'
import { useGetClientJobTemplate } from '../../data'

jest.mock('../JobTemplateModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: mockHandleOnSuccess
  })
)
jest.mock('../../data', () => ({
  useCreateJobTemplateMutation: jest.fn().mockImplementation(() => [jest.fn()]),
  useGetClientJobTemplate: jest.fn()
}))
jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleSubmit: () => mockHandleSubmit,
  handleOnSubmissionError: jest.fn()
}))

const mockHandleSubmit = jest.fn()
const mockHandleOnSuccess = jest.fn()

const render = (props: ComponentProps<typeof JobCreateTemplateModal>) =>
  renderComponent(<JobCreateTemplateModal {...props} />)

describe('CreateJobTemplateModal', () => {
  describe('when data is loading', () => {
    it('renders a skeleton loader', () => {
      ;(useGetClientJobTemplate as jest.Mock).mockReturnValue({
        data: undefined,
        loading: true,
        initialLoading: true
      })

      const { queryByTestId } = render({
        options: {
          nodeId: '12345',
          nodeType: 'company'
        }
      })

      expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
      expect(JobTemplateModalForm).toHaveBeenCalledTimes(0)
    })
  })

  describe('when data is loaded', () => {
    it('renders properly', () => {
      ;(useGetClientJobTemplate as jest.Mock).mockReturnValue({
        data: fixtures.MockClient,
        loading: false,
        initialLoading: false
      })

      render({
        options: {
          nodeId: '12345',
          nodeType: 'company'
        }
      })

      expect(JobTemplateModalForm).toHaveBeenCalledTimes(1)
      expect(JobTemplateModalForm).toHaveBeenCalledWith(
        {
          handleOnSubmit: mockHandleSubmit,
          initialValues: { clientId: 'VjEtQ29tcGFueS0xMjM0NQ' },
          title: 'Create Job Template',
          submitButtonText: 'Create',
          client: fixtures.MockClient
        },
        {}
      )
      expect(mockHandleOnSuccess).toHaveBeenCalledTimes(2)
      expect(mockHandleOnSuccess).toHaveBeenCalledWith({
        apolloEvent: {
          metaData: 'billingDetails:jobCreateTemplate'
        },
        successMessage: 'The Job Template was successfully created.'
      })
    })
  })
})
