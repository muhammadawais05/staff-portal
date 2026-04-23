import React, { ComponentProps } from 'react'
import { BillCycle, OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobUpdateTemplateModal from '../JobUpdateTemplateModal'
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
  useUpdateJobTemplateMutation: jest.fn().mockImplementation(() => [jest.fn()]),
  useGetClientJobTemplate: jest.fn()
}))
jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleSubmit: () => mockHandleSubmit,
  handleOnSubmissionError: jest.fn()
}))
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnCloseModal: jest.fn()
  })
}))

const mockHandleSubmit = jest.fn()
const mockHandleOnSuccess = jest.fn()

const jobTemplate = {
  billCycle: BillCycle.BI_WEEKLY,
  id: 'VjEtSm9iVGVtcGxhdGUtMjIy',
  operations: {
    updateJobTemplate: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'JobTemplateOperations'
  }
}

const render = (props: ComponentProps<typeof JobUpdateTemplateModal>) =>
  renderComponent(<JobUpdateTemplateModal {...props} />)

describe('UpdateJobTemplateModal', () => {
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
        data: {
          id: 'client123',
          jobTemplate
        },
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
          client: {
            id: 'client123',
            jobTemplate: {
              billCycle: 'BI_WEEKLY',
              id: 'VjEtSm9iVGVtcGxhdGUtMjIy',
              operations: {
                updateJobTemplate: {
                  callable: OperationCallableTypes.ENABLED,
                  messages: [],
                  __typename: 'Operation'
                },
                __typename: 'JobTemplateOperations'
              }
            }
          },
          handleOnSubmit: expect.any(Function),
          initialValues: {
            billCycle: 'BI_WEEKLY',
            billDay: undefined,
            commitment: undefined,
            jobTemplateId: 'VjEtSm9iVGVtcGxhdGUtMjIy'
          },
          submitButtonText: 'Update',
          title: 'Update Job Template'
        },
        {}
      )
      expect(mockHandleOnSuccess).toHaveBeenCalledTimes(2)
      expect(mockHandleOnSuccess).toHaveBeenCalledWith({
        apolloEvent: {
          metaData: 'billingDetails:jobUpdateTemplate'
        },
        successMessage: 'The Job Template was successfully updated.'
      })
    })
  })
})
