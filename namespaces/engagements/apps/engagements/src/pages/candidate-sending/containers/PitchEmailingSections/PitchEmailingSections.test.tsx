import React, { PropsWithChildren, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Maybe } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import PitchEmailingSections from './PitchEmailingSections'
import EmailOptionsSection from '../EmailOptionsSection'
import EmailDetailsSection from '../EmailDetailsSection'
import EmailComposerSection from '../EmailComposerSection'
import { useCandidateSendingContext } from '../../hooks'
import {
  PitchStepDataFragment,
  PitchStepEmailContextFragment
} from '../../data/get-pitch-step-data'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useNewEngagementWizardMutation: jest.fn()
}))
jest.mock('../EmailComposerSection', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../EmailOptionsSection', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../EmailDetailsSection', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../CandidateSendingForm', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='candidate-sending-form'>
      <>{children}</>
    </div>
  )
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const EmailOptionsSectionMock = EmailOptionsSection as jest.Mock
const EmailDetailsSectionMock = EmailDetailsSection as jest.Mock
const EmailComposerSectionMock = EmailComposerSection as jest.Mock

const renderComponent = ({
  pitchStepData,
  loading
}: {
  pitchStepData?: Maybe<PitchStepDataFragment>
  loading: boolean
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes: {}
  }))

  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <PitchEmailingSections
          pitchStepData={pitchStepData}
          loading={loading}
        />
      </Form>
    </TestWrapper>
  )
}

const pitchStepDataMock = {
  pitchEmailMessaging: {
    emailCarbonCopyOptions: {
      nodes: []
    },
    optionsSendTo: {
      nodes: [
        {
          id: '123',
          fullName: 'Andrei Mocanu',
          email: 'andrei.mocanu123321@toptal.net',
          contacts: {
            nodes: [
              {
                id: '124',
                value: 'Contact'
              }
            ]
          }
        }
      ]
    }
  },
  isPitchTextEnabled: true,
  job: {
    id: '123',
    client: {
      id: '234',
      netTerms: 10,
      fullName: 'Company',
      enterprise: false,
      webResource: {
        text: 'Best Company LLC',
        url: 'http://staging.toptal.net/companies/234'
      }
    },
    webResource: {
      text: 'Chief',
      url: 'http://staging.toptal.net/jobs/123'
    }
  }
} as unknown as PitchStepEmailContextFragment

describe('PitchEmailingSections', () => {
  describe('when data is loading', () => {
    it('renders the skeleton loader', () => {
      renderComponent({
        loading: true
      })

      expect(
        screen.getByTestId('pitch-emailing-sections-skeleton')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-form')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is no data', () => {
    it('does not render the pitch emailing sections', () => {
      renderComponent({
        pitchStepData: null,
        loading: false
      })

      expect(
        screen.queryByTestId('pitch-emailing-sections-skeleton')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('email-details-section')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('email-composer-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('renders the pitch emailing sections', () => {
      const componentImplementation = ({
        children
      }: PropsWithChildren<unknown>) => <>{children}</>

      EmailOptionsSectionMock.mockImplementation(componentImplementation)
      EmailDetailsSectionMock.mockImplementation(componentImplementation)
      EmailComposerSectionMock.mockImplementation(componentImplementation)

      renderComponent({
        pitchStepData: pitchStepDataMock,
        loading: false
      })

      expect(
        screen.queryByTestId('pitch-emailing-sections-skeleton')
      ).not.toBeInTheDocument()

      expect(screen.getByTestId('candidate-sending-form')).toBeInTheDocument()

      expect(EmailOptionsSectionMock).toHaveBeenCalledTimes(1)
      expect(EmailOptionsSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          claimer: undefined,
          clientPartner: undefined,
          hasToptalProjects: false
        }),
        {}
      )
      expect(EmailDetailsSectionMock).toHaveBeenCalledTimes(1)
      expect(EmailDetailsSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          emailContext: {
            emailCarbonCopyOptions: {
              nodes: []
            },
            optionsSendTo: {
              nodes: [
                {
                  contacts: {
                    nodes: [
                      {
                        id: '124',
                        value: 'Contact'
                      }
                    ]
                  },
                  email: 'andrei.mocanu123321@toptal.net',
                  fullName: 'Andrei Mocanu',
                  id: '123'
                }
              ]
            }
          },
          sender: undefined
        }),
        {}
      )
      expect(EmailComposerSectionMock).toHaveBeenCalledTimes(1)
      expect(EmailComposerSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          job: {
            client: {
              enterprise: false,
              fullName: 'Company',
              id: '234',
              netTerms: 10,
              webResource: {
                text: 'Best Company LLC',
                url: 'http://staging.toptal.net/companies/234'
              }
            },
            id: '123',
            webResource: {
              text: 'Chief',
              url: 'http://staging.toptal.net/jobs/123'
            }
          },
          newEngagement: undefined,
          pitchEmailMessaging: {
            emailCarbonCopyOptions: {
              nodes: []
            },
            optionsSendTo: {
              nodes: [
                {
                  contacts: {
                    nodes: [
                      {
                        id: '124',
                        value: 'Contact'
                      }
                    ]
                  },
                  email: 'andrei.mocanu123321@toptal.net',
                  fullName: 'Andrei Mocanu',
                  id: '123'
                }
              ]
            }
          },
          senderId: undefined,
          talent: undefined
        }),
        {}
      )
    })
  })
})
