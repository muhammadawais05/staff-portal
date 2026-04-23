import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@toptal/picasso/test-utils'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { applicantsEmailMessagingMock } from './data/get-email-applicants-recipient/mocks'
import SendJobApplicantsEmailModal from './SendJobApplicantsEmailModal'
import { useEmailJobApplicants } from './data/email-job-applicants/email-job-applicants.staff.gql'
import { useGetEmailApplicantsRecipient } from './data/get-email-applicants-recipient/get-email-applicants-recipient.staff.gql'

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  SendEmailModal: {
    EmailTemplatesField: () => <div />,
    SubjectField: () => <div />,
    ToField: () => <div />,
    CCSuggestedField: () => <div />,
    CCAdditionalField: () => <div />,
    EmailBodyField: () => <div />,
    GoogleAppsAuthNotification: () => <div />
  }
}))
jest.mock('./services/parse-raw-template/parse-raw-template', () => ({
  parseRawTemplate: () => ''
}))
jest.mock(
  './data/get-email-applicants-recipient/get-email-applicants-recipient.staff.gql',
  () => ({
    useGetEmailApplicantsRecipient: jest.fn()
  })
)
jest.mock('./data/email-job-applicants/email-job-applicants.staff.gql', () => ({
  useEmailJobApplicants: jest.fn()
}))
const JOB_APPLICATION_IDS = ['1', '2', '3']

const applicationsMock = [
  {
    id: JOB_APPLICATION_IDS[0],
    talent: {
      id: 'talent-1',
      fullName: 'Gerda Kuhn',
      ofacStatus: OfacStatus.INVESTIGATION,
      __typename: 'Talent'
    },
    __typename: 'JobApplication'
  },
  {
    id: JOB_APPLICATION_IDS[1],
    talent: {
      id: 'talent-2',
      fullName: 'Eden Howell',
      ofacStatus: OfacStatus.NORMAL,
      __typename: 'Talent'
    },
    __typename: 'JobApplication'
  },
  {
    id: JOB_APPLICATION_IDS[2],
    talent: {
      id: 'talent-3',
      fullName: 'Josh Marel',
      ofacStatus: OfacStatus.RESTRICTED,
      __typename: 'Talent'
    },
    __typename: 'JobApplication'
  }
]

const recipientMock = {
  recipient: applicantsEmailMessagingMock,
  applications: {
    nodes: applicationsMock.map(application => ({
      ...application,
      talent: {
        ...application.talent,
        __typename: 'Talent'
      },
      __typename: 'JobApplication'
    }))
  },
  refetchRecipient: jest.fn(),
  loading: false
}

const emailJobApplicantsMockResponseMock = {
  data: {
    emailJobApplicants: {
      success: true,
      errors: [],
      __typename: 'EmailJobApplicantsPayload',
      successCount: JOB_APPLICATION_IDS.length,
      failureCount: 0,
      failureMessage: null
    }
  }
}
const JOB_ID = 'job-1'

const arrangeTest = () => {
  const mockUseGetEmailApplicantsRecipient =
    useGetEmailApplicantsRecipient as jest.Mock

  mockUseGetEmailApplicantsRecipient.mockReturnValue(recipientMock)

  const mockedUseEmailJobApplicants = useEmailJobApplicants as jest.Mock

  mockedUseEmailJobApplicants.mockReturnValue([
    () => emailJobApplicantsMockResponseMock,
    { loading: false }
  ])

  return render(
    <TestWrapper>
      <SendJobApplicantsEmailModal
        jobId={JOB_ID}
        jobApplicationIds={JOB_APPLICATION_IDS}
        hideModal={jest.fn()}
      />
    </TestWrapper>
  )
}

describe('SendJobApplicantsEmailModal', () => {
  it('shows email applicants on modal header', async () => {
    arrangeTest()

    const INFO_TEXT =
      'You are about to send email to the following candidates: Gerda Kuhn, Eden Howell, Josh Marel.'

    expect(screen.getByTestId('email-applicants-info').textContent).toBe(
      INFO_TEXT
    )
  })

  it('shows message for applicants with ofac issues', async () => {
    const OFAC_NOTIFICATION_TEXT = `Gerda Kuhn and Josh Marel have "investigation and restricted" OFAC status(es) - communication with them should be avoided except the communication required for the OFAC investigation.`

    arrangeTest()

    const ofacMessageNode = screen.getByTestId('ofac-statuses-notification')

    expect(ofacMessageNode.textContent).toBe(OFAC_NOTIFICATION_TEXT)
  })

  it('sends email to applicants', async () => {
    arrangeTest()

    userEvent.click(screen.getByText('Send Email'))

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    expect(
      screen.queryByText('Email sent to 3 job applicants.')
    ).toBeInTheDocument()
  })
})
