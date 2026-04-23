import React, { ReactNode } from 'react'
import { screen, render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  Form,
  arrayMutators,
  FieldArray,
  FieldArrayRenderProps
} from '@toptal/picasso-forms'

import { useCandidateSendingContext } from '../../hooks'
import CandidateSendingFeedbackStep from './CandidateSendingFeedbackStep'
import { SubmitNewEngagementWizardPayloadFragment } from '../../data/submit-new-engagement-wizard'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  FieldArray: jest.fn()
}))

type FieldArrayRenderPropsType = FieldArrayRenderProps<
  { id: string },
  HTMLElement
>

const mockFieldArray = (props?: FieldArrayRenderPropsType) => {
  const FieldArrayMock = FieldArray as jest.Mock

  FieldArrayMock.mockImplementation(
    ({
      children
    }: {
      children: (renderProps: FieldArrayRenderPropsType) => ReactNode
    }) => children(props ?? ({} as unknown as FieldArrayRenderPropsType))
  )
}

jest.mock(
  '../CandidateSendingFeedbackStepForm/CandidateSendingFeedbackStepForm',
  () => ({
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => <>{children}</>
  })
)
jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))
jest.mock('../../components', () => ({
  RejectedApplicationItem: () => (
    <tr data-testid='rejected-application-item'>
      <td colSpan={3} />
    </tr>
  )
}))
jest.mock('./components/FormActions/FormActions', () => ({
  __esModule: true,
  default: () => <div data-testid='form-actions' />
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  newEngagementWizardMutationPayload
}: {
  newEngagementWizardMutationPayload?: SubmitNewEngagementWizardPayloadFragment | null
} = {}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    newEngagementWizardMutationPayload
  }))

  return render(
    <TestWrapper>
      <Form mutators={{ ...arrayMutators }} onSubmit={() => {}}>
        <CandidateSendingFeedbackStep />
      </Form>
    </TestWrapper>
  )
}

describe('CandidateSendingFeedbackStep', () => {
  describe('when `newEngagementWizardMutationPayload` equals `null`', () => {
    it('does not render step', () => {
      mockFieldArray()
      renderComponent({ newEngagementWizardMutationPayload: null })

      expect(
        screen.queryByText('Your feedback will be shared directly with talent.')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `newEngagementWizardMutationPayload` exists', () => {
    it('renders the content of step', () => {
      mockFieldArray({
        fields: { value: [{ id: 'id' }] }
      } as FieldArrayRenderPropsType)
      const { container } = renderComponent({
        newEngagementWizardMutationPayload: {
          engagement: {
            talent: { fullName: 'Norberto Becker' }
          },
          rejectionFeedback: {
            internalFeedbackTitleAndSlugs: [
              {
                key: 'missing_valuable_skills',
                value: 'Missing valuable skills'
              }
            ],
            internalFeedbackTooltips: [
              {
                key: 'missing_valuable_skills',
                value: 'some value'
              }
            ],
            rejectedApplications: {
              nodes: [
                {
                  id: 'id-1',
                  jobApplicationTalent: {
                    profileLink: {
                      text: 'Carma Keebler',
                      url: 'https://some.url'
                    }
                  }
                },
                {
                  id: 'id-2',
                  availabilityRequestTalent: {
                    profileLink: {
                      text: 'Sherman Gerlach',
                      url: 'https://some.url'
                    }
                  }
                }
              ]
            }
          }
        } as SubmitNewEngagementWizardPayloadFragment
      })

      expect(container.innerHTML).toContain(
        `You introduced Norberto Becker to the client. Please provide feedback about why the following candidates weren't selected, including any guidance for improvement.`
      )
      expect(
        screen.getByText('Your feedback will be shared directly with talent.')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('rejected-application-item')
      ).toBeInTheDocument()
      expect(screen.getByTestId('form-actions')).toBeInTheDocument()
    })
  })
})
