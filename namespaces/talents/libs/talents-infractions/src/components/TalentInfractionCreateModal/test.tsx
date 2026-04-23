import React from 'react'
import { screen, act, fireEvent } from '@testing-library/react'
import { render } from '@toptal/picasso/test-utils'
import {
  CreateTalentInfractionInput,
  TalentInfractionReasonValue
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentInfractionCreateModal, {
  Props as TalentInfractionCreateModalProps
} from './TalentInfractionCreateModal'
import {
  createCreateTalentInfractionFailedMock,
  createCreateTalentInfractionMock
} from '../../data/create-talent-infraction/mocks'
import { createGetCurrentTalentEngagementsMock } from '../../data/get-talent-engagements/mocks'

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

const arrangeTest = async ({
  mocks = [],
  modalProps
}: {
  mocks?: MockedResponse[]
  modalProps: TalentInfractionCreateModalProps
}) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentInfractionCreateModal {...modalProps} />
    </TestWrapperWithMocks>
  )
  await act(() => new Promise(resolve => setTimeout(resolve, 0)))
}

const ROLE_ID = 'talent-id-190'
const SUMMARY = 'Infraction title'
const REASON_SLUG = TalentInfractionReasonValue.LEGAL_PROBLEMS_BACKGROUND
const REASON_TITLE = 'Problems with background check'
const OCCURRED_AT = '2021-03-11'
const ENGAGEMENT_ID = 'VjEtRmxhZy0z'
const ENGAGEMENT_TITLE = 'Client -> Senior Developer'
const DESCRIPTION = 'Infraction description'
const hideModal = jest.fn()
const ERROR_MESSAGE = 'Some error message.'
const variablesForMock: CreateTalentInfractionInput = {
  description: DESCRIPTION,
  engagementId: ENGAGEMENT_ID,
  occurredAt: OCCURRED_AT,
  reasonSlug: REASON_SLUG,
  summary: SUMMARY,
  talentId: ROLE_ID
}

const submitForm = async () => {
  fireEvent.change(screen.getByLabelText(/Summary/), {
    target: { value: SUMMARY }
  })

  fireEvent.click(screen.getByLabelText(/Reason/))
  const selectReason = await screen.findByText(REASON_TITLE)

  expect(selectReason).toBeInTheDocument()
  fireEvent.click(selectReason)

  fireEvent.change(screen.getByLabelText(/When Occurred/), {
    target: { value: OCCURRED_AT }
  })

  fireEvent.click(screen.getByLabelText(/Link Infraction With an Engagement/))
  const selectEngagement = await screen.findByText(ENGAGEMENT_TITLE)

  expect(selectEngagement).toBeInTheDocument()
  fireEvent.click(selectEngagement)

  fireEvent.change(screen.getByLabelText(/Details/), {
    target: { value: DESCRIPTION }
  })

  fireEvent.click(screen.getByText('Create'))
}

describe('TalentInfractionCreateModal', () => {
  it('shows a success message when the infraction is created', async () => {
    await arrangeTest({
      mocks: [
        createGetCurrentTalentEngagementsMock(
          ROLE_ID,
          ENGAGEMENT_ID,
          ENGAGEMENT_TITLE
        ),
        createCreateTalentInfractionMock(variablesForMock)
      ],
      modalProps: { forTalentId: ROLE_ID, hideModal }
    })

    await act(() => submitForm())

    expect(
      await screen.findByText('The Infraction was successfully created.')
    ).toBeInTheDocument()
    expect(hideModal).toHaveBeenCalled()
  })

  it('shows an error message when unable to create the infraction', async () => {
    await arrangeTest({
      mocks: [
        createGetCurrentTalentEngagementsMock(
          ROLE_ID,
          ENGAGEMENT_ID,
          ENGAGEMENT_TITLE
        ),
        createCreateTalentInfractionFailedMock(variablesForMock, ERROR_MESSAGE)
      ],
      modalProps: { forTalentId: ROLE_ID, hideModal }
    })

    await act(() => submitForm())

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    expect(hideModal).not.toHaveBeenCalled()
  })
})
