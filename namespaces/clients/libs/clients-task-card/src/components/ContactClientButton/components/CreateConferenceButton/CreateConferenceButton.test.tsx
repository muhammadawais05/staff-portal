import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { waitForElementToBeRemoved } from '@toptal/picasso/test-utils'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import CreateConferenceButton, { Props } from './CreateConferenceButton'
import {
  createCreateMeetingFailedMock,
  createCreateMeetingMock
} from './data/create-meeting/mocks'

const arrangeTest = (
  {
    contactUserId = 'contact-user-id-ajy618',
    playbookTemplateId = 'playbook-template-id-y46xka',
    onSuccess = () => null
  }: Partial<Props> = {},
  mocks: MockedResponse[] = []
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <CreateConferenceButton
        contactUserId={contactUserId}
        playbookTemplateId={playbookTemplateId}
        onSuccess={onSuccess}
      />
    </TestWrapperWithMocks>
  )

describe('CreateConferenceButton', () => {
  it('opens modal and creates Conference', async () => {
    const CONTACT_ID = 'skdu72'
    const PLAYBOOK_TEMPLATE_ID = 'a592da'
    const ON_SUCCESS = jest.fn()

    arrangeTest(
      {
        contactUserId: CONTACT_ID,
        playbookTemplateId: PLAYBOOK_TEMPLATE_ID,
        onSuccess: ON_SUCCESS
      },
      [
        createCreateMeetingMock({
          input: {
            roleOrClientId: CONTACT_ID,
            playbookTemplateId: PLAYBOOK_TEMPLATE_ID
          }
        })
      ]
    )

    fireEvent.click(screen.getByTestId('create-conference-button'))
    fireEvent.click(screen.getAllByText('Create Conference')[2])
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    expect(ON_SUCCESS).toHaveBeenCalledTimes(1)
  })

  describe('when request fails', () => {
    // TODO: https://toptal-core.atlassian.net/browse/SPB-2248
    // Disabled due its started to fail during the react-router usage
    // eslint-disable-next-line
    it.skip('shows the error notification', async () => {
      const CONTACT_ID = 'au729a'
      const PLAYBOOK_TEMPLATE_ID = 'pov8as'
      const ON_SUCCESS = jest.fn()

      arrangeTest(
        {
          contactUserId: CONTACT_ID,
          playbookTemplateId: PLAYBOOK_TEMPLATE_ID,
          onSuccess: ON_SUCCESS
        },
        [
          createCreateMeetingFailedMock({
            input: {
              roleOrClientId: CONTACT_ID,
              playbookTemplateId: PLAYBOOK_TEMPLATE_ID
            }
          })
        ]
      )

      fireEvent.click(screen.getByTestId('create-conference-button'))
      fireEvent.click(screen.getAllByText('Create Conference')[2])
      await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

      expect(
        screen.getByText('Failed to create Conference.')
      ).toBeInTheDocument()
      expect(ON_SUCCESS).toHaveBeenCalledTimes(0)
    })
  })
})
