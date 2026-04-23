import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { Maybe } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import EmailComposerFields from './EmailComposerFields'
import {
  PitchStepJobFragment,
  PitchStepPitchEmailMessagingFragment,
  PitchStepTalentFragment
} from '../../data/get-pitch-step-data'
import { ScheduleInterviewButtonField, SignatureField } from './components'

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  ScheduleInterviewButtonField: jest.fn(),
  SignatureField: jest.fn()
}))

const ScheduleInterviewButtonFieldMock =
  ScheduleInterviewButtonField as jest.Mock
const SignatureFieldMock = SignatureField as jest.Mock

const renderComponent = ({
  job,
  pitchEmailMessaging,
  senderId,
  talent,
  isPitchTextEnabled = true
}: {
  job?: Maybe<PitchStepJobFragment>
  pitchEmailMessaging?: Maybe<PitchStepPitchEmailMessagingFragment>
  senderId?: Maybe<string>
  talent?: Maybe<PitchStepTalentFragment>
  isPitchTextEnabled?: boolean
} = {}) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <EmailComposerFields
          job={job}
          pitchEmailMessaging={pitchEmailMessaging}
          senderId={senderId}
          talent={talent}
          isPitchTextEnabled={isPitchTextEnabled}
        />
      </Form>
    </TestWrapper>
  )

describe('EmailComposerFields', () => {
  it('calls the components within with the right props', () => {
    ScheduleInterviewButtonFieldMock.mockImplementation(() => null)
    SignatureFieldMock.mockImplementation(() => null)

    renderComponent({
      talent: {
        id: '123',
        fullName: 'Andrei Mocanu',
        type: 'Developer',
        resumeUrl: 'https://staging.toptal.net/resume/123',
        webResource: {
          text: 'Andrei Mocanu',
          url: 'http://staging.toptal.net/talents/123'
        }
      },
      job: {
        id: 'job-123',
        claimer: {
          id: 'claimer-id',
          fullName: 'Claimer'
        },
        webResource: {
          text: 'Job'
        },
        client: {
          id: 'client-123',
          enterprise: false,
          webResource: {
            text: 'a'
          },
          clientPartner: {
            id: 'cp-123',
            fullName: 'Client Partner',
            webResource: {
              text: 'Client Partner'
            }
          }
        }
      },
      pitchEmailMessaging: {
        claimerSignOff: 'cs-1',
        clientPartnerSignOff: 'cp-1'
      },
      senderId: '234'
    })

    expect(ScheduleInterviewButtonFieldMock).toHaveBeenCalledTimes(1)
    expect(ScheduleInterviewButtonFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talent: {
          id: '123',
          fullName: 'Andrei Mocanu',
          type: 'Developer',
          resumeUrl: 'https://staging.toptal.net/resume/123',
          webResource: {
            text: 'Andrei Mocanu',
            url: 'http://staging.toptal.net/talents/123'
          }
        }
      }),
      {}
    )

    expect(SignatureFieldMock).toHaveBeenCalledTimes(1)
    expect(SignatureFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        claimerId: 'claimer-id',
        claimerSignOff: 'cs-1',
        clientPartnerId: 'cp-123',
        clientPartnerSignOff: 'cp-1',
        senderId: '234'
      }),
      {}
    )
  })
})
