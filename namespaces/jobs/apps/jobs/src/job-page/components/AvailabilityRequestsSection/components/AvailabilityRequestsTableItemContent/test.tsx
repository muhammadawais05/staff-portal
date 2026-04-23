import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  AvailabilityRequestRejectReason,
  AvailabilityRequestStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AvailabilityRequestsTableItemContent from './AvailabilityRequestsTableItemContent'
import { useGetAvailabilityRequest } from './data'

jest.mock('./data', () => ({
  useGetAvailabilityRequest: jest.fn()
}))

const FAKE_URL = 'http://someurl.com'

const useGetAvailabilityRequestMock = useGetAvailabilityRequest as jest.Mock

type Response = Partial<ReturnType<typeof useGetAvailabilityRequest>>

const JOB_ID = 'someid'

const FAKE_DATA = {
  job: {
    id: JOB_ID,
    skillSets: {
      nodes: []
    }
  },
  talent: {
    id: 'john_doe',
    fullName: 'John doe',
    photo: {
      small: FAKE_URL
    },
    slackContacts: {
      nodes: [
        {
          id: 'someid',
          webResource: {
            url: 'someslackurl'
          }
        }
      ]
    },
    webResource: {
      url: FAKE_URL
    },
    resumeUrl: FAKE_URL,
    locationV2: {
      country: {
        id: 'us',
        name: 'US'
      }
    },
    timeZone: {
      name: 'Europe/Moscow'
    },
    hourlyRate: '40$',
    matchQualityMetrics: {
      nodes: []
    },
    type: 'Developer',
    skillSets: {
      nodes: []
    },
    engagements: {
      counters: {
        workingNumber: 1,
        clientsNumber: 1,
        repeatedClientsNumber: 1,
        acceptedInterviewsNumber: 1,
        approvedTrialsNumber: 1,
        interviewsNumber: 1,
        successRate: 1,
        trialsNumber: 1
      }
    }
  },
  operations: {
    withdrawAvailabilityRequest: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  status: AvailabilityRequestStatus.CONFIRMED,
  emailMessaging: {
    id: 'email-messaging-id',
    operations: {
      sendEmailTo: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  resumeUrl: FAKE_URL
}

const arrangeTest = ({ loading = false, data = FAKE_DATA }: Response = {}) => {
  const RESPONSE: Response = {
    data,
    loading
  }

  useGetAvailabilityRequestMock.mockReturnValue(RESPONSE)

  render(
    <TestWrapper>
      <AvailabilityRequestsTableItemContent
        availabilityRequestId='123'
        jobId={JOB_ID}
      />
    </TestWrapper>
  )
}

describe('AvailabilityRequestsTableItemContent', () => {
  describe('when `loading` flag is set to `false`', () => {
    it('renders content block', () => {
      arrangeTest()

      expect(
        screen.getByTestId('JobAvailabilityRequest-item-content')
      ).toBeInTheDocument()
    })

    describe('`Reject Reason` section', () => {
      describe('when `rejectReason` value is valid', () => {
        it('renders `Reason` section', () => {
          arrangeTest({
            data: {
              ...FAKE_DATA,
              rejectReason: AvailabilityRequestRejectReason.OTHER
            }
          })

          expect(
            screen.getByTestId('JobAvailabilityRequest-reject-reason')
          ).toHaveTextContent('Other')
        })
      })

      describe('when `rejectReason` value is invalid', () => {
        it('does not render `Reason` section', () => {
          arrangeTest({
            data: {
              ...FAKE_DATA,
              rejectReason: 'foo' as AvailabilityRequestRejectReason
            }
          })

          expect(
            screen.queryByTestId('JobAvailabilityRequest-reject-reason')
          ).not.toBeInTheDocument()
        })
      })

      describe('when `rejectReason` value is empty', () => {
        it('does not render `Reason` section', () => {
          arrangeTest({
            data: {
              ...FAKE_DATA,
              rejectReason: 'foo' as AvailabilityRequestRejectReason
            }
          })

          expect(
            screen.queryByTestId('JobAvailabilityRequest-reject-reason')
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('`Comment` section', () => {
      describe('when `talentComment` value is exist', () => {
        it('renders `Comment` section', () => {
          arrangeTest({
            data: {
              ...FAKE_DATA,
              talentComment: 'Foo Bar'
            }
          })

          expect(
            screen.getByTestId('JobAvailabilityRequest-talent-comment')
          ).toHaveTextContent('Foo Bar')
        })
      })

      describe('when `talentComment` value is empty', () => {
        it('does not render `Comment` section', () => {
          arrangeTest({
            data: FAKE_DATA
          })

          expect(
            screen.queryByTestId('JobAvailabilityRequest-talent-comment')
          ).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('when `loading` flag is set to `true`', () => {
    it('renders skeleton', () => {
      arrangeTest({ loading: true, data: null })

      expect(
        screen.getByTestId('JobAvailabilityRequest-item-content-skeleton')
      ).toBeInTheDocument()
    })
  })

  describe('when the new resume page is enabled for client', () => {
    it('displays the view resume button', () => {
      arrangeTest({
        data: {
          ...FAKE_DATA,
          talent: {
            ...FAKE_DATA.talent,
            resumeUrl: 'http://public.profile.url'
          },
          resumeUrl: 'http://new.resume.url'
        }
      })

      expect(screen.getByTestId('public-resume-button')).toBeInTheDocument()
    })
  })

  describe('when a new resume page url equals to a public profile url', () => {
    it('displays the public profile button', () => {
      arrangeTest({
        data: {
          ...FAKE_DATA,
          talent: {
            ...FAKE_DATA.talent,
            resumeUrl: 'http://public.profile.url'
          },
          resumeUrl: 'http://public.profile.url'
        }
      })

      expect(screen.getByTestId('public-profile-button')).toBeInTheDocument()
    })
  })
})
